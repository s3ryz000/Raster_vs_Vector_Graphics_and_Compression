/* Lesson 2 · RGB & Bit Depth (Unit 2: The World of Color) */
LESSONS[2] = {
  steps: [
    {
      title: "The Physics of Light: Additive RGB",
      html: `
        <p class="lead">Computer screens emit light rather than reflecting ink. They produce color through the <strong>additive RGB color model</strong>.</p>
        <h2 class="mt-4">Three Primaries: Red, Green, Blue</h2>
        <p>In additive color theory, combining all three primaries at full intensity produces <strong>pure white light</strong>. Turning all three off produces <strong>pure black</strong>.</p>
        <ul>
          <li><strong>Red + Green =</strong> Yellow</li>
          <li><strong>Green + Blue =</strong> Cyan</li>
          <li><strong>Red + Blue =</strong> Magenta</li>
        </ul>
        <div class="callout mt-3">
          <h2 class="h6 fw-bold mb-1">Additive (RGB) vs. Subtractive (CMYK)</h2>
          <p class="mb-0">Screens emit light (RGB: starts black, adding light makes white). Printers absorb light using pigments (CMYK: starts white paper, adding ink subtracts light to make black).</p>
        </div>`,
    },
    {
      eyebrow: "Interactive Color Lab",
      title: "RGB Subpixel Mixer & Visualizer",
      html: `
        <p>Slide the Red, Green, and Blue channels between 0 and 255. Observe both the blended color and the simulated microscopic subpixels glowing beneath the screen surface.</p>`,
      widget: "rgb",
    },
    {
      eyebrow: "Interactive Calculator",
      title: "Bit Depth & The Raw File Size Formula",
      html: `
        <p class="lead">Every digital pixel requires memory to store its colour information. <strong>Bit depth</strong> specifies how many binary bits are allocated to each individual pixel.</p>
        <ul>
          <li><strong>1-bit:</strong> 2 colours ($2^1$) — pure black & white monochrome.</li>
          <li><strong>8-bit:</strong> 256 colours ($2^8$) — indexed palettes or grayscale.</li>
          <li><strong>24-bit True Color:</strong> 16,777,216 colours ($2^{24}$) — 8 bits each for R, G, and B.</li>
        </ul>
        <div class="callout my-3">
          <h2 class="h6 fw-bold mb-1">The Raw Size Formula</h2>
          <p class="mb-0"><code>Raw Size (Bytes) = Width × Height × (Bit Depth ÷ 8)</code></p>
        </div>
        <p>Test the calculator below to see how resolution and bit depth dictate uncompressed memory size:</p>`,
      widget: "bit-depth",
    },
    {
      type: "question",
      format: "multiple-choice",
      q: "In the additive RGB color model, what color is created when Red and Green light combine at full intensity?",
      a: ["Cyan", "Magenta", "Yellow", "Brown"],
      c: 2,
      why: "In additive light, Red + Green produces bright Yellow light."
    },
    {
      type: "question",
      format: "true-false",
      q: "True or False: A 24-bit True Color image can represent approximately 16.7 million distinct colors.",
      c: 0,
      why: "True! 2 to the 24th power (2^24) equals exactly 16,777,216 distinct possible colors."
    },
    {
      type: "question",
      format: "fill-blank",
      q: "What is the maximum integer value for an 8-bit color channel (from 0 to ...)?",
      c: ["255"],
      why: "An 8-bit channel stores 256 unique numbers, ranging from 0 (off) to 255 (maximum brightness)."
    }
  ]
};
