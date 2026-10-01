/* Lesson 8 · Converting between them */
LESSONS[8] = {
  steps: [
    {
      title: "Rasterising and tracing",
      html: `
        <p class="lead">You can turn one type into the other, but the two directions are not equal.</p>
        <h2 class="mt-3">Vector → raster: <em>rasterising</em></h2>
        <p>Easy and exact. Every time a screen shows an SVG, it is rasterised into pixels at that moment. Exporting a logo as PNG does the same thing once.</p>
        <h2 class="mt-3">Raster → vector: <em>tracing</em></h2>
        <p>Harder. Software has to guess where the edges are and draw paths over them. It works well for simple, flat artwork, but a traced photo looks like a poster and can be huge.</p>`,
    },
    { type: "question", q: "Turning an SVG into a PNG is called…", a: ["Tracing", "Rasterising", "Compressing", "Vectorising"], c: 1,
      why: "Rasterising converts shapes into a grid of pixels." },
    { type: "question", q: "Why is tracing a photo into a vector rarely a good idea?", a: ["It's illegal", "Photos have too much subtle detail to turn into clean shapes", "Vectors can't have colour", "It makes the photo smaller"], c: 1,
      why: "Tracing works for flat artwork, not the endless colour changes in a photo." },
  ],
};
