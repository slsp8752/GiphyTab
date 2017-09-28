// Saves options to chrome.storage

//TODO
//attribution toggle
//custom backgrounds?
//custom greetings
var taggle;
var bg;

function save_options() {
	var tagArray = taggle.getTagValues();
	if(tagArray.length > 0){
		chrome.storage.sync.set({
			tagArray: tagArray
		}, function() {
			// Update status to let user know options were saved.
			var status = document.getElementById('status');
			status.textContent = 'Options saved.';
			setTimeout(function() {
				status.textContent = '';
			}, 750);
		});
	}
	else{
		var status = document.getElementById('status');
		status.textContent = 'Error: Must have at least one tag.';
			setTimeout(function() {
				status.textContent = '';
			}, 750);
	}

}

function restore_options() {
	chrome.storage.sync.get({
		tagArray: ['trippy','cat','dog','8bit']
	}, function(items) {
		taggle = new Taggle('tags', {
		tags: items.tagArray
		});
	});
}

function saveBackground(){
	var file = document.querySelector('input[type=file]').files[0];
	var reader = new FileReader();
	reader.onloadend = function () {
		// Store result here
		bg = reader.result;  
		console.log("Stored Image URI");
	}

	if(file.type.match('image.*')){
		console.log("Is an image");
		reader.readAsDataURL(file);
	}
	else{
		console.log("Invalid file");
	}
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('fileInput').addEventListener('change', saveBackground);
