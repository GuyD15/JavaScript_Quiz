function printHighscores() {
  // either get scores from localstorage or set to empty array
  var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

  // sort highscores by score property in descending order HINT: the sort method. 
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  var highscoresList = document.getElementById('highscores');

  highscoresList.innerHTML = '';

  for (var i = 0; i < highscores.length; i++) {
    // create li tag for each high score
    var liTag = document.createElement('li');
    liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;

    highscoresList.appendChild(liTag);

    // display on page
    var olEl = document.getElementById('');
    olEl.appendChild(liTag);
  }
}

function clearHighscores() {
  window.localStorage.removeItem('highscores');
  window.location.reload();
}

document.getElementById('clear').onclick = clearHighscores;

// run function when page loads
printHighscores();
