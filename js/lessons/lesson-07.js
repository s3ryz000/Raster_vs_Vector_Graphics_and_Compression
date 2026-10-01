/* Lesson 7 · Choosing the right type */
LESSONS[7] = {
  steps: [
    {
      title: "Raster or vector? Ask what the image is",
      html: `
        <p class="lead">A simple rule: if it came from a <strong>camera</strong>, use raster. If it was <strong>drawn from shapes</strong>, use vector.</p>
        <div class="row g-3">
          <div class="col-sm-6"><div class="callout h-100">
            <h2 class="h5">Choose raster for</h2>
            <ul class="mb-0"><li>Photos</li><li>Detailed paintings and textures</li><li>Screenshots</li></ul>
          </div></div>
          <div class="col-sm-6"><div class="callout h-100">
            <h2 class="h5">Choose vector for</h2>
            <ul class="mb-0"><li>Logos and icons</li><li>Charts, diagrams and maps</li><li>Text and illustrations</li></ul>
          </div></div>
        </div>`,
    },
    { type: "question", q: "A company logo that must work on cups and billboards should be…", a: ["A JPEG", "A vector (SVG)", "A GIF", "A 64 × 64 PNG"], c: 1,
      why: "One vector file scales to every size without blurring." },
    { type: "question", q: "A sunset photo from your phone is best kept as…", a: ["Raster", "Vector", "Text", "Audio"], c: 0,
      why: "Photos have millions of subtle colours that only pixels capture well." },
  ],
};
