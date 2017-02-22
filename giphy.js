//TODO: 
//Read tags from file
//Placeholder gif + message when no gif is returned from giphy
//atribution text
//background?
//custom greetings

if ('addEventListener' in window) {
	window.addEventListener('load', function() { document.body.className = document.body.className.replace(/\bis-loading\b/, ''); });
	document.body.className += (navigator.userAgent.match(/(MSIE|rv:11\.0)/) ? ' is-ie' : '');
	}
request = new XMLHttpRequest;
var tags = ["trippy", "cat", "adventure-time", "futurama", "8bit", "fish", "dog", "unicorn", "bear", "koala"];
var randomNum = Math.floor(Math.random()*tags.length); 
console.log(randomNum);
request.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+tags[randomNum], true);

request.onload = function() {

	if (request.status >= 200 && request.status < 400){
		data = JSON.parse(request.responseText).data.image_url;
		console.log(data);
		document.getElementById("giphyme").innerHTML = '<img src = "'+data+'" height="250" width="250">';
	} else {
		console.log('reached giphy, but API returned an error');
	}
};
request.onerror = function() {
	console.log('connection error');
};

request.send();


chrome.storage.sync.get({
	favoriteColor: 'red'}, function(items){
	console.log(items.favoriteColor);
	});
	

var myDate = new Date(); 
var greeting;

if ( myDate.getHours() < 12 ){ 
	greeting = ("Good Morning"); 
} 
else  /* Hour is from noon to 5pm (actually to 5:59 pm) */
	if ( myDate.getHours() >= 12 && myDate.getHours() <= 17 ) { 
		greeting = ("Good Afternoon");
	} 
else  /* the hour is after 5pm, so it is between 6pm and midnight */
	if ( myDate.getHours() > 17 && myDate.getHours() <= 24 ) { 
		greeting = ("Good Evening"); 
	} 
else  /* the hour is not between 0 and 24, so something is wrong */{ 
	greeting = ("I'm not sure what time it is!"); 
} 
document.getElementById('greeting').innerHTML = greeting;
document.getElementById('title').innerHTML = greeting;

