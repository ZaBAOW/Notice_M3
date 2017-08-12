var disable = document.getElementById('disable-btn');
var enable = document.getElementById('enable-btn');
var reset = document.getElementById('reset-btn');

enable.onclick = function(){
    document.getElementById('enable-btn').disabled = true;
    document.getElementById('disable-btn').disabled = false;
    enabled = true;
    console.log("enabling Notify_M3");
    var turnOn = new Notification("Notify_M3 has been enabled");
    checkNotifyMe();
};

disable.onclick = function(){
    document.getElementById('enable-btn').disabled = false;
    document.getElementById('disable-btn').disabled = true;
    enabled = false;
    console.log("disabling Notify_M3");
    var turnOff = new Notification("Notify_M3 has been disabled");
};

reset.onclick = function (){
    // executed = false;
    console.log("resetting threshold...");
    var reset = new Notification("Threshold will reset");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tab = tabs[0];
      chrome.tabs.sendMessage(tab[0].id, {executed: false}, function(response) {
        console.log(response.recieved);
      });
    });
};

