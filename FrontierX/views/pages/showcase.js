var showcase = {
    
}

showcase.init = function(view){
    if(!view)Main.changeScreen(Screens.SHOWCASE);
    $("#app-container").html('');
    $("#app-container").load("views/html/showcase.html", function () {
        
    });
}