// var target = $(".message")[0];

// var config = {attributes: false, childList: true, characterData: true};

$("#right-column").live(function(){
	$(this).append($("<div />").html("new div").attr("class", "message-line"))
})

var htmlBody = $("body")[0];
var chatObserver = new MutationObserver(function(mutation){
	mutation.forEach(function(mutation){
		if(mutations[i].addedNodes[j].class == "message-line"){
			console.log("found a message!");
		}
	});
});

chatObserver.observe($('#right-column').get(0),{
	childList: true
});
// chatObserver.observe(htmlBody, config);
// chatObserver.disconnect();

//on load ask user for permission for Notification APi to access their information.
 function notifyMe(){
	console.log("using notifyMe")
	if(!("Notification" in window)){
		alert("This browser does not support desktop notification")
	}

	else if(Notification.permission === "granted"){
		var notification = new Notification("Hi there!");

	}

	else if(Notification.permission !== "denied"){
		Notification.requestPermission(function(permission){
			if(permission === "granted"){
				var notification = new Notification("Hi there");
				}
			})
		};
}

notifyMe();
