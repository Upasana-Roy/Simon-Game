var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

//starting the game
var started = false;
var level = 0;

$(document).keydown(function() {
  if(!started)
  {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  //console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);  //accessing the index of the last answer in the user's sequence.
});

function nextSequence() {
  userClickedPattern = []; //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  level++;
  $("h1").text("Level " + level);
  var randomNo = Math.floor(Math.random()*4); //creating random no from 0 to 3.
  var randomChosenColour = buttonColours[randomNo];  //choosing a random colour from the array buttonColours.
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);  //creating a flash to the button.
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); //adding sounds.
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {
    //console.log("success");
    if(gamePattern.length === userClickedPattern.length)
    {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }


  else
  {
    //console.log("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);

    $(document).keydown(function() {
      startOver(); //for restarting the game.
    });


  }

}

//for restarting the game.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  nextSequence();
}
