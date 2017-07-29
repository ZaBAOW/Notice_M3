var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MutationObserver;

// var target = $(".message")[0];

var COUNT = 0;

var config = {attributes: false, childList: true, characterData: true};

var htmlBody = $("body")[0];
var chatLoadedObserver = new MutationObserver(function(mutation){
	console.log("new mutationobserver loaded");
	mutation.forEach(function(mutation){
		var chatSelector = $(".chat-lines");
		console.log("chat selected");
		if (chatSelector.length > 0){
				var target = chatSelector[0];
				console.log("found twitch chat");

				chatObserver.observer(target, config);
				observer.disconnect();
			}
		});
});

var chatObserver = new MutationObserver(function(mutation){
	mutation.forEach(function(mutation){
		mutation.addedNodes.forEach(function(addedNode){
			var chatMessage = $(addedNode);
			if(!chatMessage.is(".chat-line", ".message-line")){
				console.log("not a chat message.");
				return;
			}
			var messageElement = chatMessage.children('.message');
			countMsgHTML(messageElement);
		});
	});
});

var countMsgHTML = function(msgHTML){
	COUNT += 1;
	console.log("found a message");
	console.log(COUNT);
}

// chatObserver.disconnect();

//on load ask user for permission for Notification APi to access their information.
 function notifyMe(){
	console.log("using notifyMe")
	if(!("Notification" in window)){
		alert("This browser does not support desktop notification")
	}

	else if(Notification.permission === "granted"){
		var notification = new Notification("Hi there!");
		chatLoadedObserver.observe(htmlBody, config);
	}

	else if(Notification.permission !== "denied"){
		Notification.requestPermission(function(permission){
			if(permission === "granted"){
				var notification = new Notification("Hi there");
				chatLoadedObserver.observe(htmlBody, config);
				}
			})
		};
}

notifyMe();
