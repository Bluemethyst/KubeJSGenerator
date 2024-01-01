window.onload = function() {
    var typeSelect = document.getElementById('type');
    var versionSelect = document.getElementById('version');
    var recipeTypeSelect = document.getElementById('recipe-type');
    var outputBox = document.getElementById('output-box');
    var registryNameInput = document.getElementById('registry-name');

    var registryNameInput = document.getElementById('registry-name');

    /* Replace Spaces with Underscores */
    registryNameInput.addEventListener('input', function() {
       this.value = this.value.replace(/ /g, '_');
    });

    var copyButton = document.getElementById('copyButton');

    /* Copy Button */
    copyButton.addEventListener('click', function() {
        var tempElement = document.createElement('textarea');
        tempElement.value = outputBox.innerText;
        document.body.appendChild(tempElement);
        tempElement.select();
        document.execCommand('copy');
        document.body.removeChild(tempElement);
     
        var toast = document.getElementById("toast");
        toast.className = "show";
        setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
     });

     /* Update the output code */
    function updateOutput() {

        var type = typeSelect.value;
        var version = versionSelect.value;
        var recipeType = recipeTypeSelect.value;

        if (type === 'recipe') {
            recipeTypeSelect.style.display = 'inline-block';
            registryNameInput.style.display = 'none';
        } else {
            recipeTypeSelect.style.display = 'none';
            registryNameInput.style.display = 'inline-block';
        }

        if (type === 'item' && version === '1.19.2+') {
            var name = registryNameInput.value
            outputBox.innerHTML = "<pre>" + `StartupEvents.registry('item', event => {\n\tevent.create('${name}')\n})`;
            recipeTypeSelect.style.display = 'none';
            console.log('item, 1.19.2+');
        } else if (type === 'block' && version === '1.19.2+') {
            var name = registryNameInput.value
            outputBox.innerHTML = "<pre>" + `StartupEvents.registry('block', event => {\n\tevent.create('${name}')\n})`;
            recipeTypeSelect.style.display = 'none';
            console.log('block, 1.19.2+');
        } else if (type === 'recipe' && version === '1.19.2+') {
            recipeTypeSelect.style.display = 'inline-block';
            outputBox.innerHTML = "<pre>" + `ServerEvents.recipes(event => {\n\tevent.${recipeType}\n})`;
            console.log(`recipe, 1.19.2+, ${recipeType}`);

        } else if (type === 'item' && version === '<1.19.2') {
            var name = registryNameInput.value
            outputBox.innerHTML = "<pre>" + `onEvent('item.registry', event => {\n\tevent.create('${name}')\n})`;
            recipeTypeSelect.style.display = 'none';
            console.log('item, <1.19.2');

        } else if (type === 'block' && version === '<1.19.2') {
            var name = registryNameInput.value
            outputBox.innerHTML = "<pre>" + `onEvent('block.registry', event => {\n\tevent.create(${name})\n})`;
            recipeTypeSelect.style.display = 'none';
            console.log('block, <1.19.2');

        } else if (type === 'recipe' && version === '<1.19.2') {
            recipeTypeSelect.style.display = 'inline-block';
            outputBox.innerHTML = "<pre>" + `onEvent('recipes', event => {\n\tevent.${recipeType}\n)`;
            console.log(`recipe, <1.19.2, ${recipeType}`);

        }
    }

    typeSelect.addEventListener('change', updateOutput);
    versionSelect.addEventListener('change', updateOutput);
    recipeTypeSelect.addEventListener('change', updateOutput);
    registryNameInput.addEventListener('input', updateOutput);

    updateOutput();
}

/* make sure the wrong things arent displaying */
document.getElementById('type').addEventListener('change', function() {
    var recipeTypeSelect = document.getElementById('recipe-type');
    if (this.value !== 'recipe') {
        recipeTypeSelect.style.display = 'none';
    } else {
        recipeTypeSelect.style.display = 'inline-block';
    }
});