/* =========================================================
   Roadmap: draws the unit banners and zig-zag lesson nodes.
   Used by the path page and the welcome-popup preview.
   ========================================================= */
const ICON_LOCK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 10V7a5 5 0 0 1 10 0v3h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h1Zm2 0h6V7a3 3 0 0 0-6 0v3Z"/></svg>';
const ICON_CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m9.5 16.2-4-4L4 13.7l5.5 5.5L20 8.7l-1.5-1.5z"/></svg>';
const ICON_TROPHY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 3h10v2h3v3a4 4 0 0 1-4 4h-.3A5 5 0 0 1 13 14.9V18h3v3H8v-3h3v-3.1A5 5 0 0 1 8.3 12H8a4 4 0 0 1-4-4V5h3V3Zm10 4v3a2 2 0 0 0 1-2V7h-1ZM6 7v1a2 2 0 0 0 1 2V7H6Z"/></svg>';

function lessonStatus(id) {
  return id <= state.done ? "done" : id === state.done + 1 ? "active" : "locked";
}

function renderPath(root) {
  let html = "", id = 0;
  UNITS.forEach((unit, u) => {
    html += `<section class="mb-2" aria-labelledby="${root.id}-unit-${u}">
      <div class="unit-banner unit-${u + 1}">
        <p class="unit-label mb-0">Unit ${u + 1}</p><h2 id="${root.id}-unit-${u}">${unit.title}</h2>
      </div><ol class="path">`;
    unit.lessons.forEach(title => {
      id++;
      const status = lessonStatus(id);
      const inner = status === "done" ? ICON_CHECK : status === "locked" ? ICON_LOCK : id;
      html += `<li class="zig-${(id - 1) % 8}">
        ${status === "active" ? '<span class="start-bubble badge">Start</span>' : ""}
        <button class="node is-${status}" type="button" data-id="${id}" data-status="${status}"
          aria-label="Lesson ${id}: ${title} (${status})">${inner}</button>
        <p class="node-label">${id} · ${title}</p></li>`;
    });
    html += `</ol></section>`;
  });
  // Final quiz node: opens once every lesson is done
  const finalStatus = state.done >= TOTAL ? "active" : "locked";
  html += `<ol class="path"><li><button class="node is-${finalStatus}" type="button" data-id="final" data-status="${finalStatus}"
    aria-label="Final quiz (${finalStatus})">${ICON_TROPHY}</button><p class="node-label">Final quiz</p></li></ol>`;
  root.innerHTML = html;
}
