import mappings from './mappings.json';
import { limon, abc } from './limon.js';

const text = document.getElementById("text");
const result = document.getElementById("result");
const $type = document.getElementById('type');

const map2km = new Map(Object.entries(mappings));
const map2latin = new Map(Object.entries(mappings).map(([k, v]) => [v, k]));

const isUseLimonChecked = () => $type.checked

$type.addEventListener('change', () => {
  invalidateInput();
  text.placeholder = isUseLimonChecked() ? "Limon" : "ASCII"
})

function km2latin(input) {
  const chunks = [];
  for (const c of input) {
    const code = c.charCodeAt(0);
    if (code >= 0x1780 && code <= 0x17ff) {
      if (map2latin.has(c)) {
        chunks.push(map2latin.get(c));
        continue;
      }
    }
    chunks.push(c);
  }

  return chunks.join("");
}

function latin2km(input) {
  const chunks = [];
  for (const c of input) {
    if (map2km.has(c)) {
      chunks.push(map2km.get(c));
      continue;
    }
    chunks.push(c);
  }
  return chunks.join("")
}

function invalidateInput() {
  if (isUseLimonChecked()) {
    result.value = limon(text.value);
    return;
  }
  result.value = latin2km(text.value);
}

text.addEventListener('input', () => {
  invalidateInput();
})

result.addEventListener('input', () => {
  text.value = km2latin(result.value);
});