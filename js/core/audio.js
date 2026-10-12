/* =========================================================
   Audio feedback helpers (correct, wrong, lesson-complete)
   Uses the Web Audio API to generate short procedural sounds.
   ========================================================= */
const SFX = (() => {
  let ctx;
  function getCtx() {
    ctx ??= new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }
  function tone(freq, start, dur, type = "sine", vol = 0.18) {
    const c = getCtx(), osc = c.createOscillator(), g = c.createGain();
    osc.type = type; osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(vol, start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(g).connect(c.destination);
    osc.start(start); osc.stop(start + dur + 0.01);
  }
  return {
    correct() {
      const t = getCtx().currentTime;
      tone(523.25, t, 0.12, "sine", 0.15);         // C5
      tone(659.25, t + 0.1, 0.18, "sine", 0.18);   // E5  — upward major third
    },
    wrong() {
      const t = getCtx().currentTime;
      tone(220, t, 0.25, "triangle", 0.12);          // A3 — soft low buzz
      tone(196, t + 0.12, 0.2, "triangle", 0.1);     // G3
    },
    complete() {
      const t = getCtx().currentTime;
      tone(523.25, t, 0.15, "sine", 0.14);    // C5
      tone(659.25, t + 0.12, 0.15, "sine", 0.16);    // E5
      tone(783.99, t + 0.24, 0.15, "sine", 0.18);    // G5
      tone(1046.5, t + 0.36, 0.30, "sine", 0.20);    // C6  — victory arpeggio
    },
  };
})();
