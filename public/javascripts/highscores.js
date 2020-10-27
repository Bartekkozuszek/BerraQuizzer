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

let correctArr = [];
let wrongArr = [];
let scoreArr = [];


for(let item in highScores){
    correctArr.push(`${highScores[item].correct}`);
}

for(let item in highScores){
    wrongArr.push(`${highScores[item].wrong}`);
}

for(let item in highScores){
    scoreArr.push(`${highScores[item].score}`);
}

Chart.defaults.global.Color = "white",

new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
        id: "yAxisID",
        labels: [1,5,10,15,30,50,100,150,200,300],
        datasets: [{
            data: scoreArr,
            label: "Score",
            borderColor: "#18decd",
            fill: false
        }, {
            data: correctArr,
            label: "Correct Answers",
            borderColor: "#18de60",
            fill: false
        }, {
            data: wrongArr,
            label: "Wrong Answers",
            borderColor: "#de184d",
            fill: false
        }
        ]
    },
    options: {
        legend: {
            labels: {
                fontColor: "#a7abb5",
                fontSize: 16
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "#a7abb5",
                    stepSize: 10,
                    beginAtZero: true
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "#a7abb5",
                    stepSize: 10,
                    beginAtZero: true
                }
            }]
        }
    }
});







/*const use = document.getElementById("highScoresList");
use.addEventListener('click', displayStats);*/

/*function displayStats() {
    Object.keys(highScores).forEach(item =>
        console.log(`${highScores[item].name}`));



   let item = document.getElementById("hidden-stats");
   item.style.display = "inline-flex";
}*/


