var collection = {
    
}

collection.init = function(view){
  
    if(!view)Main.changeScreen(Screens.COLLECTIONS);
    $("#app-container").html('');
    $("#app-container").load("views/html/collection.html", function () {
        
    });
}