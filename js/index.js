var greenBtn, redBtn, yellowBtn, blueBtn;
var greenColor, redColor, yellowColor, blueColor;
var buttonGroup = [];
var countElement;
var color = [];
var movesLeft = 1;
var movesCount = 1;
var index = 0
var playerMove;
var strictMode = false;
var greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var redAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3')
var yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3')
var blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
var colorRef = {
  'green': 1,
  'red':2,
  'yellow':3,
  'blue':4
}
var timeouts = [];

countElement = document.getElementById('count');
greenBtn = document.getElementById('green');
redBtn = document.getElementById('red');
yellowBtn = document.getElementById('yellow');
blueBtn = document.getElementById('blue');
startBtn = document.getElementById('start');
strictBtn = document.getElementById('strict');
resetBtn = document.getElementById('reset');
countElement = document.getElementById('count')
buttonGroup = [greenBtn, redBtn, yellowBtn, blueBtn]

//fill button to their respective color when pressed
//play their respective audio file 
function fillGreen() {
  greenAudio.play();
  greenBtn.style.backgroundColor = '#19ff19';
  timeouts.push(setTimeout(fillBlack, 300, greenBtn));
};

function fillRed() {
  redAudio.play();
  redBtn.style.backgroundColor = '#ff0000';
  timeouts.push(setTimeout(fillBlack, 300, redBtn));
};

function fillYellow() {
  yellowAudio.play();
  yellowBtn.style.backgroundColor = '#ffff00';
  timeouts.push(setTimeout(fillBlack, 300, yellowBtn));
};

function fillBlue() {
  blueAudio.play();
  blueBtn.style.backgroundColor = '#1919ff';
  timeouts.push(setTimeout(fillBlack, 300, blueBtn));
};

function fillStart() {
  startBtn.style.backgroundColor = 'orange';
  timeouts.push(setTimeout(fillBlack, 300, startBtn));
}

function fillReset()  {
  resetBtn.style.backgroundColor = 'grey'
  timeouts.push(setTimeout(fillBlack, 300,  resetBtn));
}

function fillBlack(element) {
  element.style.background = 'black';
};

function strict() {
  // check if strictMode is false and set the the background to red
  // if user click on strict, and set strictMode to true;
  if (!strictMode) {
   strictBtn.style.backgroundColor = 'red';
    strictMode = true;
  } else {
    strictBtn.style.backgroundColor = 'black';
    strictMode = false;
  }
}

function showCount() {
  // show counter of movesLeft
  countElement.innerHTML = movesLeft;
}
function randomColor() {
  //generate a random number between 1 and 4 and push it on to color array
  var randomNum = Math.floor(Math.random() * 4)+ 1;
  color.push(randomNum)
}

function enableButtons() {
  //enable the color buttons
  for (x in buttonGroup) {
    buttonGroup[x].disabled = false; 
  }
}

function disableButtons() {
  //disable the color buttons to stop random button press
  for (x in buttonGroup) {
    buttonGroup[x].disabled = true; 
  }
}

function checkMove(id) {
  //check player move against the move array
  // if incorrect, play color again if not strict and retry. start over if strict
  // if correct, decrement movesLeft, update the count element and increment the index
  // call nextRound() when all the presses are correct
  var playerMove = colorRef[id]
    if (playerMove == color[index]){
      movesLeft--;
      showCount();
      index++;
    } else if (playerMove !== color[index] && !strictMode) {
      movesLeft = movesCount;
      index = 0;
      countElement.innerHTML = 'Incorrect. Try again';
      playColors();
    } else {
      countElement.innerHTML = 'Incorrect. Starting Over :-(';
      index = 0;
      startGame();
    }
  if (index == color.length) {
      index = 0;
      movesCount++;
      movesLeft = movesCount;
      countElement.innerHTML = 'Next round!'
      nextRound();
    }
}

function playColors() {
  // fill the color buttons based on the color array
  // each time add a delay of 700ms
  // also disableButtons() when the colors are playing,
  // enableButtons() when the colors are done playing
  disableButtons();
  setTimeout(showCount, 700)
  var timeDelay = 700;
  for (x in color) {
    if (color[x] == 1) {
      timeouts.push(setTimeout(fillGreen, timeDelay));
      timeDelay += 700;
    } else if (color[x] == 2) {
      timeouts.push(setTimeout(fillRed, timeDelay));
      timeDelay += 700;
    } else if (color[x] == 3) {
      timeouts.push(setTimeout(fillYellow, timeDelay));
      timeDelay += 700;
    } else {
      timeouts.push(setTimeout(fillBlue, timeDelay));
      timeDelay += 700;
    };
  };
  timeouts.push(setTimeout(enableButtons, timeDelay));
  console.log(timeouts)
};

function nextRound() {
  // check if player got more than 20 presses right, congratulates the user
  // else call randomColor() which pushes a new random color number into the color array
  // and call playColors();
  if (movesCount > 20) {
    countElement.innerHTML = 'You won! Congrats!'
    timeouts.push(setTimeout(startGame, 1500));
  } else {
    randomColor();
    playColors()
  }
}

function clear() {
  // clear function to remove and resets all back to start
  movesCount = 1;
  movesLeft = 1;
  color = [];
  index = 0;
}

function startGame(){
  // clear the color array, set index to 0, set movesCount and movesLeft to 1
  // check if strict mode is on
  clear();
  nextRound();
  strictBtn.disabled = true;
  startBtn.disabled = true;
}

function reset() {
  // function for reset button when pressed
  // resets whole app and let user choose if he/she wants strict mode on/off this time
  // clear the timeouts
  countElement.innerHTML = '--';
  startBtn.disabled = false;
  strictBtn.disabled = false;
  for (var i in timeouts) {
    clearTimeout(timeouts[i])
  }
  timeouts = [];
}

disableButtons();