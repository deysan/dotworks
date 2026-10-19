import { icon, content } from './view.js';
import { createCountdown, FOCUS_SECONDS, formatTime } from './timer.js';
import { createCompletionSound } from './sound.js';

function init(root) {
  const clock = root.querySelector('#clock');
  const status = root.querySelector('#timer-status');
  const startButton = root.querySelector('#start');
  const resetButton = root.querySelector('#reset');
  const modes = [...root.querySelectorAll('[data-minutes]')];
  const timer = createCountdown();
  const sound = createCompletionSound();
  let interval = null;

  function render(state = timer.read()) {
    const seconds = Math.max(0, Math.ceil(state.remaining));
    const label = formatTime(state.remaining);
    clock.textContent = label;
    clock.setAttribute('aria-label', `Time remaining: ${Math.floor(seconds / 60)} min ${seconds % 60} sec`);
    document.title = state.running ? `${label} · Dotworks` : 'Dotworks';
  }

  function stopTicking() {
    clearInterval(interval);
    interval = null;
  }

  function tick() {
    if (interval === null) return;
    const state = timer.read();
    if (state.remaining === 0) {
      stopTicking();
      startButton.textContent = 'Start again';
      status.textContent = 'All done! Time for a change of pace.';
      sound.play();
    }
    render(state);
  }

  function reset(duration) {
    stopTicking();
    timer.reset(duration);
    startButton.textContent = 'Start';
    status.textContent = 'One task. One small step.';
    render();
  }

  startButton.addEventListener('click', () => {
    if (timer.read().running) {
      timer.pause();
      stopTicking();
      startButton.textContent = 'Resume';
      status.textContent = 'Paused. Pick up when you are ready.';
      render();
      return;
    }
    sound.enable();
    timer.start();
    stopTicking();
    interval = setInterval(tick, 250);
    startButton.textContent = 'Pause';
    status.textContent = timer.read().duration === FOCUS_SECONDS
      ? 'Focus on one thing at a time.'
      : 'Take a moment to recharge.';
    render();
  });

  resetButton.addEventListener('click', () => reset());
  for (const mode of modes) {
    mode.addEventListener('click', () => {
      for (const button of modes) {
        button.setAttribute('aria-pressed', String(button === mode));
      }
      reset(Number(mode.dataset.minutes) * 60);
    });
  }
  document.addEventListener('visibilitychange', tick);
}

export const pomodoro = {
  id: 'timer',
  className: 'pomodoro',
  label: 'Pomodoro',
  title: 'Time to focus',
  stamp: '01 / POMODORO',
  icon,
  content,
  init,
};
