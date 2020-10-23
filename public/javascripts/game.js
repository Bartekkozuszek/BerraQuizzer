let score = 0;

var multipleElements = document.getElementById("gameMenu");
for (var i = 0; i < multipleElements.length; i += 1) {
  multipleElements[i].style.display = "none";
}

multipleElements.style.display = "none";

let urlEasy =
  "https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple";
let urlMedium =
  "https://opentdb.com/api.php?amount=50&difficulty=medium&type=multiple";
let urlHard =
  "https://opentdb.com/api.php?amount=50&difficulty=hard&type=multiple";

var btnEasy = document.getElementById("btnEasy");
btnEasy.addEventListener("click", nextItem);
btnEasy.addEventListener("click", showGameMenu);

var btnMedium = document.getElementById("btnMedium");
btnMedium.addEventListener("click", nextItem);
btnMedium.addEventListener("click", showGameMenu);

var btnHard = document.getElementById("btnHard");
btnHard.addEventListener("click", nextItem);
btnHard.addEventListener("click", showGameMenu);

function showGameMenu() {
  multipleElements.style.display = "inline-flex";
  for (var i = 0; i < multipleElements.length; i += 1) {
    multipleElements[i].style.display = "block";
  }
}

const CORRECT_BONUS = 10;
const CORRECT_MEDIUM = 20;
const CORRECT_HARD = 30;

var stats = {
  correct: 0,
  wrong: 0,
  total: 0,
};
var output = document.getElementById("output");
var selAnswer = document.getElementById("selAnswers");
var selIncorrect = document.getElementById("selIncorrect");
var selCorrect = document.getElementById("selCorrect");

function nextItem() {
  document.getElementById("catContainer").style.display = "none";
  var html = "<div></div>";
  var btn = document.getElementById("btn");
  btn.addEventListener("click", nextItem);
  btn.style.display = "none";

  requestAJAX(urlDiff, function (data) {
    console.log(data.results[0]);
    var obj = data.results[0];
    html +=
      '<div><div class="flex-center" id="cat"><h3>' +
      obj.category +
      "</h3></div>";
    html +=
      '<div><div class="flex-center"><h3 id="diff">' +
      obj.difficulty +
      "</h3></div>";
    html +=
      '<div class="flex-center" id="que"><p>' + obj.question + "</p></div>";
    html += "</div>";
    output.innerHTML = html;
    questionHandler(obj.correct_answer, obj.incorrect_answers);
  });
}

function correctAnswerIs() {
  var els = document.querySelectorAll("#selAnswers a");
  for (i = 0; i < els.length; i++) {
    if (els[i].getAttribute("data-cor") == "true") {
      return els[i].innerText;
    }
  }
}

function sendAnswer() {
  var res = event.target.getAttribute("data-cor");
  var corectAnswerValue = correctAnswerIs();

  btn.style.display = "inline-block";
  if (res == "true") {
    stats.correct++;
    stats.total++;
    selCorrect.innerHTML =
      "You answered " +
      ' "' +
      corectAnswerValue +
      '" ' +
      " which is the correct answer!";
    selAnswer.innerHTML = "";

    if (document.getElementById("diff").textContent === "medium") {
      incrementPoints(CORRECT_MEDIUM);
    } else if (document.getElementById("diff").textContent === "hard") {
      incrementPoints(CORRECT_HARD);
    } else {
      incrementPoints(CORRECT_BONUS);
    }

    document.getElementById("score").innerHTML = score;
  } else {
    stats.wrong++;
    stats.total++;
    selIncorrect.innerHTML =
      "Wrong, correct answer should be " + ' "' + corectAnswerValue + '".';
    selAnswer.innerHTML = "";
  }
  document.getElementById("stats").innerHTML =
    " Question " +
    stats.total +
    "/10" +
    " (correct " +
    stats.correct +
    "," +
    " incorrect " +
    stats.wrong +
    ")";

  if (stats.total === 10) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html");
  }
}

function questionHandler(cor, incor) {
  var holder = incor;
  holder.push(cor);
  holder.sort();
  selAnswer.innerHTML = "";
  selIncorrect.innerHTML = "";
  selCorrect.innerHTML = "";
  for (var i = 0; i < holder.length; i++) {
    var el = document.createElement("a");
    var checker = holder[i] == cor ? true : false;
    el.setAttribute("data-cor", checker);
    el.innerHTML = holder[i];
    el.addEventListener("click", sendAnswer);
    selAnswer.appendChild(el);
  }
}

function requestAJAX(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };

  xhr.open("GET", url, true);
  xhr.send();
}

incrementPoints = (num) => {
  score += num;
  score.innerText = score;
};
