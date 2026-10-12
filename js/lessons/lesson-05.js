/* Lesson 5 · JPEG, WebP & Audio (Unit 5: Lossy Compression & Audio) */
LESSONS[5] = {
  steps: [
    {
      title: "Lossy Perception: Tricks of the Human Eye",
      html: `
        <p class="lead">Lossy compression works not by saving bytes blindly, but by exploiting the physical biological limits of the human sensory system.</p>
        <h2 class="mt-4">Rods vs. Cones & Chroma Subsampling</h2>
        <p>The human retina contains approximately <strong>120 million rods</strong> (sensitive to brightness/luminance) and only <strong>6 million cones</strong> (sensitive to color/chrominance). We are vastly more sensitive to sharp brightness edges than fine color shifts.</p>
        <p><strong>Chroma Subsampling (4:2:0):</strong> Video and JPEG algorithms separate an image into Luminance (Y) and Chrominance (Cb, Cr), then throw away 75% of the color samples. Our brains barely notice!</p>
        <h2 class="mt-4">JPEG & The Discrete Cosine Transform (DCT)</h2>
        <p>JPEG divides images into 8 × 8 pixel blocks, transforms spatial pixels into frequency waves via the DCT, and quantizes (rounds off) subtle high-frequency wave coefficients.</p>`,
    },
    {
      eyebrow: "Interactive Demonstration",
      title: "JPEG Quality & Artifact Explorer",
      html: `
        <p>Drag the slider below to witness lossy quantization in action. Notice how aggressive compression exposes 8 × 8 block boundaries and creates ringing artifacts around sharp contours:</p>`,
      widget: "jpeg",
    },
    {
      eyebrow: "Bonus Audio Lab",
      title: "Audio Compression & The Web Audio Synthesizer",
      html: `
        <p class="lead">Just as JPEG discards imperceptible high visual frequencies, <strong>MP3 audio compression</strong> uses psychoacoustics to discard audio frequencies masked by louder sounds.</p>
        <p>Meanwhile, just as vector graphics draw shapes from formulas instead of storing pixels, the <strong>Web Audio API</strong> can generate rich sound waves in real time from mathematical equations without storing audio files at all!</p>
        <p>Play the interactive synth below with your mouse or keys <kbd>A</kbd>–<kbd>K</kbd>:</p>`,
      widget: "synth",
    },
    {
      type: "question",
      format: "multiple-choice",
      q: "Why can 4:2:0 chroma subsampling discard up to 75% of color data without severe perceived loss?",
      a: [
        "Computer monitors cannot display full color",
        "The human retina has far more luminance-sensing rods than color-sensing cones",
        "Processors only process grayscale data efficiently",
        "Color is only visible in daylight"
      ],
      c: 1,
      why: "The human eye has ~120M brightness rods and only ~6M color cones, making human vision far less sensitive to color resolution."
    },
    {
      type: "question",
      format: "true-false",
      q: "True or False: Modern web formats like WebP and AVIF achieve smaller file sizes than legacy JPEG at identical visual quality.",
      c: 0,
      why: "True! WebP and AVIF use advanced intra-frame block prediction and modern transforms to compress up to 30-50% smaller than legacy JPEG."
    },
    {
      type: "question",
      format: "fill-blank",
      q: "Which mathematical transform converts 8×8 pixel blocks into spatial frequency coefficients in JPEG? (3 letters)",
      c: ["dct"],
      why: "The Discrete Cosine Transform (DCT) translates spatial pixel blocks into frequency components for quantization."
    }
  ]
};
