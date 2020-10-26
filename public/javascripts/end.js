const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const finalStats = document.getElementById("finalStats");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const mostRecentStats = JSON.parse(window.localStorage.getItem("stats"));
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 300;

finalScore.innerText = mostRecentScore;
console.log(mostRecentStats);

finalStats.innerHTML =
  '<div class="final-stats">Questions<div class="question-stats-result">' +
  mostRecentStats.total +
  '<div class="final-stats">&#47;10</div>' +
  "</div></div>" +
  '<div class="final-stats">&#40;correct<div class="correct-stats-result">' +
  mostRecentStats.correct +
  "</div></div>" +
  '<div class="final-stats">&#44;&nbsp;incorrect<div class="incorrect-stats-result">' +
  mostRecentStats.wrong +
  '<div class="final-stats">&#41;</div>' +
  "</div></div>" +
  '<div class="level">Difficulty&nbsp;<div class="levelResult">' +
  mostRecentStats.difficulty +
  "</div></div>";
username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value,
  };

  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(10);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("highscores.html");
};
