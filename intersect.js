import fs from 'node:fs/promises';

const khmer = JSON.parse(await fs.readFile("khmer.json", 'utf8'));
const qwerty = JSON.parse(await fs.readFile("qwerty.json", 'utf8'));
const mappings = [];

for (const [k, v] of Object.entries(khmer)) {
	if (!(k in qwerty)) {
		continue
	}
	mappings.push([qwerty[k], v])
}

await fs.writeFile("mappings.json", JSON.stringify(Object.fromEntries(mappings), null, 2), 'utf8')