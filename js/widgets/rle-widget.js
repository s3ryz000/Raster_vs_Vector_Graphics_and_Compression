/* =========================================================
   Widget: Run-Length Encoding (RLE) Visualizer
   Encodes repeated characters and calculates the compression ratio.
   ========================================================= */
(function () {
  WIDGETS["rle"] = {
    markup: () => `
      <div class="widget-box">
        <label for="rleInput" class="form-label fw-bold">Enter Raw Uncompressed Characters:</label>
        <div class="input-group mb-2">
          <input type="text" class="form-control font-monospace" id="rleInput"
                 value="WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWW"
                 placeholder="Type repeated characters, e.g. AAAAABBBCCCC"
                 maxlength="100">
          <button class="btn btn-outline-secondary" type="button" id="rleClear">Clear</button>
        </div>

        <div class="d-flex gap-2 flex-wrap mb-3">
          <span class="small text-muted align-self-center">Presets:</span>
          <button class="chip" type="button" data-val="AAAAABBBCCCCCCCCDDDDDD">Repeating runs</button>
          <button class="chip" type="button" data-val="111111111100000000001111111111">Binary bitmap row</button>
          <button class="chip" type="button" data-val="ABCDEFGH">No runs (worst case!)</button>
        </div>

        <!-- Encoded output and stats -->
        <div class="calc-display mt-3">
          <p class="small text-secondary fw-bold text-uppercase mb-1">RLE Compressed Output</p>
          <div class="rle-box text-success mb-3" id="rleOutput">12W1B12W3B12W</div>

          <div class="row g-2 align-items-center">
            <div class="col-sm-6">
              <div class="p-2 border rounded bg-white small">
                <div><strong>Original length:</strong> <span id="rleOrigLen">40</span> characters (<span id="rleOrigBytes">40</span> B)</div>
                <div><strong>Compressed length:</strong> <span id="rleCompLen">13</span> characters (<span id="rleCompBytes">13</span> B)</div>
              </div>
            </div>
            <div class="col-sm-6 text-sm-end">
              <span class="ratio-badge ratio-good d-inline-block" id="rleRatioBadge">67.5% reduction</span>
            </div>
          </div>
        </div>

        <div class="callout mt-3 small" id="rleNote">
          <strong>Key Insight:</strong> RLE shines on flat vector graphics, cartoon line art, and simple bitmaps with long identical runs. On random noisy photos, it can actually make files larger!
        </div>
      </div>
    `,

    init(root) {
      const input = root.querySelector("#rleInput");
      const clearBtn = root.querySelector("#rleClear");
      const output = root.querySelector("#rleOutput");
      const origLen = root.querySelector("#rleOrigLen");
      const origBytes = root.querySelector("#rleOrigBytes");
      const compLen = root.querySelector("#rleCompLen");
      const compBytes = root.querySelector("#rleCompBytes");
      const ratioBadge = root.querySelector("#rleRatioBadge");
      const note = root.querySelector("#rleNote");
      const chips = root.querySelectorAll(".chip");

      function encodeRLE(str) {
        if (!str) return "";
        let result = "";
        let count = 1;
        for (let i = 0; i < str.length; i++) {
          if (str[i] === str[i + 1]) {
            count++;
          } else {
            result += count + str[i];
            count = 1;
          }
        }
        return result;
      }

      function update() {
        const text = input.value;
        const encoded = encodeRLE(text);

        output.textContent = encoded || "(empty)";
        origLen.textContent = text.length;
        origBytes.textContent = text.length;
        compLen.textContent = encoded.length;
        compBytes.textContent = encoded.length;

        if (text.length === 0) {
          ratioBadge.className = "ratio-badge ratio-good";
          ratioBadge.textContent = "0% reduction";
          return;
        }

        const savings = Math.round((1 - encoded.length / text.length) * 100);
        if (savings >= 0) {
          ratioBadge.className = "ratio-badge ratio-good";
          ratioBadge.textContent = `${savings}% smaller`;
          note.innerHTML = `<strong>Compression successful:</strong> The runs of identical characters allowed RLE to shrink the stream by <strong>${savings}%</strong>.`;
        } else {
          ratioBadge.className = "ratio-badge ratio-bad";
          ratioBadge.textContent = `${Math.abs(savings)}% larger (data explosion!)`;
          note.innerHTML = `<strong>Negative compression!</strong> Without repeated characters, storing the run counters added overhead, making the compressed version <strong>${Math.abs(savings)}% larger</strong> than the original!`;
        }
      }

      input.addEventListener("input", update);
      clearBtn.addEventListener("click", () => {
        input.value = "";
        update();
        input.focus();
      });

      chips.forEach(chip => {
        chip.addEventListener("click", () => {
          input.value = chip.dataset.val;
          update();
        });
      });

      update();
    }
  };
})();
