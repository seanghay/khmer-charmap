import { parseString } from 'xml2js'
import fs from 'node:fs/promises'

const t = await fs.readFile("./khmer.keylayout", 'utf-8')
parseString(t, (err, result) => {
	if (err) return;

	const keyMap = result.keyboard.keyMapSet[0].keyMap;

	let actionsMap = {};

	if (result.keyboard.actions) {
		actionsMap = Object.fromEntries(
			result.keyboard.actions[0].action.map(it => [it['$']['id'], it['when'][0]['$']['output']]).filter(it => it[1])
		)	
	}

	const entries = [];
	for (const entry of keyMap) {
		const id = entry['$']['index'];
		const key = entry.key.map((k) => [k['$']['code'], k['$']['output'] || actionsMap[k['$']['action']]]);
		for (const [k, v] of key) {
			entries.push([`${id}.${k}`, v])
		}
	}

	const keymappings = Object.fromEntries(entries);
	fs.writeFile("khmer.json", JSON.stringify(keymappings, null, 2), 'utf8');
});