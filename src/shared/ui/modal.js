const CLOSE_TIMEOUT_MS = 240;
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

export function createModal({ id, label, title, stamp, className, content }) {
  const dialog = document.createElement('dialog');
  dialog.className = 'sheet';
  dialog.id = id;
  dialog.setAttribute('aria-labelledby', `title-${id}`);
  dialog.innerHTML = `
    <div class="dialog-content">
      <div class="panel-head">
        <h2 id="title-${id}"></h2>
        <span class="stamp"></span>
        <button class="close-dialog" type="button" autofocus>×</button>
      </div>
      <div class="${className}" data-content></div>
    </div>
  `;
  dialog.querySelector('h2').textContent = title;
  dialog.querySelector('.stamp').textContent = stamp;

  const body = dialog.querySelector('[data-content]');
  body.innerHTML = content;
  const closeButton = dialog.querySelector('.close-dialog');
  closeButton.setAttribute('aria-label', `Close ${label}`);
  let backdropDown = false;
  let closeTimeout;

  function open() {
    if (dialog.open) return;
    dialog.showModal();
    // Establish initial styles before transitioning from display:none.
    dialog.getBoundingClientRect();
    dialog.classList.add('is-visible');
    document.body.classList.add('modal-open');
  }

  function finishClose() {
    clearTimeout(closeTimeout);
    dialog.close();
    dialog.classList.remove('is-visible', 'is-closing');
  }

  function close() {
    if (!dialog.open || dialog.classList.contains('is-closing')) return;
    if (window.matchMedia(REDUCED_MOTION).matches) {
      finishClose();
      return;
    }
    dialog.classList.add('is-closing');
    dialog.classList.remove('is-visible');
    // Keep a fallback for interrupted transitions and skipped events.
    closeTimeout = setTimeout(finishClose, CLOSE_TIMEOUT_MS);
  }

  closeButton.addEventListener('click', close);
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    close();
  });
  dialog.addEventListener('transitionend', (event) => {
    if (event.target === dialog && event.propertyName === 'opacity'
        && dialog.classList.contains('is-closing')) {
      finishClose();
    }
  });
  dialog.addEventListener('pointerdown', (event) => {
    backdropDown = event.target === dialog;
  });
  dialog.addEventListener('click', (event) => {
    if (backdropDown && event.target === dialog) close();
    backdropDown = false;
  });
  dialog.addEventListener('close', () => {
    if (dialog.open) return;
    clearTimeout(closeTimeout);
    dialog.classList.remove('is-visible', 'is-closing');
    if (!document.querySelector('dialog[open]')) {
      document.body.classList.remove('modal-open');
    }
  });

  return { element: dialog, content: body, open, close };
}
