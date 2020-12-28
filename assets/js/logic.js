// For questions and choices
var questionHead = document.getElementById("questions");
var answerChoices = document.getElementById("answers");
// For some reason it keeps skipping the first question, so I set this variable to -2 so that the index starts at 0 (see buildQuiz function below)
var questionNumber = -2;
var answer;
// Empty variable for storing count of correct answers
var points = 0;
// Text input for high scoreboard
var finalScoreElement = document.getElementById("final-score");
var userInitials;
var submitScoreElement = document.querySelector("#end-screen");
var startBtn = document.getElementById("startBtn");
var submitBtn = document.querySelector("button.submitBtn")
// For countdown timer
var timeElmt = document.getElementById("time")
var secondsLeft = 150;

function startTimer() {
 
  document.getElementById("start-screen").classList.add('hidden');
  document.getElementById("quiz").classList.remove('hidden');

  // Set timer
  setTimer();

  // Display questions
  buildQuiz();
}

function setTimer() {
  var countdown = setInterval(function() {
    secondsLeft--;
    timeElmt.textContent = secondsLeft + " seconds remaining";

    if (secondsLeft <= 0 || questionNumber === questions.length) {
      clearInterval(countdown);
      setTimeout(displayScore, 500);
  }
}, 1000);
}

// Function for displaying quiz questions and choices
function buildQuiz() {
  questionNumber++;
  answer = questions[questionNumber].answer

  questionHead.textContent = questions[questionNumber].title;
  answerChoices.innerHTML = "";

  var choices = questions[questionNumber].choices;

  for (var q = 0; q < choices.length; q++) {
      var nextChoice = document.createElement("button");

      nextChoice.textContent = choices[q]
      answerBtn = answerChoices.appendChild(nextChoice).setAttribute("class", "p-3 m-1 btn btn-light btn-block");
  }
}

// Hide feedback alerts until user selects ananswer
function hideFeedback(){
  var pElement = document.getElementsByClassName("feedback")[0]
  pElement.style.display='none'
}

function showFeedback(){
  var pElement = document.getElementsByClassName("feedback")[0]
  pElement.removeAttribute('style');
}

answerChoices.addEventListener("click", function (event) {
  var pElement = document.getElementsByClassName("feedback")[0]
  
  // Evaluates user answer choices and then provides feedback and adds correct answers to score

  if (answer === event.target.textContent) {   
      pElement.innerHTML = `<div class="alert alert-success" role="alert">
      Correct!
    </div>`;
      setTimeout(hideFeedback,1000);
      showFeedback();
      points++;   
      
  } else {
      pElement.innerHTML = `<div class="alert alert-danger" role="alert">
      Incorrect!
    </div>`;
      setTimeout(hideFeedback,1000);
      secondsLeft = secondsLeft - 30;
      showFeedback();
  }    
  buildQuiz();
});

// Display final score
function displayScore() {
  document.getElementById("quiz").classList.add('hidden');
  document.getElementById("end-screen").classList.remove('hidden');
  finalScoreElement.textContent = points;
}

// Event listeners for buttons
startBtn.addEventListener("click", startTimer);
submitBtn.addEventListener("click", function (event) {
  event.stopPropagation();
  addScore();
  
  window.location.href = './highscores.html'
});

// Store quiz scores locally
function addScore () {
  userInitials = document.getElementById("initials").value
  
  // create a new object with name and score keys
var newScore = {
      name: userInitials,
      score: points
  };
  // check if there are scores in local storage first and take value
  //if not, make a blank array
  var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
  // push object into score array
  highScores.push(newScore)
  // turn objects into an array of strings + put it into local storage
  localStorage.setItem("highScores", JSON.stringify(highScores));
}
