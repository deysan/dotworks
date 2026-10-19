import { pomodoro } from './features/pomodoro/index.js';
import { notes } from './features/notes/index.js';
import { cssBuilder } from './features/css-builder/index.js';
import { createLauncher } from './shared/ui/launcher.js';
import { createModal } from './shared/ui/modal.js';

const features = [pomodoro, notes, cssBuilder];
const tools = document.querySelector('.tools');

for (const feature of features) {
  const launcher = createLauncher(feature);
  const modal = createModal(feature);

  tools.append(launcher);
  document.body.append(modal.element);
  // Mount once so closing a dialog preserves its widget's state.
  feature.init(modal.content);
  launcher.addEventListener('click', modal.open);
}
