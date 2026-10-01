/* Lesson 6 · SVG in the browser */
LESSONS[6] = {
  steps: [
    {
      title: "SVG: vectors written as text",
      html: `
        <p class="lead"><strong>SVG</strong> (Scalable Vector Graphics) is the web's vector format. It is plain text, so you can write it by hand.</p>
        <pre><code>&lt;svg viewBox="0 0 100 100" width="100"&gt;
  &lt;circle cx="50" cy="50" r="40" fill="#58cc02" /&gt;
&lt;/svg&gt;</code></pre>
        <p>Those three lines draw this:</p>
        <svg width="100" height="100" viewBox="0 0 100 100" role="img" aria-label="A green circle drawn by the code above"><circle cx="50" cy="50" r="40" fill="#58cc02"/></svg>
        <div class="callout mt-3"><p class="mb-0">Because SVG is part of the page, CSS can style it and JavaScript can animate it, just like the diagram in Lesson 1.</p></div>`,
    },
    { type: "question", q: "What is an SVG file made of?", a: ["Pixels", "Text describing shapes", "Audio samples", "Compressed JPEG blocks"], c: 1,
      why: "SVG is XML text: tags like &lt;circle&gt; describe each shape." },
    { type: "question", q: "In the example, what does r=\"40\" set?", a: ["The colour", "The radius", "The rotation", "The resolution"], c: 1,
      why: "r is the circle's radius in viewBox units." },
  ],
};
