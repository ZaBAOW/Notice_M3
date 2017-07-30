var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MutationObserver;

// var target = $(".message")[0];

var COUNT = 0;
var RESULT = COUNT;

var config = { attributes: false, childList: true, characterData: true };
var htmlBody = $("body")[0];

var showResult = setInterval(function() {
    var results = new Notification(COUNT + " messages after a minute.");
    COUNT = 0;
}, 60 * 1000);

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
    console.log("new mutationobserver loaded");
    mutation.forEach(function(mutation) {
        var chatSelector = $(".chat-lines");
        console.log("chat selected");
        if (chatSelector.length > 0) {
            var target = chatSelector[0];
            console.log("found twitch chat");

            chatSearcher.observe(target, config);
            observer.disconnect();
        }
    });
});



// chatObserver.disconnect();

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

notifyMe();