const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];


highScoresList.innerHTML = highScores
  .map((score) => {
    return `<li class="high-score" id="list"">${score.name} - ${score.score}
     
      <div class="final-stats">Questions ${score.total}</div>
      <div class="final-stats">Correct <div class="correct-stats-result">${score.correct}</div></div>
      <div class="final-stats">Wrong <div class="incorrect-stats-result">${score.wrong}</div></div>
      <div class="final-stats">Difficulty <div class="levelResult">${score.difficulty}</div></div>

    </li>`
  })
  .join("");

const del = document.getElementById("delete");
del.addEventListener('click', deleteHighScore);

function deleteHighScore() {
 window.localStorage.clear();
 return window.location.assign("highscores.html");
}



