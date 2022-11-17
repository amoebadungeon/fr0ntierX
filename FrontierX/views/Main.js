
window.addEventListener('webOSRelaunch', function(inData) { 
    // Check the received parameters
    console.log(JSON.stringify(inData.detail));
    // Do something in the background
    Main.onLoad();
    PalmSystem.activate();

}, true);


var request = webOS.service.request("luna://com.webos.service.tv.systemproperty", {
    method: "getSystemInfo",
    parameters: { 
        "keys": ["modelName", "firmwareVersion", "UHD", "sdkVersion"]
    },
    onComplete: function (inResponse) {
        var isSucceeded = inResponse.returnValue;
 
        if (isSucceeded){
            console.log("Result: " + JSON.stringify(inResponse));
            Main.model = JSON.stringify(inResponse.modelName).replace(/\"/g, "");
            Main.firmware = JSON.stringify(inResponse.firmwareVersion).replace(/\"/g, "");
            Main.sdkVersion = JSON.stringify(inResponse.sdkVersion).replace(/\"/g, "");
            console.log('UserCfg.model:',Main.model);
            console.log('UserCfg.firmware:',Main.firmware);
			console.log('WebOsVersion:',Main.sdkVersion); 
        } else {
            console.log("Failed to get TV device information");
            // To-Do something
            return;
        }
    }
});

var Main = {
   
    sdkVersion:'',
    model:'',
    firmware:''
}


Main.onLoad = function(){
    Main.eventListener();
    Settings.init();
    menu.init();
    
}
Main.eventListener = function(){
    $(document).off("click").on("click", Main.onMouseOver);
    $(document).off("keydown").on('keydown', Main.onKeyDown);
}
Main.removeListeners = function () {
    $(document).off('keydown', Main.onKeyDown);
    $(document).off("click", Main.onMouseOver);
};
Main.onMouseOver = function(event){
    window[AppData.currentScreen].OnMouseOverEvent(event);
}
Main.onKeyDown = function (inEvent) {
   
    if(window.event) {
        keycode = inEvent.keyCode;
    } else if(e.which) {
        keycode = inEvent.which;
    }
    window[AppData.currentScreen].onKeyDownHandler(keycode);
};
Main.changeScreen = function (screen, isDestroy) {
	
	console.log('AppData.currentScreen 1:',AppData.currentScreen);
	console.log('screen:',screen);
    if (AppData.currentScreen !== screen) {
        isDestroy && AppData.currentScreen.destroy && AppData.currentScreen.destroy();
        AppData.currentScreen = screen;
        console.log("Current screen is", AppData.currentScreen);
    }
};
window.onload = Main.onLoad;

