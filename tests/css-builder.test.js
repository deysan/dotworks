import test from 'node:test';
import assert from 'node:assert/strict';
import { buildStyles, formatCss } from '../src/features/css-builder/model.js';

const defaults = {
  radius: 24,
  blur: 24,
  offset: 12,
  angle: 135,
  colorA: '#ffdc89',
  colorB: '#f28c62',
};

test('default exported CSS preserves the existing preview appearance', () => {
  assert.equal(formatCss(buildStyles(defaults)), [
    'border-radius: 24px;',
    'background: linear-gradient(135deg, #ffdc89, #f28c62);',
    'box-shadow: 0 12px 24px rgba(21, 52, 78, 0.25);',
  ].join('\n'));
});

test('zero values from range controls produce valid declarations', () => {
  const styles = buildStyles({ ...defaults, radius: '0', blur: '0', offset: '0', angle: '0' });
  assert.deepEqual(styles, {
    borderRadius: '0px',
    background: 'linear-gradient(0deg, #ffdc89, #f28c62)',
    boxShadow: '0 0px 0px rgba(21, 52, 78, 0.25)',
  });
});

test('every control is reflected in both the preview styles and exported CSS', () => {
  const styles = buildStyles({
    radius: '58', blur: '60', offset: '25', angle: '360',
    colorA: '#102030', colorB: '#aabbcc',
  });
  assert.equal(styles.borderRadius, '58px');
  assert.equal(styles.background, 'linear-gradient(360deg, #102030, #aabbcc)');
  assert.equal(styles.boxShadow, '0 25px 60px rgba(21, 52, 78, 0.25)');
  assert.match(formatCss(styles), /background: linear-gradient\(360deg, #102030, #aabbcc\);/);
});
