/* Lesson 10 · PNG, JPEG & WebP */
LESSONS[10] = {
  steps: [
    {
      title: "Picking a format for the web",
      html: `
        <p class="lead">Each format compresses differently, so the right choice depends on the image.</p>
        <div class="table-responsive">
          <table class="table align-middle">
            <thead><tr><th scope="col">Format</th><th scope="col">Compression</th><th scope="col">Typical use</th></tr></thead>
            <tbody>
              <tr><th scope="row">PNG</th><td>Lossless</td><td>UI, screenshots, flat graphics</td></tr>
              <tr><th scope="row">JPEG</th><td>Lossy</td><td>Photos</td></tr>
              <tr><th scope="row">WebP</th><td>Lossy <em>or</em> lossless</td><td>Both, usually 25–35% smaller</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout"><p class="mb-0">The <code>&lt;picture&gt;</code> element can offer WebP with a JPEG fallback, as the photo in Lesson 1 does.</p></div>`,
    },
    { type: "question", q: "Which format can be either lossy or lossless?", a: ["PNG", "JPEG", "WebP", "GIF"], c: 2,
      why: "WebP supports both modes, which makes it a flexible default." },
    { type: "question", q: "A screenshot of code with sharp text is best saved as…", a: ["JPEG at 30% quality", "PNG", "A vector trace", "GIF"], c: 1,
      why: "Lossless PNG keeps text edges crisp; JPEG would smudge them." },
  ],
};
