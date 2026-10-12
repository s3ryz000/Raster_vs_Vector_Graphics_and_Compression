/* =========================================================
   Widget: RGB Color Mixer & Subpixel Visualizer
   Simulates additive primary channels and screen subpixels.
   ========================================================= */
(function () {
  WIDGETS["rgb"] = {
    markup: () => `
      <div class="widget-box">
        <!-- Live Color Swatch -->
        <div class="rgb-swatch mb-3" id="rgbSwatch">
          <span id="rgbHex" class="badge bg-dark bg-opacity-75 px-3 py-2 font-monospace">#FF7F00</span>
        </div>

        <!-- Simulated Subpixel Magnification -->
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="small text-secondary fw-bold text-uppercase">Microscopic Screen Subpixels (RGB)</span>
            <span class="small font-monospace" id="rgbPercentages">R: 33% · G: 33% · B: 33%</span>
          </div>
          <div class="subpixel-grid">
            <div class="subpixel red" id="subpixelR" title="Red Subpixel"></div>
            <div class="subpixel green" id="subpixelG" title="Green Subpixel"></div>
            <div class="subpixel blue" id="subpixelB" title="Blue Subpixel"></div>
          </div>
        </div>

        <!-- 3 Color Sliders -->
        <div class="d-flex flex-column gap-2 mt-3">
          <div>
            <div class="d-flex justify-content-between fw-bold small text-danger">
              <label for="rgbR">Red (0–255)</label>
              <output id="rgbROut" for="rgbR">255</output>
            </div>
            <input type="range" class="form-range" id="rgbR" min="0" max="255" value="255">
          </div>

          <div>
            <div class="d-flex justify-content-between fw-bold small text-success">
              <label for="rgbG">Green (0–255)</label>
              <output id="rgbGOut" for="rgbG">127</output>
            </div>
            <input type="range" class="form-range" id="rgbG" min="0" max="255" value="127">
          </div>

          <div>
            <div class="d-flex justify-content-between fw-bold small text-primary">
              <label for="rgbB">Blue (0–255)</label>
              <output id="rgbBOut" for="rgbB">0</output>
            </div>
            <input type="range" class="form-range" id="rgbB" min="0" max="255" value="0">
          </div>
        </div>

        <!-- Preset Palette Buttons -->
        <div class="d-flex gap-2 flex-wrap mt-3 pt-2 border-top">
          <span class="small text-muted align-self-center">Try:</span>
          <button class="chip" type="button" data-r="255" data-g="255" data-b="255">White</button>
          <button class="chip" type="button" data-r="255" data-g="255" data-b="0">Yellow</button>
          <button class="chip" type="button" data-r="0" data-g="255" data-b="255">Cyan</button>
          <button class="chip" type="button" data-r="255" data-g="0" data-b="255">Magenta</button>
          <button class="chip" type="button" data-r="88" data-g="204" data-b="2">Brand Green</button>
        </div>
      </div>
    `,

    init(root) {
      const rSlider = root.querySelector("#rgbR");
      const gSlider = root.querySelector("#rgbG");
      const bSlider = root.querySelector("#rgbB");
      const rOut = root.querySelector("#rgbROut");
      const gOut = root.querySelector("#rgbGOut");
      const bOut = root.querySelector("#rgbBOut");
      const swatch = root.querySelector("#rgbSwatch");
      const hexSpan = root.querySelector("#rgbHex");
      const percentages = root.querySelector("#rgbPercentages");
      const subpixelR = root.querySelector("#subpixelR");
      const subpixelG = root.querySelector("#subpixelG");
      const subpixelB = root.querySelector("#subpixelB");
      const presetChips = root.querySelectorAll(".chip");

      function toHex(n) {
        return Number(n).toString(16).padStart(2, "0").toUpperCase();
      }

      function update() {
        const r = parseInt(rSlider.value, 10);
        const g = parseInt(gSlider.value, 10);
        const b = parseInt(bSlider.value, 10);

        rOut.textContent = r;
        gOut.textContent = g;
        bOut.textContent = b;

        const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        swatch.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        hexSpan.textContent = `${hex} · rgb(${r}, ${g}, ${b})`;

        // Subpixel intensity simulation
        subpixelR.style.opacity = Math.max(0.08, r / 255);
        subpixelG.style.opacity = Math.max(0.08, g / 255);
        subpixelB.style.opacity = Math.max(0.08, b / 255);

        // Percentages
        const total = r + g + b || 1;
        const rPct = Math.round((r / total) * 100);
        const gPct = Math.round((g / total) * 100);
        const bPct = Math.round((b / total) * 100);
        percentages.textContent = `R: ${rPct}% · G: ${gPct}% · B: ${bPct}%`;
      }

      rSlider.addEventListener("input", update);
      gSlider.addEventListener("input", update);
      bSlider.addEventListener("input", update);

      presetChips.forEach(chip => {
        chip.addEventListener("click", () => {
          rSlider.value = chip.dataset.r;
          gSlider.value = chip.dataset.g;
          bSlider.value = chip.dataset.b;
          update();
        });
      });

      update();
    }
  };
})();
