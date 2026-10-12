/* Lesson Final · Capstone Examination (15 Questions Across All 5 Units) */
LESSONS["final"] = {
  steps: [
    {
      eyebrow: "Capstone Examination",
      title: "The Master Challenge",
      html: `
        <p class="lead">Welcome to the <strong>Raster & Vector Academy Final Boss Quiz</strong>!</p>
        <p>You have traveled through pixels, paths, additive color, information entropy, run-length encoding, Huffman trees, PNG filters, and psychoacoustic audio compression.</p>
        <p>This 15-question cumulative assessment tests your mastery across all 5 units. Answer carefully—your official <strong>Certified Digital Media Specialist</strong> diploma awaits!</p>
        <div class="callout mt-3">
          <h2 class="h6 fw-bold mb-1">Pass Requirement</h2>
          <p class="mb-0">Complete all 15 questions to conquer the course and earn <strong>+100 XP</strong> and your graduate certificate badge!</p>
        </div>`
    },
    // --- Unit 1: What is a Pixel? ---
    {
      type: "question",
      format: "multiple-choice",
      q: "[Unit 1] Which type of image is defined by mathematical geometric formulas rather than a grid of colored dots?",
      a: ["Raster bitmap", "Vector graphic", "JPEG photo", "Raw frame"],
      c: 1,
      why: "Vector graphics store geometric formulas (points, curves, fills) that scale infinitely without pixelation."
    },
    {
      type: "question",
      format: "true-false",
      q: "[Unit 1] True or False: Changing an image file's print metadata from 72 PPI to 300 PPI adds more physical pixels to the digital file.",
      c: 1,
      why: "False! PPI only alters printed dot spacing on paper; it does not change the pixel dimensions of the file."
    },
    {
      type: "question",
      format: "fill-blank",
      q: "[Unit 1] What is the uncompressed raw byte size formula? Width × Height × Bit Depth ÷ [number]",
      c: ["8", "eight"],
      why: "Because 1 byte contains 8 bits, dividing total bits by 8 gives the total byte size."
    },

    // --- Unit 2: The World of Color ---
    {
      type: "question",
      format: "multiple-choice",
      q: "[Unit 2] In the additive RGB color model, what color is created by mixing full-intensity Red and full-intensity Green light?",
      a: ["Cyan", "Magenta", "Yellow", "Orange"],
      c: 2,
      why: "In additive light: Red + Green = Yellow, Green + Blue = Cyan, and Red + Blue = Magenta."
    },
    {
      type: "question",
      format: "true-false",
      q: "[Unit 2] True or False: An 8-bit indexed palette (Color Look-Up Table) can display up to 256 unique colors simultaneously.",
      c: 0,
      why: "True! 2^8 = 256 distinct palette entries in formats like GIF and PNG-8."
    },
    {
      type: "question",
      format: "fill-blank",
      q: "[Unit 2] What technique scatters colored dots to simulate continuous gradients when palette colors are limited?",
      c: ["dithering", "dither"],
      why: "Dithering creates the optical illusion of subtle tones through controlled spatial dot dispersion."
    },

    // --- Unit 3: Why Compress? ---
    {
      type: "question",
      format: "multiple-choice",
      q: "[Unit 3] What is the primary difference between lossless and lossy compression?",
      a: ["Lossless is only for vector; lossy is only for audio", "Lossless allows exact bit-for-bit reconstruction; lossy irreversibly discards data", "Lossless files are always smaller than lossy files", "Lossy compression requires specialized graphics hardware to view"],
      c: 1,
      why: "Lossless preserves 100% of the original data, whereas lossy permanently discards imperceptible details."
    },
    {
      type: "question",
      format: "true-false",
      q: "[Unit 3] True or False: Successive rounds of opening, editing, and re-saving a lossy JPEG file produce cumulative generation loss.",
      c: 0,
      why: "True! Each lossy encode pass re-quantizes data, degrading image clarity."
    },
    {
      type: "question",
      format: "fill-blank",
      q: "[Unit 3] What term describes high correlation and similarity between geographically adjacent pixels in a picture?",
      c: ["spatial redundancy", "spatial"],
      why: "Spatial redundancy occurs when adjacent pixels in an image share identical or very similar color values."
    },

    // --- Unit 4: Lossless Compression ---
    {
      type: "question",
      format: "multiple-choice",
      q: "[Unit 4] What is the RLE (Run-Length Encoded) representation of the string 'WWWWWWBBBB'?",
      a: ["10WB", "6W4B", "W6B4", "WW6BB4"],
      c: 1,
      why: "Six 'W's followed by four 'B's compresses to 6W4B."
    },
    {
      type: "question",
      format: "true-false",
      q: "[Unit 4] True or False: In Huffman Coding, frequent symbols receive longer binary codes than rare symbols.",
      c: 1,
      why: "False! Huffman coding assigns the shortest binary bit sequences to the most frequent symbols to minimize file size."
    },
    {
      type: "question",
      format: "fill-blank",
      q: "[Unit 4] What is the open lossless compression algorithm combining LZ77 and Huffman coding used in PNG and Gzip?",
      c: ["deflate"],
      why: "The DEFLATE algorithm powers both PNG and Gzip lossless compression."
    },

    // --- Unit 5: Lossy Compression & Audio ---
    {
      type: "question",
      format: "multiple-choice",
      q: "[Unit 5] Why does 4:2:0 chroma subsampling discard 75% of color samples without severely degrading perceived quality?",
      a: ["Screens cannot display color in high definition", "The human retina has far more luminance-sensing rods than color-sensing cones", "Computer processors only understand grayscale", "It only applies to dark pixels"],
      c: 1,
      why: "The human eye has ~120 million rods for brightness/detail and only ~6 million cones for color, so color can be downsampled heavily."
    },
    {
      type: "question",
      format: "true-false",
      q: "[Unit 5] True or False: In JPEG compression, irreversible data loss occurs during the Discrete Cosine Transform (DCT) calculation rather than quantization.",
      c: 1,
      why: "False! The DCT is mathematically reversible; permanent data loss occurs during the Quantization step."
    },
    {
      type: "question",
      format: "fill-blank",
      q: "[Unit 5] What modern open-source image format derived from the AV1 video codec offers up to 50% better compression than JPEG?",
      c: ["avif"],
      why: "AVIF (AV1 Image File Format) is the next-generation image format derived from the AV1 video codec."
    }
  ]
};
