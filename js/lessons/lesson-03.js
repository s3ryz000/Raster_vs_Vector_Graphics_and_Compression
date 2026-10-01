/* Lesson 3 · Raster formats */
LESSONS[3] = {
  steps: [
    {
      title: "Meet the raster formats",
      html: `
        <p class="lead">All of these store pixels, but each one is tuned for a different job.</p>
        <div class="table-responsive">
          <table class="table align-middle">
            <thead><tr><th scope="col">Format</th><th scope="col">Best for</th><th scope="col">Transparency</th></tr></thead>
            <tbody>
              <tr><th scope="row">JPEG</th><td>Photos</td><td>No</td></tr>
              <tr><th scope="row">PNG</th><td>Screenshots, UI, sharp edges</td><td>Yes</td></tr>
              <tr><th scope="row">GIF</th><td>Simple animations (256 colours)</td><td>On/off only</td></tr>
              <tr><th scope="row">WebP</th><td>Almost everything on the web</td><td>Yes</td></tr>
            </tbody>
          </table>
        </div>`,
    },
    { type: "question", q: "You need a logo screenshot with a transparent background. Which raster format?", a: ["JPEG", "PNG", "GIF", "BMP"], c: 1,
      why: "PNG keeps sharp edges and supports full transparency." },
    { type: "question", q: "GIF is limited to how many colours?", a: ["16", "256", "65,536", "Millions"], c: 1,
      why: "GIF uses a palette of at most 256 colours, so it struggles with photos." },
  ],
};
