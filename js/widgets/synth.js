/* =========================================================
   Web Audio synth keyboard
   ========================================================= */
(function synth() {
  const NOTES = [["C", 261.63, "a"], ["D", 293.66, "s"], ["E", 329.63, "d"], ["F", 349.23, "f"],
                 ["G", 392.0, "g"], ["A", 440.0, "h"], ["B", 493.88, "j"], ["C", 523.25, "k"]];
  const keysEl = document.getElementById("keys");
  let ctx;

  keysEl.innerHTML = NOTES.map(([name, , key], i) =>
    `<button class="key" type="button" data-i="${i}" aria-label="Play ${name}">${name}<br><span class="fw-semibold">${key.toUpperCase()}</span></button>`).join("");

  function play(i) {
    ctx ??= new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator(), gain = ctx.createGain(), t = ctx.currentTime;
    osc.type = document.getElementById("wave").value;
    osc.frequency.value = NOTES[i][1];
    gain.gain.setValueAtTime(0.0001, t);                     // simple attack/release envelope
    gain.gain.exponentialRampToValueAtTime(0.25, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t); osc.stop(t + 0.65);

    const btn = keysEl.children[i];
    btn.classList.add("playing");
    setTimeout(() => btn.classList.remove("playing"), 180);
  }
  keysEl.addEventListener("click", e => { const b = e.target.closest(".key"); if (b) play(+b.dataset.i); });
  document.addEventListener("keydown", e => {
    if (e.repeat || /input|select|textarea/i.test(e.target.tagName)) return;
    const i = NOTES.findIndex(n => n[2] === e.key.toLowerCase());
    if (i >= 0) play(i);
  });
})();
