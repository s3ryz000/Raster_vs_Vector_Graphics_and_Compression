/* =========================================================
   Widget: "Which type is it?" inline SVG flowchart
   Hover, focus or tap a box to read its explanation.
   ========================================================= */
WIDGETS.flowchart = {
  markup: () => `
    <svg class="flow" viewBox="0 0 640 330" role="group" aria-label="Flowchart: digital images split into raster and vector, each with typical formats and compression">
      <path class="edge" d="M320 70 V95 H160 V120 M320 95 H480 V120"/>
      <path class="edge" d="M160 175 V210 M480 175 V210"/>
      <path class="edge" d="M160 265 V280 H320 M480 265 V280 H320"/>

      <g class="fnode" tabindex="0" data-info="A digital image is any picture stored as data. The big question is how that data describes it.">
        <rect x="220" y="15" width="200" height="55" rx="14" fill="#fff" stroke="#3c3c3c"/>
        <text x="320" y="48" text-anchor="middle">Digital image</text>
      </g>
      <g class="fnode" tabindex="0" data-info="Raster: a fixed grid of pixels. Great for photos and detailed textures, but it blurs or blocks when scaled up.">
        <rect x="60" y="120" width="200" height="55" rx="14" fill="#fff" stroke="#1cb0f6"/>
        <text x="160" y="153" text-anchor="middle">Raster · pixels</text>
      </g>
      <g class="fnode" tabindex="0" data-info="Vector: points, lines and curves defined by maths. Perfect for logos, icons and type, and stays sharp at any size.">
        <rect x="380" y="120" width="200" height="55" rx="14" fill="#fff" stroke="#58cc02"/>
        <text x="480" y="153" text-anchor="middle">Vector · paths</text>
      </g>
      <g class="fnode" tabindex="0" data-info="Common raster formats: JPEG (photos, lossy), PNG (sharp UI and transparency, lossless) and WebP (modern, either mode).">
        <rect x="60" y="210" width="200" height="55" rx="14" fill="#fff" stroke="#1cb0f6"/>
        <text x="160" y="243" text-anchor="middle">JPEG · PNG · WebP</text>
      </g>
      <g class="fnode" tabindex="0" data-info="Common vector formats: SVG (the web standard), AI (Illustrator), EPS and PDF.">
        <rect x="380" y="210" width="200" height="55" rx="14" fill="#fff" stroke="#58cc02"/>
        <text x="480" y="243" text-anchor="middle">SVG · AI · PDF</text>
      </g>
      <g class="fnode" tabindex="0" data-info="Compression shrinks files. Lossless keeps every detail (PNG). Lossy throws some detail away for much smaller files (JPEG). Unit 4 covers this.">
        <rect x="220" y="275" width="200" height="50" rx="14" fill="#fff" stroke="#ffc800"/>
        <text x="320" y="305" text-anchor="middle">Compression</text>
      </g>
    </svg>
    <p class="small fw-bold text-secondary mt-2 mb-0 js-info" aria-live="polite">Select a box to see its explanation.</p>`,

  init(root) {
    const info = root.querySelector(".js-info");
    const nodes = root.querySelectorAll(".fnode");
    nodes.forEach(node => {
      const show = () => {
        nodes.forEach(x => x.classList.remove("is-selected"));
        node.classList.add("is-selected");
        info.textContent = node.dataset.info;
      };
      node.addEventListener("mouseenter", show);
      node.addEventListener("focus", show);
      node.addEventListener("click", show);
    });
  },
};
