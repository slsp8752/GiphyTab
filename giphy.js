//TODO: 
//Placeholder gif + message when no gif is returned from giphy
//atribution text
//background?
//custom greetings


if ('addEventListener' in window) {
	window.addEventListener('load', function() { document.body.className = document.body.className.replace(/\bis-loading\b/, ''); });
	document.body.className += (navigator.userAgent.match(/(MSIE|rv:11\.0)/) ? ' is-ie' : '');
	}
	window.onload = function(){
var optionsButton = document.getElementById("options-button");
	optionsButton.addEventListener("click", function() {
	  if (chrome.runtime.openOptionsPage) {
		// New way to open options pages, if supported (Chrome 42+).
		chrome.runtime.openOptionsPage();
	  } else {
		// Reasonable fallback.
		window.open(chrome.runtime.getURL('options.html'));
	  }
	}); 
}

var tags;
var randomNum;
var apiKey = "dc6zaTOxFJmzC";
request = new XMLHttpRequest;
chrome.storage.sync.get({
	tagArray: ['trippy','cat','dog','8bit']
}, function(items){
	tags = items.tagArray;
	randomNum = Math.floor(Math.random()*tags.length); 
	request.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=' + apiKey + '&tag=' + tags[randomNum], true);

	request.onload = function() {

		if (request.status >= 200 && request.status < 400){
			data = JSON.parse(request.responseText).data.image_url;
			console.log(data);
			document.getElementById("giphyme").innerHTML = '<img src = "'+ data +'" height="250" width="250">';
		} else {
			console.log('reached giphy, but API returned an error');
		}
	};
	request.onerror = function() {
		console.log('connection error');
	};

	request.send();

});

var date = new Date(); 
var greeting;

if ( date.getHours() < 12 ){ 
	greeting = ("Good Morning"); 
} 
else  /* Hour is from noon to 5pm (actually to 5:59 pm) */
	if ( date.getHours() >= 12 && date.getHours() <= 17 ) { 
		greeting = ("Good Afternoon");
	} 
else  /* the hour is after 5pm, so it is between 6pm and midnight */
	if ( date.getHours() > 17 && date.getHours() <= 24 ) { 
		greeting = ("Good Evening"); 
	} 
else  /* the hour is not between 0 and 24, so something is wrong */{ 
	greeting = ("I'm not sure what time it is!"); 
} 
document.getElementById('greeting').innerHTML = greeting;
document.getElementById('title').innerHTML = greeting;

