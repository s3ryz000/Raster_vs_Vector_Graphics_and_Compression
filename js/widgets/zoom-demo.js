/* =========================================================
   Widget: zoom comparison (raster pixels vs vector paths)
   ========================================================= */
(function () {
  const VECTOR_ART = `
    <rect width="64" height="64" fill="#ddf4ff"/>
    <circle cx="44" cy="18" r="9" fill="#ffc800"/>
    <path d="M0 52 L22 24 L36 40 L44 32 L64 52 V64 H0 Z" fill="#58cc02"/>
    <text x="32" y="60" font-size="6" font-weight="900" text-anchor="middle" fill="#3c3c3c">RVA</text>`;
  const FX = 29, FY = 32; // both views zoom towards the mountain's diagonal edge

  WIDGETS.zoom = {
    markup: () => `
      <div class="row g-3">
        <div class="col-6">
          <div class="zoom-frame"><canvas class="js-raster" width="64" height="64" aria-label="Raster version of the drawing"></canvas></div>
          <p class="fw-bold mb-0 mt-2">Raster <span class="text-secondary fw-semibold small">(pixels)</span></p>
          <p class="small text-secondary mb-0 js-raster-note"></p>
        </div>
        <div class="col-6">
          <div class="zoom-frame"><svg class="js-vector" viewBox="0 0 64 64" aria-label="Vector version of the drawing">${VECTOR_ART}</svg></div>
          <p class="fw-bold mb-0 mt-2">Vector <span class="text-secondary fw-semibold small">(paths)</span></p>
          <p class="small text-secondary mb-0 js-vector-note"></p>
        </div>
      </div>
      <div class="mt-4 p-3 border rounded-4">
        <div class="d-flex justify-content-between fw-bold">
          <label for="zoomRange">Zoom level</label><output class="js-out" for="zoomRange">1×</output>
        </div>
        <input type="range" class="form-range" id="zoomRange" min="1" max="16" step="0.5" value="1">
        <div class="d-flex gap-2 flex-wrap">
          <button class="chip" type="button" data-zoom="1">100%</button>
          <button class="chip" type="button" data-zoom="4">400%</button>
          <button class="chip" type="button" data-zoom="16">1600%</button>
        </div>
      </div>
      <div class="callout mt-3"><strong>What do you notice?</strong> <span class="js-observe"></span></div>`,

    init(root) {
      const canvas = root.querySelector(".js-raster");
      const svg = root.querySelector(".js-vector");
      const slider = root.querySelector("#zoomRange");

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
        root.querySelector(".js-out").textContent = z + "×";
        canvas.style.transformOrigin = `${FX / 64 * 100}% ${FY / 64 * 100}%`;
        canvas.style.transform = `scale(${z})`;
        // Vector: shrink the viewBox around the focus, so the browser redraws the shapes sharply
        const size = 64 / z;
        svg.setAttribute("viewBox", `${FX - FX / z} ${FY - FY / z} ${size} ${size}`);

        const side = Math.round(64 * z);
        root.querySelector(".js-raster-note").textContent = `Needs ${side}×${side} px (≈ ${kb(side * side * 3)} raw) to stay sharp`;
        root.querySelector(".js-vector-note").textContent = `Always ≈ ${kb(VECTOR_BYTES)} at any size`;
        root.querySelector(".js-observe").textContent = z <= 1.5
          ? "At 1× both look the same. Zoom in!"
          : z < 6 ? "The raster's edges are starting to look jagged, while the vector stays smooth."
          : "Each raster pixel is now a big visible block. The vector is still perfectly sharp.";
        root.querySelectorAll("[data-zoom]").forEach(c => c.classList.toggle("active", Number(c.dataset.zoom) === z));
      }
      slider.addEventListener("input", e => update(e.target.value));
      root.querySelectorAll("[data-zoom]").forEach(c => c.addEventListener("click", () => update(c.dataset.zoom)));
      update(1);
    },
  };
})();
