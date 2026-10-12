/* =========================================================
   Widget: Bit Depth Calculator (Raw Image Size)
   Calculates: Width × Height × (Bit Depth / 8) = Raw Bytes
   ========================================================= */
(function () {
  WIDGETS["bit-depth"] = {
    markup: () => `
      <div class="widget-box">
        <div class="row g-3">
          <div class="col-sm-6">
            <div class="d-flex justify-content-between fw-bold mb-1">
              <label for="bdWidth">Width (px)</label>
              <output id="bdWidthOut" for="bdWidth">1920</output>
            </div>
            <input type="range" class="form-range" id="bdWidth" min="100" max="3840" step="20" value="1920">
          </div>
          <div class="col-sm-6">
            <div class="d-flex justify-content-between fw-bold mb-1">
              <label for="bdHeight">Height (px)</label>
              <output id="bdHeightOut" for="bdHeight">1080</output>
            </div>
            <input type="range" class="form-range" id="bdHeight" min="100" max="2160" step="20" value="1080">
          </div>
        </div>

        <div class="mt-3">
          <label class="fw-bold mb-2">Color Bit Depth:</label>
          <div class="d-flex gap-2 flex-wrap" role="radiogroup" aria-label="Bit depth options">
            <label class="btn btn-outline-secondary btn-sm rounded-pill px-3">
              <input type="radio" name="bdBits" value="1" class="me-1"> 1-bit (Monochrome)
            </label>
            <label class="btn btn-outline-secondary btn-sm rounded-pill px-3">
              <input type="radio" name="bdBits" value="8" class="me-1"> 8-bit (256 Colors)
            </label>
            <label class="btn btn-outline-secondary btn-sm rounded-pill px-3">
              <input type="radio" name="bdBits" value="16" class="me-1"> 16-bit (High Color)
            </label>
            <label class="btn btn-outline-secondary btn-sm rounded-pill px-3 active">
              <input type="radio" name="bdBits" value="24" checked class="me-1"> 24-bit (True Color RGB)
            </label>
            <label class="btn btn-outline-secondary btn-sm rounded-pill px-3">
              <input type="radio" name="bdBits" value="32" class="me-1"> 32-bit (RGBA + Alpha)
            </label>
          </div>
        </div>

        <div class="calc-display mt-4">
          <div class="row align-items-center">
            <div class="col-md-7">
              <p class="text-secondary small mb-1 fw-bold text-uppercase">Raw Uncompressed File Size</p>
              <div class="calc-val" id="bdResult">5.93 MB</div>
              <p class="small text-muted mb-0" id="bdFormula">1920 × 1080 × 24 bits ÷ 8 = 6,220,800 bytes</p>
            </div>
            <div class="col-md-5 mt-3 mt-md-0">
              <div class="p-2 border rounded bg-white small">
                <div><strong>Resolution:</strong> <span id="bdPixels">2,073,600</span> px</div>
                <div><strong>Max colors:</strong> <span id="bdColors">16.7 Million</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,

    init(root) {
      const widthSlider = root.querySelector("#bdWidth");
      const heightSlider = root.querySelector("#bdHeight");
      const widthOut = root.querySelector("#bdWidthOut");
      const heightOut = root.querySelector("#bdHeightOut");
      const result = root.querySelector("#bdResult");
      const formula = root.querySelector("#bdFormula");
      const pixelsOut = root.querySelector("#bdPixels");
      const colorsOut = root.querySelector("#bdColors");
      const radios = root.querySelectorAll("input[name='bdBits']");

      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " Bytes";
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / 1048576).toFixed(2) + " MB";
      }

      function getColorDesc(b) {
        switch (b) {
          case 1: return "2 (Black & White)";
          case 8: return "256 (Palette/Indexed)";
          case 16: return "65,536 (High Color)";
          case 24: return "16,777,216 (True Color)";
          case 32: return "16.7M + 256 Alpha levels";
          default: return Math.pow(2, b).toLocaleString();
        }
      }

      function update() {
        const w = parseInt(widthSlider.value, 10);
        const h = parseInt(heightSlider.value, 10);
        let bits = 24;
        radios.forEach(r => {
          if (r.checked) {
            bits = parseInt(r.value, 10);
            r.closest("label").classList.add("active", "btn-primary");
            r.closest("label").classList.remove("btn-outline-secondary");
          } else {
            r.closest("label").classList.remove("active", "btn-primary");
            r.closest("label").classList.add("btn-outline-secondary");
          }
        });

        widthOut.textContent = w;
        heightOut.textContent = h;

        const totalPixels = w * h;
        const totalBytes = (totalPixels * bits) / 8;

        pixelsOut.textContent = totalPixels.toLocaleString();
        colorsOut.textContent = getColorDesc(bits);
        result.textContent = formatSize(totalBytes);
        formula.textContent = `${w.toLocaleString()} × ${h.toLocaleString()} × ${bits} bits ÷ 8 = ${Math.round(totalBytes).toLocaleString()} bytes`;
      }

      widthSlider.addEventListener("input", update);
      heightSlider.addEventListener("input", update);
      radios.forEach(r => r.addEventListener("change", update));
      update();
    }
  };
})();
