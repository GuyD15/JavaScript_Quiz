// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = 60;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');

function startQuiz() {
  var startScreenEl = document.getElementById('start-screen');
  startScreenEl.classList.add('hide');

  questionsEl.classList.remove('hide');

  timerId = setInterval(clockTick, 1000);

  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  var titleEl = document.getElementById('question-title');
  titleEl.textContent = currentQuestion.title;

  choicesEl.innerHTML = '';

  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);
    choiceNode.textContent = i + 1 + '. ' + choice;

    choicesEl.appendChild(choiceNode);
  }
}

function questionClick(event) {
  var buttonEl = event.target;

  if (!buttonEl.matches('.choice')) {
    return;
  }

  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    time -= 10;
    timerEl.textContent = time;

    feedbackEl.textContent = 'Wrong!';
    feedbackEl.setAttribute('class', 'feedback wrong');
    setTimeout(function () {
      feedbackEl.textContent = '';
      feedbackEl.removeAttribute('class');
    }, 500);
  } else {
    feedbackEl.textContent = 'Correct!';
    feedbackEl.setAttribute('class', 'feedback correct');
    setTimeout(function () {
      feedbackEl.textContent = '';
      feedbackEl.removeAttribute('class');
    }, 500);
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length || time <= 0) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);

  questionsEl.classList.add('hide');

  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.classList.remove('hide');

  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;

  saveHighscore();
}

function clockTick() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore(event) {
  
  var initialsInput = document.getElementById('initials');
  var initials = initialsInput.value.trim();

  if (initials !== '') {
    var highscores = JSON.parse(localStorage.getItem('highscores')) || [];

    var newScore = {
      score: time,
      initials: initials,
    };

    highscores.push(newScore);
    localStorage.setItem('highscores', JSON.stringify(highscores));
    console.log('Updated highscores:', highscores);

    window.location.href = 'highscores.html';
  }
}


function checkForEnter(event) {
  if (event.key === 'Enter') {
    saveHighscore(event);
  }
}

submitBtn.addEventListener('click', function(event) {
  event.preventDefault();
  saveHighscore();
});
initialsEl.addEventListener('keyup', checkForEnter);
startBtn.addEventListener('click', startQuiz);
choicesEl.addEventListener('click', questionClick);

