var gameContainer = document.getElementById("game-space");
var minLeft = 2.5;
var minTop = 5;
var smileyRadius = 40;
var spaceBetween = 5;
var smileys = Array();

for(var i = 0; i < 10; i++)
    for(var j = 0; j < 10; j++){
        var smiley_new = make_smiley(minLeft + i * (smileyRadius + spaceBetween), minTop + j * (smileyRadius + spaceBetween));
        gameContainer.appendChild(smiley_new);
        smileys.push(smiley_new);
    }