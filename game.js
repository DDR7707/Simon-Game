
var buttoncolours = ["red", "blue", "green", "yellow"];

var gamepattern = [];
var userpattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var usercolour = $(this).attr("id");
  userpattern.push(usercolour);

  playSound(usercolour);
  animatePress(usercolour);

  checkAnswer(userpattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamepattern[currentLevel] === userpattern[currentLevel]) {
      if (userpattern.length === gamepattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userpattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomnum = Math.floor(Math.random() * 4);
  var randomcolour = buttoncolours[randomnum];
  gamepattern.push(randomcolour);

  $("#" + randomcolour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomcolour);
}

function animatePress(currentcolour) {
  $("#" + currentcolour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentcolour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamepattern = [];
  started = false;
}
