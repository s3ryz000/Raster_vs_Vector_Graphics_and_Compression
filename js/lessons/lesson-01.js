/* Lesson 1 · What is a pixel? (Module 1: text, SVG, raster image, audio, interactive widget) */
LESSONS[1] = {
  steps: [
    {
      title: "Pixels vs. Paths: two ways to draw a picture",
      html: `
        <p class="lead">Every image on your screen is stored in one of two ways: as a <strong>grid of coloured dots</strong> or as a <strong>set of mathematical instructions</strong>.</p>
        <h2 class="mt-4">Raster images: a mosaic of pixels</h2>
        <p>A <strong>raster</strong> image (also called a bitmap) is a grid of tiny squares called <strong>pixels</strong>. Each pixel stores one colour. Photos from your phone are raster images: a 12-megapixel photo holds about 12 million pixels.</p>
        <p>Because the number of pixels is fixed, enlarging a raster image stretches each pixel, and the picture turns blocky (“pixelated”).</p>
        <h2 class="mt-4">Vector images: shapes described by maths</h2>
        <p>A <strong>vector</strong> image stores <em>instructions</em> such as “draw a circle here, radius 40, filled orange”. The computer redraws those shapes at any size, so a vector logo looks just as sharp on a billboard as on a business card.</p>
        <div class="callout mt-3">
          <h3 class="h6 fw-bold mb-1">What does this mean?</h3>
          <p class="mb-0"><strong>Resolution</strong> is how many pixels an image has. Raster images depend on it, while vector images ignore it.</p>
        </div>`,
    },
    {
      eyebrow: "Diagram · Inline SVG",
      title: "Which type is it?",
      html: `<p>Hover over or tap a box to learn more. This diagram is itself a vector graphic, so try zooming the page and watch it stay crisp.</p>`,
      widget: "flowchart",
    },
    {
      eyebrow: "Example · Raster image (WebP)",
      title: "A photo is a raster",
      html: `
        <figure class="mb-0">
          <picture>
            <source type="image/webp"
                    srcset="https://picsum.photos/id/1015/480/300.webp 480w, https://picsum.photos/id/1015/960/600.webp 960w"
                    sizes="(min-width: 768px) 700px, 100vw">
            <img src="https://picsum.photos/id/1015/960/600.jpg" class="img-fluid rounded-4 w-100"
                 width="960" height="600" decoding="async"
                 alt="A river winding through a mountain valley, used as an example raster photograph">
          </picture>
          <figcaption>Served as WebP at two sizes (480 px or 960 px wide). The browser downloads only the size your screen needs, which is an easy way to save bandwidth.</figcaption>
        </figure>`,
    },
    {
      eyebrow: "Try it · Interactive demo",
      title: "Zoom in: pixels vs. paths",
      html: `<p>Drag the slider. The left image is a 64 × 64 pixel raster, and the right is the same drawing as a vector.</p>`,
      widget: "zoom",
    },
    {
      eyebrow: "Bonus · Audio",
      title: "Sound can be “vector” too",
      html: `<p>An MP3 stores thousands of <em>samples</em> per second, much like a raster stores pixels. This keyboard stores no audio at all. It uses the Web Audio API to <strong>generate sound from a formula</strong>, just as an SVG generates shapes. Play it with the mouse or the keys <kbd>A</kbd>–<kbd>K</kbd>.</p>`,
      widget: "synth",
    },
    { type: "question", q: "A phone photo is made of…", a: ["Mathematical paths", "A grid of pixels", "Sound samples", "Fonts"], c: 1,
      why: "Photos are raster images: millions of coloured pixels." },
    { type: "question", q: "Which image stays sharp when enlarged to billboard size?", a: ["A JPEG photo", "A PNG screenshot", "An SVG logo", "A GIF"], c: 2,
      why: "SVG is a vector format, so it is redrawn from maths at any size." },
    { type: "question", q: "What happens to a raster image when you zoom in a lot?", a: ["It gets sharper", "Nothing changes", "It becomes pixelated", "It turns into a vector"], c: 2,
      why: "Each pixel gets stretched into a visible block." },
  ],
};
