/* Lesson 5 · Scaling without loss */
LESSONS[5] = {
  steps: [
    {
      title: "Same file, any size",
      html: `
        <p class="lead">When a vector is enlarged, the computer simply recalculates its paths for the new size. Nothing is stretched, so nothing blurs.</p>
        <figure class="d-flex align-items-end justify-content-center gap-3 flex-wrap">
          <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true"><path fill="#ffc800" d="m12 2 3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21l1.4-7L2 9.3l7-.8L12 2Z"/></svg>
          <svg width="80" height="80" viewBox="0 0 24 24" aria-hidden="true"><path fill="#ffc800" d="m12 2 3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21l1.4-7L2 9.3l7-.8L12 2Z"/></svg>
          <svg width="180" height="180" viewBox="0 0 24 24" role="img" aria-label="The same star icon drawn at three sizes, all equally sharp"><path fill="#ffc800" d="m12 2 3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21l1.4-7L2 9.3l7-.8L12 2Z"/></svg>
          <figcaption class="w-100 text-center">One 24-unit star path, drawn at 32, 80 and 180 pixels. All three are equally sharp.</figcaption>
        </figure>
        <div class="callout mt-3"><p class="mb-0">This is why logos, icons and fonts are vectors: one file serves a phone icon and a billboard.</p></div>`,
    },
    { type: "question", q: "Why does a vector stay sharp when scaled up?", a: ["It has extra hidden pixels", "Its shapes are recalculated at the new size", "Browsers sharpen it", "It is compressed"], c: 1,
      why: "The maths is re-run for the new size, so edges are always crisp." },
    { type: "question", q: "Which is usually a vector?", a: ["A holiday photo", "A font", "A webcam stream", "A scanned page"], c: 1,
      why: "Fonts store letter outlines as paths so text scales cleanly." },
  ],
};
