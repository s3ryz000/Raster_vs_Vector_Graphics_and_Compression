/* =========================================================
   Zoom comparison widget
   ========================================================= */
(function zoomWidget() {
  const canvas = document.getElementById("rasterCanvas");
  const svg = document.getElementById("vectorSvg");
  const slider = document.getElementById("zoom");
  const out = document.getElementById("zoomOut");

  // Draw the raster version once at 64×64. Zooming only stretches these pixels.
  const svgData = new XMLSerializer().serializeToString(svg);
  const img = new Image();
  img.onload = () => canvas.getContext("2d").drawImage(img, 0, 0, 64, 64);
  img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgData);

  const kb = bytes => bytes > 1048576 ? (bytes / 1048576).toFixed(1) + " MB" : (bytes / 1024).toFixed(1) + " KB";
  const VECTOR_BYTES = new Blob([svgData]).size;

  function update(z) {
    z = Number(z);
    slider.value = z;
    out.textContent = z + "×";
    // Both views zoom towards the same focus point: the mountain's diagonal edge
    const FX = 29, FY = 32;
    canvas.style.transformOrigin = `${FX / 64 * 100}% ${FY / 64 * 100}%`;
    canvas.style.transform = `scale(${z})`;
    // Vector: shrink the viewBox around the focus, so the browser redraws the shapes sharply
    const size = 64 / z;
    svg.setAttribute("viewBox", `${FX - FX / z} ${FY - FY / z} ${size} ${size}`);

    const side = Math.round(64 * z);
    document.getElementById("rasterNote").textContent = `Needs ${side}×${side} px (≈ ${kb(side * side * 3)} raw) to stay sharp`;
    document.getElementById("vectorNote").textContent = `Always ≈ ${kb(VECTOR_BYTES)} at any size`;
    document.getElementById("observe").textContent = z <= 1.5
      ? "At 1× both look the same. Zoom in!"
      : z < 6 ? "The raster's edges are starting to look jagged, while the vector stays smooth."
      : "Each raster pixel is now a big visible block. The vector is still perfectly sharp.";
    document.querySelectorAll("[data-zoom]").forEach(c => c.classList.toggle("active", Number(c.dataset.zoom) === z));
  }
  slider.addEventListener("input", e => update(e.target.value));
  document.querySelectorAll("[data-zoom]").forEach(c => c.addEventListener("click", () => update(c.dataset.zoom)));
  update(1);
})();
