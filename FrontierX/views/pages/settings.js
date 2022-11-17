var Settings = {
    classname:"",
    PrevScreen:''
}

Settings.init = function(view){
    if(!view)Main.changeScreen(Screens.SETTING);
    $("#app-container").html('');
    $("#app-container").load("views/html/settings.html", function () {
        Settings.load();
    });
}
Settings.load = function (type) {
    if(type){
        Main.changeScreen(Screens.SETTING);
        this.classname =$("#"+type).children().attr("class");
    $("."+this.classname).find(".radio-button").first().addClass("settingfocus")
    }
}
Settings.onKeyDownHandler = function(event){
    
    switch (event) {

		case tvKey.KEY_BACK:
            $('.radio-item').find(".radio-button.settingfocus").removeClass("settingfocus");
            Main.changeScreen(Screens.Menu);
			break;

		case tvKey.KEY_UP:
            if($(".radio-container").find('.settingfocus').parent().prev().length ){
                var prev = $('.radio-item').find(".radio-button.settingfocus").parent().prev().find(".radio-button").attr("id");
                $('.radio-item').find(".radio-button.settingfocus").removeClass("settingfocus");
                $("#"+prev).addClass("settingfocus");
            }else{
                $('.radio-item').find(".radio-button.settingfocus").removeClass("settingfocus");
                $(".radio-container").find("#c1").addClass("settingfocus")
            }
			break;

		case tvKey.KEY_DOWN:
            if($(".radio-container").find('.settingfocus').parent().next().length ){
                var next = $('.radio-item').find(".radio-button.settingfocus").parent().next().find(".radio-button").attr("id");
                $('.radio-item').find(".radio-button.settingfocus").removeClass("settingfocus");
                $("#"+next).addClass("settingfocus");
            }else{
                $('.radio-item').find(".radio-button.settingfocus").removeClass("settingfocus");
                $(".radio-container").find("#a1").addClass("settingfocus")
            }
			break;
        case tvKey.KEY_LEFT:
            $('.radio-item').find(".radio-button.settingfocus").removeClass("settingfocus");
            Main.changeScreen(Screens.Menu);
			break;
		case tvKey.KEY_ENTER:
            if(  $('.radio-button.settingfocus').find("input").is(':checked') ){
                $('.radio-button.settingfocus').find("input").prop("checked", false);
            }
            else{
                $('.radio-button.settingfocus').find("input").prop("checked", true);
            }
			break;
		default:
			console.log("Unhandled key");
			break;
	}
}
Settings.OnMouseOverEvent = function(event){
    SpatialNavigation.init();
	SpatialNavigation.add({
	    selector: '#settings '
	  });
      
	SpatialNavigation.makeFocusable();
	SpatialNavigation.focus();
    
    $('.radio-item').find(".radio-button.settingfocus").removeClass("settingfocus");
    $("#"+event.target.id).length  ? $(".radio-item").find("#"+event.target.id).addClass("settingfocus") :  console.log("nothing") ;
    $("input[type='radio']").click(function()
    {
      var name = $(this).attr('name');
      $("input[name="+name+"]:radio").parent().addClass("settingfocus");

      if($("input[name="+name+"]:radio").is(':checked') ){
        $("input[name="+name+"]:radio").prop("checked", false);
    }
    else{
        $("input[name="+name+"]:radio").prop("checked", true);
    }
    });
}