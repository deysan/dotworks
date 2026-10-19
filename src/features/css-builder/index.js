import { icon, content } from './view.js';
import { buildStyles, formatCss } from './model.js';

function init(root) {
  const ids = ['radius', 'blur', 'offset', 'angle', 'color-a', 'color-b'];
  const controls = Object.fromEntries(ids.map((id) => [id, root.querySelector(`#${id}`)]));
  const sample = root.querySelector('#sample');
  const code = root.querySelector('#css-code');
  const status = root.querySelector('#copy-status');
  const copyButton = root.querySelector('#copy');

  function update() {
    const values = Object.fromEntries(ids.map((id) => [id, controls[id].value]));
    for (const id of ['radius', 'blur', 'offset', 'angle']) {
      root.querySelector(`#${id}-value`).textContent = values[id] + (id === 'angle' ? '°' : ' px');
    }
    const styles = buildStyles({
      radius: values.radius,
      blur: values.blur,
      offset: values.offset,
      angle: values.angle,
      colorA: values['color-a'],
      colorB: values['color-b'],
    });
    Object.assign(sample.style, styles);
    code.textContent = formatCss(styles);
    status.textContent = '';
  }

  for (const input of Object.values(controls)) {
    input.addEventListener('input', update);
  }
  update();

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.textContent);
      status.textContent = 'CSS copied';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(code);
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Code selected — press Ctrl+C or ⌘C.';
    }
  });
}

export const cssBuilder = {
  id: 'css',
  className: 'css-builder',
  label: 'CSS Builder',
  title: 'Shape your idea',
  stamp: '03 / CSS BUILDER',
  icon,
  content,
  init,
};
