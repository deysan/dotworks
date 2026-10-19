export function buildStyles({ radius, blur, offset, angle, colorA, colorB }) {
  return {
    borderRadius: `${radius}px`,
    background: `linear-gradient(${angle}deg, ${colorA}, ${colorB})`,
    boxShadow: `0 ${offset}px ${blur}px rgba(21, 52, 78, 0.25)`,
  };
}

export function formatCss(styles) {
  return [
    `border-radius: ${styles.borderRadius};`,
    `background: ${styles.background};`,
    `box-shadow: ${styles.boxShadow};`,
  ].join('\n');
}
