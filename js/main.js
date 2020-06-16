function postMessageToPlayer(player, command){
    if (player == null || command == null) return;
    player.contentWindow.postMessage(JSON.stringify(command), "*");
}

function playPauseVideo(player, control){
    var player;
    switch (control) {
        case "play":
            // postMessageToPlayer(player, {
            //     "event": "command",
            //     "func": "mute"
            // });
            postMessageToPlayer(player, {
                "event": "command",
                "func": "playVideo"
            });
            break;
        case "pause":
            postMessageToPlayer(player, {
                "event": "command",
                "func": "pauseVideo"
            });
            break;
    }
}

jQuery(window).on('load', function(){
    var elems = [];
    jQuery(".ult-video iframe").each(function(){
        var player = jQuery(this).get(0);
        elems.push({
            "elem": player,
            "playing": false
        });
    });
    var elemsLength = elems.length;
    for (var i = 0; i < elemsLength; i++) {
        jQuery(elems[i].elem).bind('inview', function(event, isInView) {
            if (isInView) {
                if(!jQuery(event.target).hasClass("is-playing")){
                    playPauseVideo(event.target, "play");
                    jQuery(event.target).addClass("is-playing");
                }
            } else {
                if(jQuery(event.target).hasClass("is-playing")){
                    playPauseVideo(event.target, "pause");
                    jQuery(event.target).removeClass("is-playing");
                }
            }
        });
    }
});