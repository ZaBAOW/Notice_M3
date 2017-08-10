// global variables that will be able to be changed by user in the future.
// threshold variable will be changed via automatic message counter algorithem
//		that will calculated messages/minute

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MutationObserver;


// var target = $(".message")[0];

window.ENABLED = true;
var THRESHOLD = 0;
var COUNT = 0;
var RESULT = COUNT;
window.EXECUTED = false;

var config = { attributes: true, childList: true, characterData: true };
var htmlBody = $("body")[0];


var setThreshold = setInterval(function(){
	if(!EXECUTED){
		EXECUTED = true;
		THRESHOLD = COUNT * 0.95;
		var thresh = new Notification("threshold was set.");
	}
}, 59 * 1000);

// var showResult = setInterval(function() {

//     COUNT = 0;
// }, 60 * 1000);

var noticeMe = setInterval(function(){
	// var results = new Notification(COUNT + " messages after a minute.");
	if(COUNT >= THRESHOLD){
		var notice = new Notification("NOTICE ME!!!");
	}
	COUNT = 0;
}, 60 * 1000);

var checkEnable = setInterval(function(){
    console.log(EXECUTED);
}, 5000);

var countMsgHTML = function(msgHTML) {
    COUNT += 1;
    console.log("found a message");
    console.log(COUNT);
};

function chatObserver() {
    console.log("using chatObserver");
    return new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(addedNode) {
                var chatMessage = $(addedNode);
                if (!chatMessage.is(".chat-line", ".message-line")) {
                    return;
                }
                var messageElement = chatMessage.children('.message');
                countMsgHTML(messageElement);
            });
        });
    });
};

var chatSearcher = chatObserver();


var chatLoadedObserver = new MutationObserver(function(mutation, observer) {
    mutation.forEach(function(mutation) {
        var chatSelector = $(".chat-lines");
        // var liveSelector = $(".player-streamstatus__label");
        // if (liveSelector === "Offline"){
        // 	var offline = new Notification("The stream is not currently live Notice_M3 will not run.");
        // 	return;
        // }
        if (chatSelector.length > 0) {
            var target = chatSelector[0];

            chatSearcher.observe(target, config);
            observer.disconnect();
        }
    });
});


//on load ask user for permission for Notification APi to access their information.
function notifyMe() {
    console.log("using notifyMe")


    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification")
        console.log("browser not supported");
    } else if (Notification.permission === "granted") {
        var notification = new Notification("Hi there!");
        chatLoadedObserver.observe(htmlBody, config);
        console.log("permission was already granted");
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission(function(permission) {
            if (permission === "granted") {
                var notification = new Notification("Hi there");
                chatLoadedObserver.observe(htmlBody, config);
                console.log("permission was granted");
            }
        });
    } else {
        console.log("statements aren't working");
    }
}

function checkNotifyMe(){
    if(ENABLED == true){
        notifyMe();
    }
}

checkNotifyMe();

