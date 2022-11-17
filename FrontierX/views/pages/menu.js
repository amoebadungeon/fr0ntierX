var menu = {
    prevScreen:null,
    currScreen:'',    
}

menu.init = function (skrin) {
    // this.prevScreen = AppData.currentScreen;
    this.currScreen = skrin
    Main.changeScreen(Screens.Menu);
   $("#menu-container").html();
   $("#menu-container").load("views/html/menu.html", function () {
        setTimeout(function(){
            var skrin = $("#app-container").children().attr("class")
            $("#"+skrin).addClass('focus')
        },100)  
    });
}

menu.OnMouseOverEvent = function(event){
   
    SpatialNavigation.init();
	SpatialNavigation.add({
	    selector: '.sidemenu '
	  });
      
	SpatialNavigation.makeFocusable();
	SpatialNavigation.focus();
    $('.info-container').find('.focus').removeClass('focus')
    $("#"+event.target.id).is(".menu-item")?
    $("#menu").find("#"+event.target.id).addClass('focus') : null;
      
    switch(event.target.id){
        case "collections":
            collection.init(true);
            break;
        case "showcase":
            showcase.init(true)
            break;
        case "settings":            
            Settings.init(true);
            break;
        case "exit":
            Main.sdkVersion.substring(0, 1) === '5'?  window.close() :  webOS.platformBack();
            break;
      }
}
menu.onKeyDownHandler = function(event){

    switch (event) {
		case tvKey.KEY_BACK:
            // Main.changeScreen(this.prevScreen);
			break;

		case tvKey.KEY_UP:
            if($('.info-container').find(".focus").prev('.menu-item').length){
                $('.info-container').find('.focus').removeClass('focus').prev('.menu-item').addClass('focus');
            }else{
               $('.info-container').find('.focus').removeClass('focus');
               $("#app-container").html('')
               $("input[type=text]").focus()
            }
            var focus = $('.info-container').find(".focus").attr("id");
            switch(focus){
                case "collections"      : collection.init(true);break;
                case "showcase"         : showcase.init(true);break;
                case "settings"         : Settings.init(true); break;
                default : break;
            }
			break;

		case tvKey.KEY_DOWN:
            if($('.info-container').find(".focus").next('.menu-item').length){
                $('.info-container').find('.focus').removeClass('focus').next('.menu-item').addClass('focus');
            }else{
		$("input[type=text]").blur();
                $('.info-container').find('.focus').removeClass('focus')
                $('.info-container').find('#collections').addClass('focus')
            }
            var focus = $('.info-container').find(".focus").attr("id");
            switch(focus){
                case "collections"      : collection.init(true);break;
                case "showcase"         : showcase.init(true);break;
                case "settings"         : Settings.init(true); break;
                case "exit"             : $("#app-container").html(''); break;
                default : break;
            }
			break;

        case tvKey.KEY_RIGHT:          
            var skrin = $("#app-container").children().attr("id")
            switch(skrin){
                case "collections"      : break;
                case "showcase"         : break;
                case "settings-page"    : Settings.load(skrin); break;
                case "exit"             : Main.sdkVersion.substring(0, 1) === '5'?  window.close() :  webOS.platformBack();
                                         break;
                default : break;
            }
          
            break;
		case tvKey.KEY_ENTER:
            console.log("KEY_ENTER",event)
			break;
		default:
			console.log("Unhandled key");
			break;
	}
}
