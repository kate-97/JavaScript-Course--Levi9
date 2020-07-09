/* Main JS file with module for game and its functions */

// Game buttons
var startButton = document.getElementsByClassName("btn btn-primary")[0];
var pauseButton = document.getElementsByTagName("button")[1];

// Main function which initialize and return instance of game party (party module)
function game_init () {
    // Basic game variables - container for smileys and all possible colors for smileys
    var gameContainer = document.getElementById("game-space");
    var colorsSet = ['red', 'blue', 'green', 'salmon', 'purple', 'royalblue', 'navy', 'grey', 'orange', 'palevioletred'];

    // CSS properties for smiles
    var minLeft = 2.5;
    var minTop = 5;
    var smileyRadius = 40;
    var spaceBetween = 5;

    // Game state (declarations)
    var framesWon;
    var timeLeft;
    var isGame = false;
    var isStarted = false;
    var isGameOver = false;

    // Utility contant for drawing smiles
    const maxSmiles = 10;

    // Initialization of game state data
    function init(){
        framesWon = 0;
        timeLeft = 20.00;
        document.getElementsByClassName("form-control-plaintext")[1].setAttribute("value", "" + framesWon);
    }

    // Calculating the remaining time
    function reduce_time(){
        timeLeft -= 0.01;
        document.getElementsByClassName("form-control-plaintext")[0].setAttribute("value", "" + Math.max(timeLeft, 0).toFixed(2));

        if(timeLeft <= 0.0){ // If time is out, game is finishing.
            isGame = false;
            removeAll();
            console.log("Game over");
            var game_over = document.createElement("div"); // In next lines we are creating sign for game over
            game_over.setAttribute("id", "game_over");
            game_over.setAttribute("class", "special_game_state");
            game_over.textContent = "GAME OVER";
            document.getElementById("container").appendChild(game_over);
            isGameOver = true;
            isStarted = false;

            send_result(ime,framesWon)
        }
        
        else if (isGame) // Anyway, if it isn't pause, we are calling this callback again (for same period)
           setTimeout(reduce_time, 10);
    }

    function draw_smileys(frames_won){  // Method for drawing frame - main content of our game
        
        // Firstly we are calculating surface where will be smileys in this frame
        iMin = Math.floor(Math.random() * (maxSmiles - 3));
        iMax = Math.floor(Math.random() * (maxSmiles - iMin)) + iMin;

        jMin = Math.floor(Math.random() * (maxSmiles - 3));
        jMax = Math.floor(Math.random() * (maxSmiles - jMin)) + jMin;

        // Then we are calculating colors for them in this frame
        color1 = Math.floor(Math.random() * (colorsSet.length - 1)); // usual color
        color2 = Math.floor(Math.random() * (colorsSet.length - 1)); // special color (for differently colored)

        if(color1 == color2){
         if(color1 == colorsSet.length - 1)
            color2 = 0;
        else color2 = color1 + 1;
        }

        // How much smileys will be differently colored from the others 
        var differentColored = Math.floor( Math.random() * Math.min( framesWon , Math.floor(maxSmiles/2) )) + 1;

        // Declarations for these previous variables (here we are ilustrating hoisting)
        var iMin, iMax, jMin, jMax, color1, color2;

        // Utility variables - first which indicates for differently colored emoji and second how many smileys we have to color differently
        var p;
        var leftToColor = differentColored;

        // We are drawing smileys by order
        for(var i = iMin; i <= iMax; i++)
            for(var j = jMin; j <= jMax; j++){

                // We are creating smiley on the given position
                var smiley_new = make_smiley(minLeft + i * (smileyRadius + spaceBetween), minTop + j * (smileyRadius + spaceBetween));

                // If we have to color more smileys, we will calculate indicator variables and see if we do this
                if(leftToColor > 0){
                    p = Math.random();

                    if(p > 0.5 || (i == iMin && j == jMin)){
                        smiley_new.style.backgroundColor = colorsSet[color2];
                        
                        leftToColor--;}
                    else smiley_new.style.backgroundColor = colorsSet[color1];
                } else smiley_new.style.backgroundColor = colorsSet[color1]; // Anyway, we are color emoji in usual color

                // Finally we are adding smiley to our container and register its appropriately callback
                gameContainer.appendChild(smiley_new);
                smiley_new.onclick = function() { // Firstly we color smiley in other color and then we are checking if they are same colored
                    if(isGame){
                        if(this.style.backgroundColor == colorsSet[color1]){
                            this.style.backgroundColor = colorsSet[color2];}
                        else
                        {
                            this.style.backgroundColor = colorsSet[color1];
                        }
                        check();
                    }
                };
    }
 }

    // Callback function for pausing and returning to game (we will register for clicking on 'Pause' button)
    function pause_game(){
        isGame = !isGame;

        if(isGame){ // Branch for come back to game
            document.getElementById("container").removeChild(document.getElementById("game_paused"));
            reduce_time();
        } else {    // Branch for pausing game
            var paused = document.createElement("div");
            paused.setAttribute("id", "game_paused");
            paused.setAttribute("class", "special_game_state");
            paused.textContent = "PAUSED";
            document.getElementById("container").appendChild(paused);
        }
    }

    // Function for starting game (or repeated start after other party)
    function start_game() {
        if(isStarted) // If player clicks o start button, but game is already happening, it will happen nothing
            return false;
        isStarted = true;
        if(isGameOver) // If it isn't the first party of game, we have to remove sign for game over
        {
            isGameOver = false;
            container.removeChild(document.getElementById("game_over"));
        }
        init(); // Initialize game data
        isGame = true; // Game is happening
        draw_smileys(framesWon); // First drawing smileys
        reduce_time(); // Initial call of this callback
        return false;  // We don't want to loose content of window (start button is actually 'submit' button; because of same reason it's so in the first branch)
    }

    function check() { // Function for checking if all smileys are in the same color
        var allSmileys = document.getElementsByClassName("smiley");
        var color_  = allSmileys[0].style.backgroundColor;

        for(var i = 1; i < allSmileys.length ; i++)
            if(allSmileys[i].style.backgroundColor != color_)
                return; // If they aren't in the same color, it will happen nothing

        // If they are in the same color, we are updating game data, remove all existing smileys and drawing new frame.
        framesWon += 1;
        timeLeft += 1.0;
        document.getElementsByClassName("form-control-plaintext")[1].setAttribute("value", "" + framesWon);

        removeAll();
        if(isGame){
            draw_smileys(framesWon);
        }
    }

    function removeAll() { // Utility function removing all existing smileys
        while (gameContainer.firstChild) {
            gameContainer.removeChild(gameContainer.firstChild);
          }
    }


    return { // We from this 'function - module' are returning object with callback functions for buttons -- we will register them below
        start: start_game,
        pause: pause_game
    }
    };

ucitajIme()
//  Now we have initialized data and methods for game, registered button - callbacks and now game can to start. Enjoy! :)
party = game_init();
startButton.onclick = party.start;
pauseButton.onclick = party.pause;



