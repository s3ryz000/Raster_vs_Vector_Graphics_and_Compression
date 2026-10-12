/* Lesson 4 · Run-Length Encoding & PNG (Unit 4: Lossless Compression) */
LESSONS[4] = {
  steps: [
    {
      title: "Run-Length Encoding: The Simplest Compression",
      html: `
        <p class="lead"><strong>Run-Length Encoding (RLE)</strong> is an elegant lossless algorithm that replaces consecutive identical symbols with a run length and symbol value.</p>
        <h2 class="mt-4">How RLE Works</h2>
        <p>Consider a horizontal scanline in a black-and-white fax transmission or flat icon:</p>
        <pre class="p-3 bg-light border rounded font-monospace small"><code>Uncompressed: WWWWWWWWWWWWBBBBWWWW (20 characters)
RLE Encoded:  12W4B4W               (6 characters)</code></pre>
        <p>The uncompressed stream takes 20 bytes, while the RLE stream takes only 6 bytes—a <strong>70% file size reduction</strong> with zero lost information!</p>
        <div class="callout mt-3">
          <h2 class="h6 fw-bold mb-1">Negative Compression (Data Expansion)</h2>
          <p class="mb-0">When data has no consecutive runs (like <code>ABCDEFGH</code>), RLE turns it into <code>1A1B1C1D1E1F1G1H</code> (16 bytes, 100% larger!). RLE only excels when data has long runs of identical values.</p>
        </div>`,
    },
    {
      eyebrow: "Interactive Laboratory",
      title: "RLE Interactive Compressor",
      html: `
        <p>Type repetitive strings into the input field below to observe the encoded stream and real-time compression ratio. Test the presets to see ideal runs vs. negative expansion:</p>`,
      widget: "rle",
    },
    {
      title: "Inside the PNG Format: Filters & DEFLATE",
      html: `
        <p class="lead">Developed as an open, patent-free format, <strong>Portable Network Graphics (PNG)</strong> is the standard for lossless web graphics.</p>
        <h2 class="mt-4">The Two-Stage Compression Pipeline</h2>
        <ol>
          <li><strong>Delta Filtering:</strong> Replaces absolute pixel color values with differences relative to neighboring pixels above and to the left.</li>
          <li><strong>DEFLATE Engine:</strong> Compresses the filtered bytes using LZ77 sliding-window dictionary matching and Huffman coding.</li>
        </ol>
        <div class="callout mt-3">
          <h2 class="h6 fw-bold mb-1">True 8-Bit Alpha Transparency</h2>
          <p class="mb-0">Unlike GIF's harsh 1-bit transparency (a pixel was either 100% solid or 100% invisible), PNG supports 256 levels of smooth translucency for anti-aliased shadows and edges.</p>
        </div>`,
    },
    {
      type: "question",
      format: "multiple-choice",
      q: "How would the sequence 'AAAAABBB' be encoded using basic Run-Length Encoding (RLE)?",
      a: ["8AB", "5A3B", "A5B3", "AB53"],
      c: 1,
      why: "RLE records the run length followed by the character: 5 'A's and 3 'B's = 5A3B."
    },
    {
      type: "question",
      format: "true-false",
      q: "True or False: Run-Length Encoding is guaranteed to make every digital file smaller regardless of content.",
      c: 1,
      why: "False! When applied to data with no repeated runs, RLE adds counter overhead and makes the file larger."
    },
    {
      type: "question",
      format: "fill-blank",
      q: "Which compression algorithm combining LZ77 and Huffman coding powers PNG?",
      c: ["deflate"],
      why: "The DEFLATE algorithm powers PNG (as well as ZIP and Gzip) lossless compression."
    }
  ]
};
