// Saves options to chrome.storage

//TODO
//Safeguard against having zero tags
//Descriptions and organization
//attribution toggle
//custom backgrounds?
//custom greetings
var taggle;

function save_options() {
  var likesColor = document.getElementById('like').checked;
  var tagArray = taggle.getTagValues();
  chrome.storage.sync.set({
    likesColor: likesColor,
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

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    likesColor: true,
	tagArray: ['trippy','cat','dog','8bit']
  }, function(items) {
    document.getElementById('like').checked = items.likesColor;
	taggle = new Taggle('tags', {
		tags: items.tagArray
	});
  });

}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
