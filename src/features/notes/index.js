import { icon, content } from './view.js';

// Preserve the existing key so the refactor does not discard saved drafts.
const STORAGE_KEY = 'blueprint-workshop-note-v1';
const SAVE_DELAY_MS = 300;

function init(root) {
  const note = root.querySelector('#note');
  const status = root.querySelector('#save-status');
  const counter = root.querySelector('#char-count');
  const clearButton = root.querySelector('#clear-note');
  let saveTimeout;

  function countCharacters() {
    const count = Array.from(note.value).length;
    counter.textContent = `${count} character${count === 1 ? '' : 's'}`;
  }

  function save() {
    clearTimeout(saveTimeout);
    try {
      localStorage.setItem(STORAGE_KEY, note.value);
      status.textContent = 'Saved in this browser';
    } catch {
      status.textContent = 'Unable to save. Copy your text before closing.';
    }
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      note.value = stored;
      status.textContent = 'Saved draft restored';
    }
  } catch {
    status.textContent = 'Storage is unavailable in this browser';
  }
  countCharacters();

  note.addEventListener('input', () => {
    countCharacters();
    status.textContent = 'Saving…';
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(save, SAVE_DELAY_MS);
  });
  window.addEventListener('pagehide', save);

  clearButton.addEventListener('click', () => {
    if (!note.value || !window.confirm('Clear the entire note?')) return;
    note.value = '';
    countCharacters();
    save();
    note.focus();
  });
}

export const notes = {
  id: 'notes',
  className: 'notes',
  label: 'Notes',
  title: 'Capture a thought',
  stamp: '02 / NOTES',
  icon,
  content,
  init,
};
