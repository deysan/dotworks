export const FOCUS_SECONDS = 25 * 60;

export function formatTime(remaining) {
  const seconds = Math.max(0, Math.ceil(remaining));
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
}

export function createCountdown(initialDuration = FOCUS_SECONDS, { now = Date.now } = {}) {
  let duration = initialDuration;
  let remaining = duration;
  let deadline = null;
  let running = false;

  function read() {
    if (running) {
      // Recalculate from a deadline so background throttling cannot cause drift.
      remaining = Math.max(0, (deadline - now()) / 1000);
      if (remaining === 0) running = false;
    }
    return { duration, remaining, running };
  }

  function start() {
    if (running) return;
    if (remaining <= 0) remaining = duration;
    deadline = now() + remaining * 1000;
    running = true;
  }

  function pause() {
    read();
    running = false;
  }

  function reset(nextDuration = duration) {
    duration = nextDuration;
    remaining = duration;
    deadline = null;
    running = false;
  }

  return { read, start, pause, reset };
}
