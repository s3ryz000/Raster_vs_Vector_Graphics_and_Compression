/* =========================================================
   Widget: Chroma Subsampling Visualizer (4:4:4 vs 4:2:0)
   Demonstrates YCbCr color spaces and perceptual lossy compression.
   ========================================================= */
(function () {
  WIDGETS["subsampling"] = {
    markup: () => `
      <div class="widget-box">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <label class="fw-bold mb-0">Select Chroma Subsampling Scheme:</label>
          <div class="btn-group" role="group" aria-label="Subsampling modes">
            <button type="button" class="btn btn-sm btn-primary active" id="subMode444" data-mode="444">4:4:4 (Full)</button>
            <button type="button" class="btn btn-sm btn-outline-secondary" id="subMode420" data-mode="420">4:2:0 (Web/JPEG)</button>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-sm-6">
            <p class="small text-secondary fw-bold text-uppercase mb-1">Luminance (Y Channel - Detail)</p>
            <div class="subsampling-grid" id="lumGrid">
              <!-- 4x4 grid of luminance blocks -->
            </div>
            <p class="small text-muted mt-1 mb-0">16 samples (100% fine sharpness)</p>
          </div>
          <div class="col-sm-6">
            <p class="small text-secondary fw-bold text-uppercase mb-1" id="chromaTitle">Chrominance (Cb / Cr - Color)</p>
            <div class="subsampling-grid" id="chromaGrid">
              <!-- 4x4 grid of color blocks -->
            </div>
            <p class="small text-muted mt-1 mb-0" id="chromaSampleCount">16 samples (100% color resolution)</p>
          </div>
        </div>

        <div class="calc-display mt-4">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <p class="small text-secondary fw-bold text-uppercase mb-0">Color Data Bandwidth</p>
              <div class="calc-val" id="chromaBandwidth">100% (No reduction)</div>
            </div>
            <div class="text-end">
              <span class="badge text-bg-info px-3 py-2" id="chromaSavings">0% saved</span>
            </div>
          </div>
        </div>

        <div class="callout mt-3 small" id="chromaNote">
          <strong>Human Biology Insight:</strong> The human retina contains ~120 million rod cells (luminance/brightness) and only ~6 million cone cells (chrominance/color). <strong>4:2:0 subsampling</strong> discards 75% of color samples, saving 50% total raw data with almost zero noticeable blur to human eyes!
        </div>
      </div>
    `,

    init(root) {
      const lumGrid = root.querySelector("#lumGrid");
      const chromaGrid = root.querySelector("#chromaGrid");
      const btn444 = root.querySelector("#subMode444");
      const btn420 = root.querySelector("#subMode420");
      const sampleCount = root.querySelector("#chromaSampleCount");
      const bandwidth = root.querySelector("#chromaBandwidth");
      const savings = root.querySelector("#chromaSavings");

      // Fill 4x4 grid for Luminance (brightness shades of gray)
      const lumShades = [
        "#333", "#555", "#777", "#999",
        "#444", "#666", "#888", "#aaa",
        "#555", "#777", "#999", "#bbb",
        "#666", "#888", "#aaa", "#ccc"
      ];
      lumGrid.innerHTML = lumShades.map(c => `<div class="chroma-block" style="background:${c}">Y</div>`).join("");

      // Colors for 4x4
      const fullColors = [
        "#ff3b30", "#ff9500", "#ffcc00", "#34c759",
        "#ff2d55", "#af52de", "#5856d6", "#007aff",
        "#5ac8fa", "#4cd964", "#ff3b30", "#ff9500",
        "#e5e5ea", "#d1d1d6", "#c7c7cc", "#8e8e93"
      ];

      function render(mode) {
        if (mode === "444") {
          btn444.classList.add("btn-primary", "active");
          btn444.classList.remove("btn-outline-secondary");
          btn420.classList.remove("btn-primary", "active");
          btn420.classList.add("btn-outline-secondary");

          chromaGrid.innerHTML = fullColors.map((c, idx) =>
            `<div class="chroma-block" style="background:${c}">C${idx+1}</div>`
          ).join("");
          sampleCount.textContent = "16 color samples (100% full color resolution)";
          bandwidth.textContent = "100% (Full 4:4:4)";
          bandwidth.style.color = "var(--ink)";
          savings.textContent = "0% saved";
          savings.className = "badge text-bg-secondary px-3 py-2";
        } else {
          btn420.classList.add("btn-primary", "active");
          btn420.classList.remove("btn-outline-secondary");
          btn444.classList.remove("btn-primary", "active");
          btn444.classList.add("btn-outline-secondary");

          // In 4:2:0, each 2x2 block shares 1 averaged color
          // Block 1 (top-left 2x2): #ff6a18
          // Block 2 (top-right 2x2): #1aa06a
          // Block 3 (bottom-left 2x2): #a04ae0
          // Block 4 (bottom-right 2x2): #a8a8a8
          const b1 = "#ff6a18", b2 = "#1aa06a", b3 = "#a04ae0", b4 = "#a8a8a8";
          const downsampledColors = [
            b1, b1, b2, b2,
            b1, b1, b2, b2,
            b3, b3, b4, b4,
            b3, b3, b4, b4
          ];

          chromaGrid.innerHTML = downsampledColors.map((c, idx) => {
            const blockNum = (idx < 8 ? (idx % 4 < 2 ? 1 : 2) : (idx % 4 < 2 ? 3 : 4));
            return `<div class="chroma-block" style="background:${c}">B${blockNum}</div>`;
          }).join("");

          sampleCount.textContent = "4 color samples (2×2 downsampled blocks)";
          bandwidth.textContent = "50% Raw Size (4:2:0)";
          bandwidth.style.color = "var(--brand)";
          savings.textContent = "50% total savings!";
          savings.className = "badge text-bg-success px-3 py-2";
        }
      }

      btn444.addEventListener("click", () => render("444"));
      btn420.addEventListener("click", () => render("420"));
      render("444");
    }
  };
})();
