function printHighscores() {
  // either get scores from localstorage or set to empty array
  var highscores = JSON.parse(localStorage.getItem('highscores')) || [];
  var highscoresList = document.querySelector('#highscores');
  // sort highscores by score property in descending order HINT: the sort method. 

  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  highscoresList.innerHTML = '';

  for (var i = 0; i < highscores.length; i++) {
    // create li tag for each high score
    var liTag = document.createElement('li');
    liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;

    highscoresList.appendChild(liTag);

    // display on page
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
