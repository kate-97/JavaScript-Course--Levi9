/* Utility JS file with utility methods for drawing smileys. */

var eye = function(x, y) {
    var eye = document.createElement("div");
    eye.setAttribute("class", "eye");
    eye.setAttribute("style", "top: " + y + "px; left: " + x + "px;");

    var eyeBlack = document.createElement("div");
    eyeBlack.style.position = "relative";
    eyeBlack.style.top = "3px";
    eyeBlack.style.left = "2px";

    eyeBlack.style.width = "2px";
    eyeBlack.style.height = "2px";
    eyeBlack.style.borderRadius = "5px";
    eyeBlack.style.border = "1px solid black";
    eyeBlack.style.backgroundColor = "black";
    eye.appendChild(eyeBlack);

    return eye;
}


function make_smiley(posX, posY){
    var newSmiley = document.createElement("div");
    newSmiley.setAttribute("class","smiley");
    newSmiley.style.top = posX + "px";
    newSmiley.style.left = posY + "px";
    newSmiley.appendChild(eye(8, 10));
    newSmiley.appendChild(eye(22, 10));
    
    var smile = function() {
        var smiley = document.createElement("div");
        smiley.setAttribute("class", "smile");
        smiley.style.top = "20px";
        smiley.style.left = "12px";
        return smiley;
    };
    newSmiley.appendChild(smile());
    return newSmiley;
}