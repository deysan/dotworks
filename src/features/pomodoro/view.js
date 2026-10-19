export const icon = `
<svg viewBox="0 0 40 40" aria-hidden="true">
  <circle cx="20" cy="23" r="13"></circle>
  <path d="M20 10V5m-5 0h10m5 7 3-3M20 16v8l5 3"></path>
</svg>
`;

export const content = `
<div class="modes" aria-label="Timer mode">
  <button class="mode" data-minutes="25" aria-pressed="true">Focus · 25 min</button>
  <button class="mode" data-minutes="5" aria-pressed="false">Short break · 5 min</button>
  <button class="mode" data-minutes="15" aria-pressed="false">Long break · 15 min</button>
</div>
<div class="clock" id="clock" role="timer">25:00</div>
<p class="timer-status" id="timer-status" aria-live="polite">One task. One small step.</p>
<div class="actions">
  <button class="primary" id="start">Start</button>
  <button class="secondary" id="reset">Reset</button>
</div>
`;
