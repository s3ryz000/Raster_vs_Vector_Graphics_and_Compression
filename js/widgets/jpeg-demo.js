/* =========================================================
   Widget: JPEG quality slider (Lesson 11)
   Re-encodes a drawn image as JPEG in the browser and shows the real file size.
   ========================================================= */
(function () {
  // Bytes in a data: URL's base64 payload
  const bytes = url => Math.round((url.length - url.indexOf(",") - 1) * 3 / 4);
  const kb = n => (n / 1024).toFixed(1) + " KB";

  // A small scene with smooth gradients (compress well) and sharp edges/text (show artefacts)
  function drawScene(ctx, w, h) {
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#1cb0f6");
    sky.addColorStop(1, "#ddf4ff");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#ffc800";
    ctx.beginPath(); ctx.arc(w * 0.75, h * 0.28, 22, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#58cc02";
    ctx.beginPath(); ctx.moveTo(0, h * 0.8); ctx.lineTo(w * 0.35, h * 0.35); ctx.lineTo(w * 0.55, h * 0.62);
    ctx.lineTo(w * 0.7, h * 0.48); ctx.lineTo(w, h * 0.8); ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.fill();
    ctx.fillStyle = "#3c3c3c";
    ctx.font = "900 22px Nunito, sans-serif";
    ctx.fillText("RVA", 12, h - 14);
    for (let x = 0; x < w; x += 6) ctx.fillRect(x, 6, 2, 10); // fine stripes: hard for JPEG
  }

  WIDGETS.jpeg = {
    markup: () => `
      <div class="row g-3">
        <figure class="col-6 mb-0">
          <canvas class="jpeg-frame js-src" width="240" height="160" aria-label="Original image"></canvas>
          <figcaption>Original (PNG, lossless) · <span class="js-png"></span></figcaption>
        </figure>
        <figure class="col-6 mb-0">
          <img class="jpeg-frame js-jpg" width="240" height="160" alt="The same image saved as a JPEG at the chosen quality">
          <figcaption>JPEG at <span class="js-q"></span>% · <strong class="js-size"></strong></figcaption>
        </figure>
      </div>
      <div class="mt-4 p-3 border rounded-4">
        <div class="d-flex justify-content-between fw-bold">
          <label for="qualityRange">JPEG quality</label><output class="js-out" for="qualityRange"></output>
        </div>
        <input type="range" class="form-range" id="qualityRange" min="1" max="100" value="80">
        <div class="d-flex gap-2 flex-wrap">
          <button class="chip" type="button" data-q="10">10%</button>
          <button class="chip" type="button" data-q="50">50%</button>
          <button class="chip" type="button" data-q="90">90%</button>
        </div>
      </div>
      <div class="callout mt-3"><strong>What do you notice?</strong> <span class="js-observe"></span></div>`,

    init(root) {
      const src = root.querySelector(".js-src");
      const slider = root.querySelector("#qualityRange");
      drawScene(src.getContext("2d"), src.width, src.height);
      const pngBytes = bytes(src.toDataURL("image/png"));
      root.querySelector(".js-png").textContent = kb(pngBytes);

      function update(q) {
        q = Number(q);
        slider.value = q;
        const url = src.toDataURL("image/jpeg", q / 100);
        root.querySelector(".js-jpg").src = url;
        root.querySelector(".js-q").textContent = q;
        root.querySelector(".js-out").textContent = q + "%";
        root.querySelector(".js-size").textContent = `${kb(bytes(url))} (${Math.round(bytes(url) / pngBytes * 100)}% of PNG)`;
        root.querySelector(".js-observe").textContent = q >= 80
          ? "It looks almost identical to the original, yet the file is already smaller."
          : q >= 35 ? "Look at the stripes and the text: smudgy blocks (“artefacts”) are appearing."
          : "Heavy compression: 8×8 blocks and colour smears are obvious, but the file is tiny.";
        root.querySelectorAll("[data-q]").forEach(c => c.classList.toggle("active", Number(c.dataset.q) === q));
      }
      slider.addEventListener("input", e => update(e.target.value));
      root.querySelectorAll("[data-q]").forEach(c => c.addEventListener("click", () => update(c.dataset.q)));
      // Wait for the web font so the "RVA" text is drawn in Nunito
      document.fonts.ready.then(() => {
        drawScene(src.getContext("2d"), src.width, src.height);
        update(slider.value);
      });
      update(slider.value);
    },
  };
})();
