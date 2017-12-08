var disable = document.getElementById('disable-btn');
var enable = document.getElementById('enable-btn');
var reset = document.getElementById('reset-btn');
var currentThreshold = localStorage.getItem("channelThreshold");
var popThreshold = 0;

window.onload = loadSettings();

// document.write("<span id = 'curThreshold'>"+ "Current Threshold: " + currentThreshold +"</span>");

// function executes when the enable button is clicked by the user. It will set disable values for each button on the popup window and save the values for later loads of the popup window. Finally it will notify the user of the action via a desktop notification.
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

// function executes when the disable button is clicked by the user. It will set disable values for each button on the popup window and save the values for later loads of the popup window. Finally it will notify the user of the action via a desktop notification.
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

// function executes when the "Reset Threshold" button is clicked by the user. Initially it will notify the user of the action being performed. It will then cause the "window.EXECUTED" value in backgound.js to change from true to false allowing the setThreshold function to run, ultimately reseting the current threshold value located in local storage. 
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

//This function executes when there is a change in value found in local storage. The results of this function will only be seen in the console. 
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

//This function is utilized at the end of the enable.onclick function. It retrieves the new disable values of each of the buttons in the popup window and sends them to local storage. The saved values will then be used the next time the window is loaded.
function saveEnable(){
    var resetButton = reset.disabled;
    var disableButton = disable.disabled;
    var enableButton = enable.disabled;
    chrome.storage.local.set({'resetState': resetButton, 
                              'disableState': disableButton,
                              'enableState': enableButton});
    console.log("saving settings");
}

//This function is utilized at the end of the disable.onclick function. It retrieves the new disable values of each of the buttons in the popup window and sends them to local storage. The saved values will then be used the next time the window is loaded.
function saveDisable(){
    var resetButton = reset.disabled;
    var disableButton = disable.disabled;
    var enableButton = enable.disabled;
    chrome.storage.local.set({'resetState': resetButton, 
                              'disableState': disableButton,
                              'enableState': enableButton});
    console.log("saving settings");
}

// function executes on popup window load. Retrieves local storage variables set by both saveDisable() and saveEnable(). results will cause buttons to show up either as clickable or not clickable.   
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

//function executes after user clicks "Reset Threshold" button. function will send a request to background.js for current threshold variable.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    var tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, {}, function(response){
    console.log("request for threshold sent");
    });
});

//function executes after recieving response from background.js. Will add recieved currentThreshold value to "current threshold" section of the popup window.(atm trying to get function to add value to input element.)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
        console.log("threshold recieved");
        var popThreshold = JSON.stringify(request.data);
        document.getElementById('currentThreshold').innerHTML = popThreshold;
    });

//function executes after popup window loads. Will check the url of the currently focused tab in the browser window. If the condition of the if statement is found true, Notice_M3 will function. If else condition is met, Notice_M3 will disable all interactable functions of the popup window.
function checkUrl(){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs){
        var url = tabs[0].url;
        if(url.includes("twitch.tv/")){
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