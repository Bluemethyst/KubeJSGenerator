// place files you want to import through the `$lib` alias in this folder.

export function generateCode(inputJson: string): string {
	let data = JSON.parse(inputJson);
	console.log(data);
	let type = data['script-type']; // Access the property using the correct key name
	return type;
}
