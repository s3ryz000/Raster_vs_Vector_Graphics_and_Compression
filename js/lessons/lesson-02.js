/* Lesson 2 · Resolution & zooming */
LESSONS[2] = {
  steps: [
    {
      title: "Resolution: how many pixels?",
      html: `
        <p class="lead">A raster image's <strong>resolution</strong> is its width × height in pixels, for example 1920 × 1080.</p>
        <p>More pixels means more detail, but also a bigger file. A 4000 × 3000 photo has 12 million pixels; at 3 bytes per pixel that is about 36 MB before compression.</p>
        <div class="callout mt-3">
          <h3 class="h6 fw-bold mb-1">PPI vs. pixels</h3>
          <p class="mb-0"><strong>PPI</strong> (pixels per inch) only describes how tightly pixels are packed when shown or printed. It does not add detail: an image's pixel count is what really matters.</p>
        </div>`,
    },
    {
      eyebrow: "Try it · Interactive demo",
      title: "Zooming can't invent detail",
      html: `<p>Zooming a raster spreads the same pixels over more screen space. Watch how much bigger the raster would have to be to stay sharp.</p>`,
      widget: "zoom",
    },
    { type: "question", q: "A 100 × 100 image has how many pixels?", a: ["200", "1,000", "10,000", "100"], c: 2,
      why: "Width × height: 100 × 100 = 10,000 pixels." },
    { type: "question", q: "Raising an image's PPI setting without adding pixels…", a: ["Adds more detail", "Changes only its printed size", "Makes it a vector", "Doubles the file size"], c: 1,
      why: "PPI just packs the same pixels closer together; detail stays the same." },
  ],
};
