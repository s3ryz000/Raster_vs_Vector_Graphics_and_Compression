/* Lesson 9 · Lossless vs lossy */
LESSONS[9] = {
  steps: [
    {
      title: "Two ways to make files smaller",
      html: `
        <p class="lead"><strong>Compression</strong> shrinks a file so it loads faster and takes less space.</p>
        <h2 class="mt-3">Lossless</h2>
        <p>Finds patterns and writes them more efficiently, like writing “10 × blue” instead of “blue blue blue…”. Decompress it and you get <strong>every original pixel back</strong>. Used by PNG.</p>
        <h2 class="mt-3">Lossy</h2>
        <p>Throws away detail your eyes are unlikely to notice. Files get <strong>much smaller</strong>, but the removed detail is gone for good. Used by JPEG.</p>
        <div class="callout mt-3"><p class="mb-0">Re-saving a JPEG again and again loses a little more each time. Keep an original!</p></div>`,
    },
    { type: "question", q: "Which compression gives back the exact original image?", a: ["Lossy", "Lossless", "Both", "Neither"], c: 1,
      why: "Lossless compression is fully reversible." },
    { type: "question", q: "JPEG uses which kind of compression?", a: ["Lossless", "Lossy", "No compression", "Vector compression"], c: 1,
      why: "JPEG discards fine detail to make photos much smaller." },
  ],
};
