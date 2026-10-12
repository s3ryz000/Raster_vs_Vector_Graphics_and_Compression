/* Lesson 3 · Redundancy & Compression (Unit 3: Why Compress?) */
LESSONS[3] = {
  steps: [
    {
      title: "Why Compress? The Bandwidth Problem",
      html: `
        <p class="lead">Uncompressed multimedia files are enormous. A single 1080p raw frame takes 6 MB, and 1 second of 60 FPS video demands over 360 Megabytes!</p>
        <h2 class="mt-4">Spatial Redundancy: The Secret to Shrinking Media</h2>
        <p>Fortunately, natural images are not random noise. They exhibit high <strong>spatial redundancy</strong>: adjacent pixels in skies, walls, skin, or backgrounds share nearly identical colors.</p>
        <p>Instead of storing every pixel independently, compression algorithms eliminate redundancy by storing patterns, runs, and mathematical differences.</p>`,
    },
    {
      title: "Lossless vs. Lossy: The Great Divide",
      html: `
        <p class="lead">Every digital compression algorithm belongs to one of two fundamental philosophies:</p>
        <h2 class="mt-4">1. Lossless Compression</h2>
        <p>Decompressing yields an <strong>exact bit-for-bit identical replica</strong> of the original data. No pixel values are altered or lost.</p>
        <p><em>Formats:</em> PNG, GIF, WebP (Lossless), SVG (Gzip), ZIP.<br>
        <em>Best for:</em> Text, code, UI icons, screenshots, line art, medical scans.</p>
        <h2 class="mt-4">2. Lossy Compression</h2>
        <p>Permanently discards perceptual information that human senses rarely notice, achieving dramatic 10:1 to 30:1 file size reductions.</p>
        <p><em>Formats:</em> JPEG, WebP (Lossy), AVIF, MP3 audio, MP4 video.<br>
        <em>Best for:</em> Complex continuous-tone photographs and streaming audio/video.</p>
        <div class="callout mt-3">
          <h2 class="h6 fw-bold mb-1">Beware Generation Loss</h2>
          <p class="mb-0">Editing and re-saving a lossy file repeatedly compounds artifacts and blurs detail. Always preserve master files in a lossless format!</p>
        </div>`,
    },
    {
      eyebrow: "Interactive Decision Tree",
      title: "Format Decision Flowchart",
      html: `
        <p>Explore this interactive flowchart to choose the optimal format (SVG vs PNG vs JPEG vs WebP) for any media asset:</p>`,
      widget: "flowchart",
    },
    {
      type: "question",
      format: "multiple-choice",
      q: "Which compression type allows an image to be decompressed into an exact bit-for-bit duplicate of the original?",
      a: ["Lossy compression", "Lossless compression", "Chroma subsampling", "Quantization"],
      c: 1,
      why: "Lossless compression guarantees 100% mathematical fidelity with zero lost information."
    },
    {
      type: "question",
      format: "true-false",
      q: "True or False: Repeatedly editing and re-saving an image in a lossy JPEG format causes progressive generation loss.",
      c: 0,
      why: "True! Each successive lossy encode cycle discards additional high-frequency data and introduces cumulative artifacts."
    },
    {
      type: "question",
      format: "fill-blank",
      q: "What term describes the high similarity between geographically adjacent pixels in a picture? (Spatial ...)",
      c: ["redundancy", "spatial redundancy"],
      why: "Spatial redundancy occurs when neighboring pixels in an image share identical or very similar color values."
    }
  ]
};
