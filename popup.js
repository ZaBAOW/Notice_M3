var disable = document.getElementById('disable-btn');
var enable = document.getElementById('enable-btn');
var reset = document.getElementById('reset-btn');

enable.onclick = function(){
    document.getElementById('enable-btn').disabled = true;
    document.getElementById('disable-btn').disabled = false;
    document.getElementById('reset-btn').disabled = false;
    console.log("enabling Notify_M3");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, {enabled: true}, function(response){
            console.log(response.recieved);
        });
    });
};

disable.onclick = function(){
    document.getElementById('enable-btn').disabled = false;
    document.getElementById('disable-btn').disabled = true;
    document.getElementById('reset-btn').disabled = true;
    console.log("disabling Notify_M3");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, {enabled: false}, function(response) {
            console.log(response.recieved);
        });
    });
};

reset.onclick = function (){
    // executed = false;
    console.log("resetting threshold...");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, {executed: false}, function(response) {
        console.log(response.recieved);
      });
    });
};

