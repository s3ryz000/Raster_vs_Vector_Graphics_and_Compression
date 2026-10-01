/* Lesson 11 · JPEG quality */
LESSONS[11] = {
  steps: [
    {
      title: "The quality slider",
      html: `
        <p class="lead">When you save a JPEG you choose a <strong>quality</strong> from 0 to 100. Lower quality throws away more detail, so the file gets smaller.</p>
        <p>JPEG works on 8 × 8 pixel blocks. At low quality those blocks, and smudges around sharp edges called <strong>artefacts</strong>, start to show.</p>`,
    },
    {
      eyebrow: "Try it · Interactive demo",
      title: "Squeeze the file",
      html: `<p>This image is re-saved as a real JPEG in your browser every time you move the slider. Watch the file size and the stripes at the top.</p>`,
      widget: "jpeg",
    },
    { type: "question", q: "Lowering JPEG quality makes the file…", a: ["Bigger and sharper", "Smaller with more artefacts", "A vector", "Lossless"], c: 1,
      why: "Less detail kept means fewer bytes, and visible blocks at low settings." },
    { type: "question", q: "Which part of an image shows JPEG artefacts first?", a: ["Smooth sky gradients", "Sharp edges and text", "Large flat areas", "The image border"], c: 1,
      why: "Hard edges need lots of detail, so JPEG smears them first." },
  ],
};
