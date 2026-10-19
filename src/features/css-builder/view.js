export const icon = `
<svg viewBox="0 0 40 40" aria-hidden="true">
  <path d="M6 10h28M6 20h28M6 30h28"></path>
  <circle cx="14" cy="10" r="3" fill="#fffdf6"></circle>
  <circle cx="27" cy="20" r="3" fill="#fffdf6"></circle>
  <circle cx="17" cy="30" r="3" fill="#fffdf6"></circle>
</svg>
`;

export const content = `
<div class="builder">
  <div class="controls">
    <div class="control">
      <label for="radius">
        Corner radius
        <output id="radius-value">24 px</output>
      </label>
      <input id="radius" type="range" min="0" max="58" value="24">
    </div>
    <div class="control">
      <label for="blur">
        Shadow blur
        <output id="blur-value">24 px</output>
      </label>
      <input id="blur" type="range" min="0" max="60" value="24">
    </div>
    <div class="control">
      <label for="offset">
        Shadow offset
        <output id="offset-value">12 px</output>
      </label>
      <input id="offset" type="range" min="0" max="25" value="12">
    </div>
    <div class="control">
      <label for="angle">
        Gradient angle
        <output id="angle-value">135°</output>
      </label>
      <input id="angle" type="range" min="0" max="360" value="135">
    </div>
    <div class="colors">
      <label for="color-a">
        Color 1
        <input type="color" id="color-a" value="#ffdc89">
      </label>
      <label for="color-b">
        Color 2
        <input type="color" id="color-b" value="#f28c62">
      </label>
    </div>
  </div>
  <div class="preview">
    <div class="sample" id="sample">Your idea</div>
  </div>
</div>
<div class="code-wrap">
  <pre id="css-code"></pre>
  <button class="copy" id="copy">Copy</button>
</div>
<p class="copy-status" id="copy-status" role="status"></p>
`;
