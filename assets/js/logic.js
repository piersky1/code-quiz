function startTimer() {
 
  document.getElementById("start-screen").classList.add('hidden');
  document.getElementById("quiz").classList.remove('hidden');

  // Set timer
  setTimer();

  // Display questions
  buildQuiz();
}

// Start timer countdown
var timeElmt = document.getElementById("time")

var secondsLeft = 150;

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

var questionHead = document.getElementById("questions");
var answerChoices = document.getElementById("answers");
var questionNumber = -1;
var answer;

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

// Variable for storing count of correct answers
var score = 0;

answerChoices.addEventListener("click", function (event) {
  var pElement = document.getElementsByClassName("feedback")[0]
  
  // Evaluates user answer choices and then provides feedback and adds correct answers to score

  if (answer === event.target.textContent) {   
      pElement.innerHTML = `<div class="alert alert-success" role="alert">
      Correct!
    </div>`;
      setTimeout(hideFeedback,1000);
      showFeedback();
      score++;   
      
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

// display option to enter name to scoreboard
var finalScoreElement = document.getElementById("final-score");

function displayScore() {
  document.getElementById("quiz").classList.add('hidden');
  document.getElementById("end-screen").classList.remove('hidden');
  finalScoreElement.textContent = score + " out of 5";
}
