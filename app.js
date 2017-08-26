// global variables that will be able to be changed by user in the future.
// threshold variable will be changed via automatic message counter algorithem
//		that will calculated messages/minute

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MutationObserver;


// var target = $(".message")[0];

window.ENABLED = true;
var threshold = 0;
var count = 0;
var RESULT = count;
window.EXECUTED = false;

var config = { attributes: true, childList: true, characterData: true };
var htmlBody = $("body")[0];

var checkStorage = function(){
    console.log("checking local storage...");
    if(localStorage.getItem('channelThreshold') === null ||
    localStorage.getItem('channelThreshold') === "0"){
        console.log("threshold has not been set in local storage yet");
    }
    else{
        console.log("Previous threshold will be set as threshold");
        threshold = localStorage.getItem('channelThreshold');
        window.EXECUTED = true;
    }
    console.log(threshold);
}

checkStorage();

var setThreshold = setInterval(function(){
    if(window.ENABLED == false){
        console.log("Notify_M3 is off");
    }
	else if(!EXECUTED){
		EXECUTED = true;
		threshold = count * 0.95;
        localStorage.channelThreshold = threshold;     
		var thresh = new Notification("threshold was set.");
	}
}, 59 * 1000);


// var showResult = setInterval(function() {

//     COUNT = 0;
// }, 60 * 1000);

var noticeMe = setInterval(function(){
	// var results = new Notification(COUNT + " messages after a minute.");
    if(window.ENABLED == false){
        console.log("Notify_M3 is off");
    }
	else if(count >= threshold){
		noticeNotify();
	}
	count = 0;
}, 60 * 1000);

function noticeNotify(){
    var notification = chrome.notifications.create("", {
        message: "NOTICE ME!!!"
    });
}

var checkEnable = setInterval(function(){
    console.log(EXECUTED);
}, 5000);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.executed === false){
            var reset = new Notification("Threshold will reset");
            window.EXECUTED = false;
            sendResponse({recieved: "message recieved"});
            return true;
        }

        else if(request.enabled === false){
            window.ENABLED = false;
            sendResponse({recieved: "will disable Notify_M3"});
            var turnOff = new Notification("Notify_M3 has been Disabled");
            return true;
        }
        
        else if(request.enabled === true){
            window.ENABLED = true;
            sendResponse({recieved: "will enable Notify_M3"});
            var turnOn = new Notification("Notify_M3 has been Enabled");
            return true;
        }
        
    });

var countMsgHTML = function(msgHTML) {
    count += 1;
    console.log("found a message");
    console.log(count);
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
    if(ENABLED){
        console.log("Notice_M3 is running");
        notifyMe();
    }
}

checkNotifyMe();
