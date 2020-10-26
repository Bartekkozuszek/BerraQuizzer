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
    " Question " +
    mostRecentStats.total +
    "/10" +
    " (correct " +
    mostRecentStats.correct +
    "," +
    " incorrect " +
    mostRecentStats.wrong +
    ") "
    + '<div class="level">Level&nbsp<div class="levelResult">'+
    mostRecentStats.difficulty +
    "</div></div>";
;

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

