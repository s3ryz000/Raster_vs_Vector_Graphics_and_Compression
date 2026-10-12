/* =========================================================
   Course data (shared by every page)
   5 bite-sized core lessons + 1 capstone final quiz
   ========================================================= */
const UNITS = [
  {
    title: "What is a Pixel?",
    lessons: ["Pixels vs. Paths"]
  },
  {
    title: "The World of Color",
    lessons: ["RGB & Bit Depth"]
  },
  {
    title: "Why Compress?",
    lessons: ["Redundancy & Compression"]
  },
  {
    title: "Lossless Compression",
    lessons: ["Run-Length Encoding & PNG"]
  },
  {
    title: "Lossy Compression & Audio",
    lessons: ["JPEG, WebP & Audio"]
  }
];
const TOTAL = UNITS.reduce((n, u) => n + u.lessons.length, 0); // 5

// Flat lookup by lesson id (ids start at 1): LESSON_INFO[1] → { title, unit, unitTitle }
const LESSON_INFO = [null];
UNITS.forEach((u, i) => u.lessons.forEach(title => LESSON_INFO.push({ title, unit: i + 1, unitTitle: u.title })));

// Registries filled by js/lessons/lesson-NN.js and js/widgets/*.js
const LESSONS = {};
const WIDGETS = {};

