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

var secondsLeft = 180;

function setTimer() {
  var countdown = setInterval(function() {
    secondsLeft--;
    timeElmt.textContent = secondsLeft + " seconds remaining";

    if(secondsLeft <= 0) {
      clearInterval(countdown);
      alert("Time is up!");
    }

  }, 1000);
}

var questionHead = document.getElementById("questions");
var answerChoices = document.getElementById("answers");
var questionNumber = -1;
var answer;

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
  
  // Evaluates user answer choices and then provides feedback
  if (answer === event.target.textContent) {   
      pElement.innerHTML = `<div class="alert alert-success" role="alert">
      Correct!
    </div>`;
      setTimeout(hideFeedback,1000);
      showFeedback();   
      
  } else {
      pElement.innerHTML = `<div class="alert alert-danger" role="alert">
      Incorrect!
    </div>`;
      setTimeout(hideFeedback,1000);
      secondsLeft = secondsLeft - 10;
      showFeedback();
  }    
  buildQuiz();
});
