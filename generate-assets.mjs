/**
 * generate-assets.mjs
 * Creates the local media assets required by the rubric.
 * Run: node generate-assets.mjs
 */
import sharp from "sharp";
import { writeFileSync } from "fs";

/* ── 1. Sample Photo (landscape with sky gradient, mountains, sun) ── */
const W = 960, H = 600;
const photoPixels = Buffer.alloc(W * H * 3);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 3;
    const t = y / H; // 0 = top, 1 = bottom

    // Sky gradient: deep blue → pale orange at horizon
    let r = Math.round(30 + t * 200);
    let g = Math.round(100 + t * 120);
    let b = Math.round(220 - t * 100);

    // Sun glow (upper-right quadrant)
    const sunX = W * 0.72, sunY = H * 0.28;
    const sd = Math.sqrt((x - sunX) ** 2 + (y - sunY) ** 2);
    if (sd < 45) { r = 255; g = 220; b = 80; }
    else if (sd < 120) {
      const glow = 1 - (sd - 45) / 75;
      r = Math.min(255, r + Math.round(glow * 180));
      g = Math.min(255, g + Math.round(glow * 100));
      b = Math.min(255, b + Math.round(glow * 30));
    }

    // Mountain range silhouette
    const mtn = H * 0.55 + Math.sin(x * 0.012) * 40 + Math.sin(x * 0.03) * 20 + Math.sin(x * 0.005) * 60;
    if (y > mtn) {
      const depth = Math.min(1, (y - mtn) / (H - mtn));
      // Dark green forested mountains → earthy browns at base
      r = Math.round(25 + depth * 50 + Math.sin(x * 0.07) * 10);
      g = Math.round(80 + depth * 30 - Math.sin(x * 0.05) * 15);
      b = Math.round(30 + depth * 20);
    }

    // River winding through valley
    const riverCenter = W * 0.45 + Math.sin(y * 0.015) * 80 + Math.sin(y * 0.04) * 30;
    const riverDist = Math.abs(x - riverCenter);
    const riverWidth = 15 + (y / H) * 25;
    if (y > mtn + 20 && riverDist < riverWidth) {
      const blend = 1 - riverDist / riverWidth;
      r = Math.round(r * (1 - blend) + 60 * blend);
      g = Math.round(g * (1 - blend) + 140 * blend);
      b = Math.round(b * (1 - blend) + 200 * blend);
    }

    // Gentle noise for texture
    const noise = (Math.random() - 0.5) * 8;
    photoPixels[i]     = Math.max(0, Math.min(255, r + noise));
    photoPixels[i + 1] = Math.max(0, Math.min(255, g + noise));
    photoPixels[i + 2] = Math.max(0, Math.min(255, b + noise));
  }
}

const photoRaw = sharp(photoPixels, { raw: { width: W, height: H, channels: 3 } });

// JPEG at quality 82
await photoRaw.clone().jpeg({ quality: 82 }).toFile("assets/sample-photo.jpg");
console.log("✔ sample-photo.jpg");

// WebP at quality 75
await photoRaw.clone().webp({ quality: 75 }).toFile("assets/sample-photo.webp");
console.log("✔ sample-photo.webp");

/* ── 2. Logo PNG (RGBA with transparency) ── */
// Create an SVG logo first, then render to 24-bit RGBA PNG
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#58cc02"/>
      <stop offset="1" stop-color="#46a302"/>
    </linearGradient>
  </defs>
  <rect x="40" y="40" width="320" height="320" rx="64" fill="url(#bg)"/>
  <g fill="#fff">
    <rect x="100" y="130" width="60" height="10"/>
    <rect x="90"  y="140" width="80" height="10"/>
    <rect x="80"  y="150" width="100" height="60"/>
    <rect x="90"  y="210" width="80" height="10"/>
    <rect x="100" y="220" width="60" height="10"/>
  </g>
  <circle cx="270" cy="180" r="55" fill="#fff"/>
  <text x="200" y="330" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="54" fill="#fff">RVA</text>
</svg>`;

await sharp(Buffer.from(logoSvg))
  .resize(400, 400)
  .png({ compressionLevel: 9 })
  .toFile("assets/sample-logo.png");
console.log("✔ sample-logo.png (24-bit RGBA)");

// Indexed 8-bit PNG (quantized palette)
await sharp(Buffer.from(logoSvg))
  .resize(400, 400)
  .png({ compressionLevel: 9, palette: true, colours: 64 })
  .toFile("assets/sample-logo-indexed.png");
console.log("✔ sample-logo-indexed.png (8-bit palette, 64 colours)");

/* ── 3. SVG vector artwork (written directly as text) ── */
const vectorSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 125" width="200" height="125">
  <!-- Raster representation: blocky pixel squares -->
  <g fill="#1cb0f6">
    <rect x="40" y="20" width="40" height="10"/>
    <rect x="30" y="30" width="60" height="10"/>
    <rect x="20" y="40" width="80" height="40"/>
    <rect x="30" y="80" width="60" height="10"/>
    <rect x="40" y="90" width="40" height="10"/>
  </g>
  <!-- Vector representation: smooth circle -->
  <circle cx="145" cy="60" r="40" fill="#58cc02"/>
  <text x="60" y="120" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="10" letter-spacing="1" fill="#777">RASTER</text>
  <text x="145" y="120" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="10" letter-spacing="1" fill="#777">VECTOR</text>
</svg>`;
writeFileSync("assets/sample-vector.svg", vectorSvg, "utf8");
console.log("✔ sample-vector.svg");

console.log("\n🎉 All assets generated in assets/");
