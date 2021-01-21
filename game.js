var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


//Starting the Game with Keypress in Keyboard


$(document).keypress(function() {

  if (!started) {
    $("#level-title").text("Level  " + level);
    nextSequence();
    started = true;

  }

});

//Identifying Click

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});


//Function to create a Sequence

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level  " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);


}

// One function for Playing all the Sounds

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}


//Adding Animation to the Key pressed

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);


}



function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {

        nextSequence();
      }, 1000);

    }
  } else {

    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function() {

      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game-Over, Press any Key to restart!");

    startOver();
  }
}


//Restarting The game

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];

}
