import mappings from './mappings.json';

const text = document.getElementById("text");
const result = document.getElementById("result");

const map2km = new Map(Object.entries(mappings));
const map2latin = new Map(Object.entries(mappings).map(([k, v]) => [v, k]));

text.addEventListener('input', () => {
  const chunks = [];
  for (const c of text.value) {
    if (map2km.has(c)) {
      chunks.push(map2km.get(c));
      continue;
    }
    chunks.push(c);
  }
  result.value = chunks.join("");
})

result.addEventListener('input', () => {
  const chunks = [];
  for (const c of result.value) {
    const code = c.charCodeAt(0);
    if (code >= 0x1780 && code <= 0x17ff) {
      if (map2latin.has(c)) {
        chunks.push(map2latin.get(c));
        continue;
      }  
    }
    chunks.push(c);
  }
  text.value = chunks.join("");
});