<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	let displayName = '';
	let name = '';
	let scriptType = 'item';
	// Define your code snippets
	const codeSnippets = {
		customItem: (name: string, displayName: string) => `// Custom Item Code
    const item = {
      displayName: "${displayName}",
	  name: "${name}",
      // ... other properties
    };`,
		customBlock: (name: string, displayName: string) => `// Custom Block Code
    const block = {
      displayName: "${displayName}",
	  name: "${name}",
      // ... other properties
    };`
		// ... add more snippets as needed
	};

	// Function to generate code based on user input
	function generateCode() {
		let output = '';
		if (scriptType === 'item') {
			output = codeSnippets.customItem(displayName, name);
		} else if (scriptType === 'block') {
			output = codeSnippets.customBlock(displayName, name);
		}
		// ... handle other script types
		return output;
	}

	// Function to handle form submission
	function handleSubmit(event: Event) {
		event.preventDefault();
		const code = generateCode();
		// Update the output area with the generated code
		data.output = code;
	}
</script>

<title>KubeJS Gen</title>
<div class="main">
	<h1>Use this simple website to generate basic KubeJS scripts</h1>
	<h3>Fill out the following fields depending on what you want!</h3>
	<h4>
		Please refer to the full <a href="https://kubejs.com/wiki/">wiki</a> for more info as some attributes
		are incomplete
	</h4>
	<h4>
		Report all issues and submit feature requests to the <a
			href="https://github.com/Bluemethyst/KubeJSGenerator">Github</a
		>
	</h4>
</div>

<div class="main">
	<select name="script-type" class="input-box" id="script-selection" bind:value={scriptType}>
		<option value="recipe">Custom Item</option>
		<option value="block">Custom Block</option>
		<option value="item">Custom Recipe</option>
	</select>

	<select name="version" class="input-box" id="version-selection">
		<option value="1.19.2">1.19.2 or Above</option>
		<option value="1.18.2">Below 1.19.2</option>
	</select>

	<input class="input-box" type="text" placeholder="Name" bind:value={name} />
	<input class="input-box" type="text" placeholder="Display Name" bind:value={displayName} />
	<input class="input-box" type="text" />
	<input class="input-box" type="text" />
	<form method="post" on:submit={handleSubmit}>
		<button class="input-box" type="submit" formaction="?/generateCode">Generate!</button>
	</form>
	<h2>Output Code</h2>
	<textarea class="output-box" id="output-code" readonly>{data.output}</textarea>
</div>
