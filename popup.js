window.onload = loadSettings();

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
    saveSettings();
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
    saveSettings();
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

function saveSettings(){
    var resetButton = reset;
    var disableButton = disable;
    var enableButton = enable;

    chrome.storage.local.set({'resetState': resetButton});
    chrome.storage.local.set({'disableState': disableButton});
    chrome.storage.local.set({'enableState': enableButton});
}

function loadSettings(){
    var resetState = "";
    var disableState = "";
    var enableState = "";
    chrome.storage.local.get('resetState', function(result){
        resetState = result.resetState;
    });

    chrome.storage.local.get('disableState', function(result){
        disableState = result.disableState;
    });

    chrome.storage.local.get('enableState', function(result){
        enableState = result.enableState;
    })
}
