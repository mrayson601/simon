var strictMode = false;
var seq = [];
var step = 0;
var playerStep = 0;
var playerSeq = [];
var finalStep = 20;

var audio1 = document.getElementById('audio1');
var audio2 = document.getElementById('audio2');
var audio3 = document.getElementById('audio3');
var audio4 = document.getElementById('audio4');

function buttonPress(x) {
  switch (x) {
    case 1:
      audio1.play();
      break;
    case 2:
      audio2.play();
      break;
    case 3:
      audio3.play();
      break;
    case 4:
      audio4.play();
      break;
  }
  $("#" + x).addClass("pressed");
  $("#" + x).on(
    "webkitAnimationEnd oanimationend msAnimationEnd animationend",
    function() {
      $("#" + x).removeClass('pressed');
    }
  );
}

function runSeq() {
  $('div').addClass("disabled");
  $("#status").text(seq.length);
  setTimeout(function() {
    if (step < seq.length) {
      buttonPress(seq[step]);
      step = step + 1;
      runSeq()
    }
  }, 1000)
  if (step == seq.length) {
    $('div').removeClass("disabled");

  }
}

function createSeq() {
  var rand = Math.floor(Math.random() * 4) + 1;
  seq.push(rand);
}

function checkSeq() {
  $("#buttonBox").removeClass("flashCorrect");
  $("#buttonBox").removeClass("flashWrong");

  if (seq[playerStep - 1] != playerSeq[playerStep - 1]) {
    setTimeout(function() {
      $("#buttonBox").addClass("flashWrong");
    }, 500);

    playerStep = 0;
    playerSeq = [];
    step = 0;

    if (strictMode == true) {
      playerSeq = [];
      playerStep = 0;
      step = 0;
      seq = [];

      createSeq();
      setTimeout(
        function() {
          runSeq();
        },
        1000);
    } else {

      setTimeout(
        function() {
          runSeq();
        },
        1000);
    }
  }

  if (seq.length == playerSeq.length) {
    setTimeout(function() {
      $("#buttonBox").addClass("flashCorrect");
    }, 500);
    if (playerStep == finalStep) {
      gameBeat();
    } else {
      playerSeq = [];
      playerStep = 0;
      step = 0;
      createSeq();
      setTimeout(
        function() {
          runSeq();
        },
        1000);
    }
  }
}

function gameBeat() {
  $("#status").text("WIN!");
  playerSeq = [];
  playerStep = 0;
  step = 0;
  seq = [];
  createSeq();
  setTimeout(
    function() {
      runSeq();
    },
    4000);

}

$("#strict").click(function() {
  if (strictMode == false) {
    strictMode = true;
    $("#buttonBox").addClass("strict");
  } else {
    strictMode = false;
    $("#buttonBox").removeClass("strict");

  }

})

$("#newGame").click(function() {
  playerSeq = [];
  playerStep = 0;
  step = 0;
  seq = [];

  createSeq();
  setTimeout(
    function() {
      runSeq();
    },
    2000);
})

$(".gameButton").click(function() {
  var buttonID = $(this).attr("id");
  playerStep = playerStep + 1;
  buttonID = parseInt(buttonID);
  buttonPress(buttonID);
  playerSeq.push(buttonID);
  checkSeq();
})

$(document).ready(function() {
  playerSeq = [];
  playerStep = 0;
  step = 0;
  seq = [];

  createSeq();
  setTimeout(
    function() {
      runSeq();
    },
    1000);
});
