var disable = document.getElementById('disable-btn');
var enable = document.getElementById('enable-btn');
var reset = document.getElementById('reset-btn');
var currentThreshold = localStorage.getItem("channelThreshold");
var popThreshold = 0;

window.onload = loadSettings();

// document.write("<span id = 'curThreshold'>"+ "Current Threshold: " + currentThreshold +"</span>");

enable.onclick = function(){
    enable.disabled = true;
    disable.disabled = false;
    reset.disabled = false;
    console.log("enabling Notify_M3");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, {enabled: true}, function(response){
            console.log(response.recieved);
        });
    });
    saveEnable();
};

disable.onclick = function(){
    enable.disabled = false;
    disable.disabled = true;
    reset.disabled = true;
    console.log("disabling Notify_M3");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, {enabled: false}, function(response) {
            console.log(response.recieved);
        });
    });
    saveDisable();
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

chrome.storage.onChanged.addListener(function(changes, local){
    for (key in changes) {
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' + 
            'Old value was "%s", new value is "%s"',
            key,
            local,
            storageChange.oldValue,
            storageChange.newValue);
    }
})

function saveEnable(){
    var resetButton = reset.disabled;
    var disableButton = disable.disabled;
    var enableButton = enable.disabled;
    chrome.storage.local.set({'resetState': resetButton, 
                              'disableState': disableButton,
                              'enableState': enableButton});
    console.log("saving settings");
}

function saveDisable(){
    var resetButton = reset.disabled;
    var disableButton = disable.disabled;
    var enableButton = enable.disabled;
    chrome.storage.local.set({'resetState': resetButton, 
                              'disableState': disableButton,
                              'enableState': enableButton});
    console.log("saving settings");
}

function loadSettings(){
    var resetState = "";
    var disableState = "";
    var enableState = "";
    chrome.storage.local.get('resetState', function(result){
        resetState = result.resetState;
        reset.disabled = resetState;
    });

    chrome.storage.local.get('disableState', function(result){
        disableState = result.disableState;
        disable.disabled = disableState;
    });

    chrome.storage.local.get('enableState', function(result){
        enableState = result.enableState;
        enable.disabled = enableState;
    })
}
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    var tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, {}, function(response){
    console.log("request for threshold sent");
    });
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
        console.log("threshold recieved");
        var popThreshold = JSON.stringify(request.data);
        document.write(popThreshold);
    });

function checkUrl(){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs){
        var url = tabs[0].url;
        if(url.includes("://www.twitch.tv/")){
            console.log("this is a twitch webpage");
        }
        else{
            enable.disabled = true;
            disable.disabled = true;
            reset.disabled = true;    
        }
    });
}

checkUrl();