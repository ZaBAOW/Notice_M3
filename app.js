// global variables that will be able to be changed by user in the future.
// threshold variable will be changed via automatic message counter algorithem
//		that will calculated messages/minute
var TRHESHOLD = 25;
var COUNT = 0;

//MessageObserverObserver used to find twitch chat
var config = {attributes: false, childList: true, characterData: false};

var htmlBody = $("body")[0];
var chatLoadedObserver = new MutationObserver(function (message, observer) {
	console.log("Chat found!");
    messages.forEach(function (message) {

        var chatSelector = $(".chat-lines");
        if (chatSelector.length > 0) {
        	
            // Select the node element.
            var target = chatSelector[0];

            // Pass in the target node, as well as the observer options
            messageFinder.observe(target, config);

            // Unregister chatLoadedObserver. We don't need to check for the chat element anymore.
            observer.disconnect();
        }
    })
});

//mutationObserver used to find newly created messages
// Attach listener that acts when a new chat message appears.
var messageFinder = new MutationObserver(function (message) {
  // For each mutation object, we look for the addedNode object
  messages.forEach(function (message) {
    // A chat message would be an added node
    mutation.addedNodes.forEach(function (addedNode) {
      // At this point it's potentially a chatMessage object.
      var chatMessage = $(addedNode);

      if (!chatMessage.is(".chat-line", ".message-line")) {
        // this isn't a chat message, skip processing.
        return;
      }
      // Grab the actual span element with the message content
      var messageElement = chatMessage.children(twitchChatMessageContent);

      parseMsgHTML(messageElement);
    });
  });
});

var parseMsgHTML = function(msgHTML){
    COUNT += 1;
	console.log(msgHTML);
}


function sendNotice(){
	if(COUNT = TRHESHOLD){
		var notification = new Notification('Something big just went down on the stream while you weren\'t looking!')
		COUNT = 0;
	}
}

//on load ask user for permission for Notification APi to access their information.
var notifyMe =  function(){
	console.log("using notifyMe")
	if(!("Notification" in window)){
		alert("This browser does not support desktop notification")
	}

	else if(Notification.permission === "granted"){
		console.log("permission already granted");
		//finds twitch chat
		chatLoadedObserver.observe(htmlBody, config);

		//finds newly created message content
		messageFinder;

		//notify user
		sendNotice();

		//clears array for next notification
		// clearArray();

	}

	else if(Notification.permission !== "denied"){
		Notification.requestPermission(function(permission){
			if(permission === "granted"){
				console.log("permission granted");
				// if permission granted, begin to parse html of currently running twitch streams on user's device for list elements.
				chatLoadedObserver.observe(htmlBody, config);
				//html parsing code that should look for message elements
				messageFinder;

				//should be the first element with this tag name that is created for the user's session.
				//not sure whether to get element by tag or class name(message)
 			

				//variable that refers to threshold that must be passed for notification to appear (will be set by the streamer)
				sendNotice();
				//clearArray();
				}
			})
		};
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

chrome.browserAction.onCliked.addListener('DOMContentLoaded', function(){
	console.log('event!')
	notifyMe();
}

//li_count function will push listed items parsed by observer into an array.
//the the value of array.length will then be compared to THRESHOLD value.
//
// function li_count() {

// 	//begin a timer(specified by setInterval).
// 	//append list item to an array
// 	li_array.push(li_item);

// 	//for loop iterates through each list item.
// 	for(var i = 0; i < li_item.length; i++){
// 		//continue appending newly created list items to array
// 		//I want to grab the next immediat element with this tag name
// 		li_item = document.getElementsByTagName("li")
// 		li_array.push(li_item);

// 		// if list item array lengt is greater than set value before timer ends, send user a notification.
// 		if(li_array.length >= TRHESHOLD){

// 			//send user notification
// 			//clear list item array and setInterval timer
// 			var li_array = [];
// 		}
// 		//else break the function.
// 			//clear list item array and setInterval timer
// 			var li_array = [];
// 		}
// } //(example for interval time)
