export function createLauncher({ id, label, icon }) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'tool';
  button.id = `tab-${id}`;
  button.dataset.panel = id;
  button.setAttribute('aria-haspopup', 'dialog');
  button.setAttribute('aria-controls', id);
  // Icons are static markup defined by each feature.
  button.innerHTML = icon;

  const caption = document.createElement('span');
  caption.textContent = label;
  button.append(caption);

  return button;
}
