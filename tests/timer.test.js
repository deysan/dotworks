import test from 'node:test';
import assert from 'node:assert/strict';
import { createCountdown, formatTime } from '../src/features/pomodoro/timer.js';

function setup(duration = 1500) {
  let time = 0;
  return {
    timer: createCountdown(duration, { now: () => time }),
    advance: (milliseconds) => { time += milliseconds; },
  };
}

test('elapsed wall-clock time is counted even when no ticks run in the background', () => {
  const { timer, advance } = setup();
  timer.start();
  advance(61_250);
  assert.deepEqual(timer.read(), { duration: 1500, remaining: 1438.75, running: true });
});

test('pause and resume preserve fractional seconds and exclude paused time', () => {
  const { timer, advance } = setup();
  timer.start();
  advance(1250);
  timer.pause();
  advance(60_000);
  assert.equal(timer.read().remaining, 1498.75);
  timer.start();
  advance(500);
  assert.equal(timer.read().remaining, 1498.25);
});

test('starting a running timer does not extend its deadline', () => {
  const { timer, advance } = setup(300);
  timer.start();
  advance(5000);
  timer.start();
  assert.equal(timer.read().remaining, 295);
});

test('reset switches modes and reuses the selected duration for later resets', () => {
  const { timer, advance } = setup();
  timer.start();
  advance(10_000);
  timer.reset(300);
  assert.deepEqual(timer.read(), { duration: 300, remaining: 300, running: false });
  timer.start();
  advance(10_000);
  timer.reset();
  assert.deepEqual(timer.read(), { duration: 300, remaining: 300, running: false });
});

test('completion stops at zero and a new session restarts the selected mode', () => {
  const { timer, advance } = setup(300);
  timer.start();
  advance(301_000);
  assert.deepEqual(timer.read(), { duration: 300, remaining: 0, running: false });
  advance(50_000);
  assert.equal(timer.read().remaining, 0);
  timer.start();
  assert.deepEqual(timer.read(), { duration: 300, remaining: 300, running: true });
});

test('display rounds up partial seconds and never shows a negative time', () => {
  assert.equal(formatTime(1500), '25:00');
  assert.equal(formatTime(60.01), '01:01');
  assert.equal(formatTime(0.01), '00:01');
  assert.equal(formatTime(0), '00:00');
  assert.equal(formatTime(-1), '00:00');
});
