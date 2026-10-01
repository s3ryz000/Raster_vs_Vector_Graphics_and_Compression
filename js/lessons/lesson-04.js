/* Lesson 4 · Paths & points */
LESSONS[4] = {
  steps: [
    {
      title: "Vectors are built from paths",
      html: `
        <p class="lead">A vector shape is a <strong>path</strong>: a list of <strong>anchor points</strong> joined by straight lines or curves.</p>
        <figure class="text-center">
          <svg class="lesson-figure" viewBox="0 0 300 160" role="img" aria-label="A curved path with two anchor points and the handles that bend the curve">
            <path d="M30 130 C 90 10, 210 10, 270 130" fill="none" stroke="#58cc02" stroke-width="5"/>
            <line x1="30" y1="130" x2="90" y2="10" stroke="#1cb0f6" stroke-width="2" stroke-dasharray="5 4"/>
            <line x1="270" y1="130" x2="210" y2="10" stroke="#1cb0f6" stroke-width="2" stroke-dasharray="5 4"/>
            <circle cx="90" cy="10" r="6" fill="#1cb0f6"/><circle cx="210" cy="10" r="6" fill="#1cb0f6"/>
            <rect x="22" y="122" width="16" height="16" fill="#fff" stroke="#3c3c3c" stroke-width="3"/>
            <rect x="262" y="122" width="16" height="16" fill="#fff" stroke="#3c3c3c" stroke-width="3"/>
          </svg>
          <figcaption>Squares are anchor points. The blue dots are <strong>handles</strong> that bend the curve between them (a Bézier curve).</figcaption>
        </figure>
        <p>Paths can then be <strong>stroked</strong> (outlined) and <strong>filled</strong> with colour. Because only the points are stored, the file stays tiny.</p>`,
    },
    { type: "question", q: "What do a curve's handles control?", a: ["Its colour", "How it bends", "Its file format", "Its resolution"], c: 1,
      why: "Handles pull the curve towards them, setting its shape." },
    { type: "question", q: "A vector circle is stored as…", a: ["Thousands of pixels", "A centre point and a radius", "A photo", "Sound samples"], c: 1,
      why: "Only the maths is stored; the circle is drawn fresh each time." },
  ],
};
