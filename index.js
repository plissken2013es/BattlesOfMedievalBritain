function startDraggable() {
    $(".draggable" ).draggable({
        helper: "clone",
        cursor: "move",
        stop: function(event, ui) {
            let clone = $(ui.helper)
                .clone(true)
                .removeClass('box draggable ui-draggable ui-draggable-dragging')
                .addClass('box-clone')
                .appendTo('#page');
            clone.draggable({
                distance: 50,
                helper: "clone",
                cursor: "move",
                stop: function(event, ui) {
                    $(event.target).remove();
                }
            });
        }
    });
    $(".box-clone").draggable({
        distance: 50,
        helper: "clone",
        cursor: "move",
        stop: function(event, ui) {
            $(event.target).remove();
        }
    });
    $(".draggable-turn").draggable({
        cursor: "move"
    });
};

$(function() {
    startDraggable();
 });

$("#save").click(function() {
    if (confirm('Sure to save (and overwrite)?')) {        
	    localStorage.setItem('saved_game', $("#page").html());
    }
});

$("#load").click(function() {
    if (localStorage.getItem('saved_game') == null) return;
    if (confirm('Sure to load (and lost non saved changes)?')) { 
        $("#page").html(localStorage.getItem('saved_game'));
        startDraggable();
    }
});

$("#clear-markers").click(function() {
    if (confirm('Sure?')) { 
        $(".box-clone").filter(".activated").remove();
    }
});

$(".map-button").click(function() {
    if (confirm('Are you sure to change map to "' + $(this).attr("alt") + '"?')) { 
        console.log(this["id"]);
        $(".map").find("img").attr("src", "/img/" + this["id"] + ".png");
    }
});