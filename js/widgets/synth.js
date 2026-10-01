/* =========================================================
   Widget: Web Audio synth keyboard (sound generated from a formula)
   ========================================================= */
(function () {
  const NOTES = [["C", 261.63, "a"], ["D", 293.66, "s"], ["E", 329.63, "d"], ["F", 349.23, "f"],
                 ["G", 392.0, "g"], ["A", 440.0, "h"], ["B", 493.88, "j"], ["C", 523.25, "k"]];
  let ctx; // one AudioContext, created on the first key press

  WIDGETS.synth = {
    markup: () => `
      <div class="d-flex align-items-center gap-2 mb-3">
        <label for="wave" class="fw-bold small">Waveform</label>
        <select id="wave" class="form-select form-select-sm w-auto">
          <option value="sine">Sine (smooth)</option>
          <option value="triangle">Triangle</option>
          <option value="square">Square (8-bit)</option>
          <option value="sawtooth">Sawtooth</option>
        </select>
      </div>
      <div class="keys" aria-label="Synth keyboard">${NOTES.map(([name, , key], i) =>
        `<button class="key" type="button" data-i="${i}" aria-label="Play ${name}">${name}<br><span class="fw-semibold">${key.toUpperCase()}</span></button>`).join("")}
      </div>`,

    init(root) {
      const keysEl = root.querySelector(".keys");
      const wave = root.querySelector("#wave");

      function play(i) {
        ctx ??= new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator(), gain = ctx.createGain(), t = ctx.currentTime;
        osc.type = wave.value;
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

      function onKey(e) {
        if (!root.isConnected) return document.removeEventListener("keydown", onKey); // step was left
        if (e.repeat || /input|select|textarea/i.test(e.target.tagName)) return;
        const i = NOTES.findIndex(n => n[2] === e.key.toLowerCase());
        if (i >= 0) play(i);
      }
      document.addEventListener("keydown", onKey);
    },
  };
})();
