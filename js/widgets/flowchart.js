/* =========================================================
   SVG flowchart interaction
   ========================================================= */
const flowInfo = document.getElementById("flowInfo");
document.querySelectorAll(".flow .fnode").forEach(node => {
  const show = () => {
    document.querySelectorAll(".flow .fnode").forEach(x => x.classList.remove("is-selected"));
    node.classList.add("is-selected");
    flowInfo.textContent = node.dataset.info;
  };
  node.addEventListener("mouseenter", show);
  node.addEventListener("focus", show);
  node.addEventListener("click", show);
});
