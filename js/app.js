window.onload = function() {
    var outputBox = document.getElementById('output-box');
    var outputDiv = document.getElementById('output-div');

    var typeSelect = document.getElementById('type');
    var versionSelect = document.getElementById('version');
    var recipeTypeSelect = document.getElementById('recipe-type');
    var registryNameInput = document.getElementById('registry-name');
    var descriptionBox = document.getElementById('description');

    var outputWrapper = document.getElementById('output-wrapper-top');

    /* atributes */ 
    var displayNameInput = document.getElementById('display-name');
    var blockSoundInput = document.getElementById('block-sound');

    /* Replace Spaces with Underscores */
    registryNameInput.addEventListener('input', function() {
       this.value = this.value.replace(/ /g, '_');
    });

    var copyButton = document.getElementById('copyButton');

    /* Copy Button */
    copyButton.addEventListener('click', function() {
        var tempElement = document.createElement('textarea');
        tempElement.value = outputDiv.innerText;
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

        var displayName = displayNameInput.value;
        var blockSound = blockSoundInput.value;


        if (type === 'recipe') {
            recipeTypeSelect.style.display = 'inline-block';
            registryNameInput.style.display = 'none';
            descriptionBox.innerText = 'Put into your server_scripts folder.'
        } else {
            recipeTypeSelect.style.display = 'none';
            registryNameInput.style.display = 'inline-block';
            descriptionBox.innerText = 'Put into your startup_scripts folder. For block/item textures/models/sounds please refer to the wiki'
        }

        if (type === 'block') {
            blockSoundInput.style.display = 'inline-block';
        } else {
            blockSoundInput.style.display = 'none';
        }

        if (type === 'item' && version === '1.19.2+') {
            var name = registryNameInput.value
            outputWrapper.innerHTML = "<pre>" + `StartupEvents.registry('item', event => {`
            outputBox.innerHTML = "<pre>" + `\tevent.create('${name}')`;
            recipeTypeSelect.style.display = 'none';
            displayNameInput.style.display = 'inline-block';
            console.log('item, 1.19.2+');
        } else if (type === 'block' && version === '1.19.2+') {
            var name = registryNameInput.value
            outputWrapper.innerHTML = "<pre>" + `StartupEvents.registry('block', event => {`
            outputBox.innerHTML = "<pre>" + `\tevent.create('${name}')`;
            recipeTypeSelect.style.display = 'none';
            displayNameInput.style.display = 'inline-block';
            console.log('block, 1.19.2+');
        } else if (type === 'recipe' && version === '1.19.2+') {
            recipeTypeSelect.style.display = 'inline-block';
            displayNameInput.style.display = 'none';
            outputWrapper.innerHTML = "<pre>" + `StartupEvents.recipes(event => {`
            outputBox.innerHTML = "<pre>" + `\tevent.${recipeType}()`;
            console.log(`recipe, 1.19.2+, ${recipeType}`);

        } else if (type === 'item' && version === '<1.19.2') {
            var name = registryNameInput.value
            outputWrapper.innerHTML = "<pre>" + `onEvent('item.registry', event => {`
            outputBox.innerHTML = "<pre>" + `\tevent.create('${name}')`;
            recipeTypeSelect.style.display = 'none';
            displayNameInput.style.display = 'inline-block';
            console.log('item, <1.19.2');
        } else if (type === 'block' && version === '<1.19.2') {
            var name = registryNameInput.value
            outputWrapper.innerHTML = "<pre>" + `onEvent('block.registry', event => {`
            outputBox.innerHTML = "<pre>" + `\tevent.create('${name}')`;
            recipeTypeSelect.style.display = 'none';
            displayNameInput.style.display = 'inline-block';
            console.log('block, <1.19.2');
        } else if (type === 'recipe' && version === '<1.19.2') {
            recipeTypeSelect.style.display = 'inline-block';
            displayNameInput.style.display = 'none';
            outputWrapper.innerHTML = "<pre>" + `onEvent('recipes', event => {`
            outputBox.innerHTML = "<pre>" + `\tevent.${recipeType}`;
            console.log(`recipe, <1.19.2, ${recipeType}`);
        } 

        if (displayName != '') {
            outputBox.innerHTML += `\t.displayName('${displayName}')`;
           }

        if (blockSound !== 'default' && blockSound != '') {
            outputBox.innerHTML += `\n\t.blockSound('${blockSound}')`;
        }
    }



    typeSelect.addEventListener('change', updateOutput);
    versionSelect.addEventListener('change', updateOutput);
    recipeTypeSelect.addEventListener('change', updateOutput);
    registryNameInput.addEventListener('input', updateOutput);
    displayNameInput.addEventListener('input', updateOutput);
    blockSoundInput.addEventListener('input', updateOutput)

    updateOutput();
}


