/* =========================================================
   Course data
   ========================================================= */
const UNITS = [
  { title: "Raster Graphics", lessons: ["What is a pixel?", "Resolution & zooming", "Raster formats"] },
  { title: "Vector Graphics", lessons: ["Paths & points", "Scaling without loss", "SVG in the browser"] },
  { title: "Raster vs Vector", lessons: ["Choosing the right type", "Converting between them"] },
  { title: "Compression", lessons: ["Lossless vs lossy", "PNG, JPEG & WebP", "JPEG quality"] },
];
const TOTAL = UNITS.reduce((n, u) => n + u.lessons.length, 0);
