export function createCompletionSound() {
  let context;

  function enable() {
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return;
      context ??= new Audio();
      context.resume().catch(() => {});
    } catch {
      // The visual completion message also works when browser audio is unavailable.
    }
  }

  function play() {
    if (!context) return;
    try {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.frequency.value = 660;
      gain.gain.setValueAtTime(0.12, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.8);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.8);
    } catch {
      // Keep the timer usable if the audio context has been suspended or closed.
    }
  }

  return { enable, play };
}
