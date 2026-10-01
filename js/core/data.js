/* =========================================================
   Course data (shared by every page)
   ========================================================= */
const UNITS = [
  { title: "Raster Graphics", lessons: ["What is a pixel?", "Resolution & zooming", "Raster formats"] },
  { title: "Vector Graphics", lessons: ["Paths & points", "Scaling without loss", "SVG in the browser"] },
  { title: "Raster vs Vector", lessons: ["Choosing the right type", "Converting between them"] },
  { title: "Compression", lessons: ["Lossless vs lossy", "PNG, JPEG & WebP", "JPEG quality"] },
];
const TOTAL = UNITS.reduce((n, u) => n + u.lessons.length, 0);

// Flat lookup by lesson id (ids start at 1): LESSON_INFO[3] → { title, unit, unitTitle }
const LESSON_INFO = [null];
UNITS.forEach((u, i) => u.lessons.forEach(title => LESSON_INFO.push({ title, unit: i + 1, unitTitle: u.title })));

// Registries filled by js/lessons/lesson-NN.js and js/widgets/*.js
const LESSONS = {};
const WIDGETS = {};
