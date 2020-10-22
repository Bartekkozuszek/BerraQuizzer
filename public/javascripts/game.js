let score = 0;

var multipleElements = document.getElementById('gameMenu');
for (var i=0; i<multipleElements.length; i+=1){
    multipleElements[i].style.display = 'none';
}

multipleElements.style.display = 'none';


var btnEasy = document.getElementById('btnEasy');
btnEasy.addEventListener('click', nextItemEasy);
btnEasy.addEventListener('click', showGameMenu);

var btnMedium = document.getElementById('btnMedium');
btnMedium.addEventListener('click', nextItemMedium);
btnMedium.addEventListener('click', showGameMenu);

var btnHard = document.getElementById('btnHard');
btnHard.addEventListener('click', nextItemHard);
btnHard.addEventListener('click', showGameMenu);


function showGameMenu() {
    multipleElements.style.display = 'inline-flex';
    for (var i=0; i<multipleElements.length; i+=1){
        multipleElements[i].style.display = 'block';
    }

}

const CORRECT_BONUS = 10;
const CORRECT_MEDIUM = 20;
const CORRECT_HARD = 30;


var answers = {
    'correct': 0
    , 'wrong': 0
    , 'total': 0
};
var output = document.getElementById('output');
var selAnswer = document.getElementById('selAnswers');
var selIncorrect = document.getElementById('selIncorrect');
var selCorrect = document.getElementById('selCorrect');


function nextItemEasy() {
    document.getElementById('catContainer').style.display='none';
    var urlEasy = 'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple';
    var html = '<div></div>';
    var btn = document.getElementById('btn');
    btn.addEventListener('click', nextItemEasy);
    btn.style.display = 'none';

    requestAJAX(urlEasy, function (data) {
        console.log(data.results[0]);
        var obj = data.results[0];
        html += '<div><div class="flex-center" id="cat"><h3>' + obj.category + '</h3></div>';
        html += '<div><div class="flex-center" id="diff"><h3>' + obj.difficulty + '</h3></div>';
        html += '<div class="flex-center" id="que"><p>' + obj.question + '</p></div>';
        html += '</div>';
        output.innerHTML = html;
        questionHandler(obj.correct_answer, obj.incorrect_answers)
    })
}

function nextItemMedium() {
    btn.style.display = 'none';
    document.getElementById('catContainer').style.display='none';
    var urlMedium = 'https://opentdb.com/api.php?amount=50&difficulty=medium&type=multiple';
    var html = '<div></div>';
    btn.addEventListener('click', nextItemMedium);


    requestAJAX(urlMedium, function (data) {
        console.log(data.results[0]);
        var obj = data.results[0];
        html += '<div><div class="flex-center" id="cat">' + obj.category + '</div>';
        html += '<div><div class="flex-center" id="diff"><h3>' + obj.difficulty + '</h3></div>';
        html += '<div class="flex-center" id="que">' + obj.question + '</div>';
        html += '</div>';
        output.innerHTML = html;
        questionHandler(obj.correct_answer, obj.incorrect_answers)
    })
}

function nextItemHard() {
    btn.style.display = 'none';
    document.getElementById('catContainer').style.display='none';
    var urlHard = 'https://opentdb.com/api.php?amount=50&difficulty=hard&type=multiple';
    var html = '<div></div>';
    btn.addEventListener('click', nextItemHard);


    requestAJAX(urlHard, function (data) {
        console.log(data.results[0]);
        var obj = data.results[0];
        html += '<div><div class="flex-center" id="cat">' + obj.category + '</div>';
        html += '<div><div class="flex-center" id="diff"><h3>' + obj.difficulty + '</h3></div>';
        html += '<div class="flex-center" id="que">' + obj.question + '</div>';
        html += '</div>';
        output.innerHTML = html;
        questionHandler(obj.correct_answer, obj.incorrect_answers)
    })
}

function correctAnswerIs() {
    var els = document.querySelectorAll('#selAnswers a');
    for (i = 0; i < els.length; i++) {
        if (els[i].getAttribute('data-cor') == "true") {
            return els[i].innerText
        }
    }
}


function sendAnswer() {
    var res = event.target.getAttribute('data-cor');
    var corectAnswerValue = correctAnswerIs();

    btn.style.display = 'inline-block'
    if (res == 'true') {
        answers.correct++;
        answers.total++;
        selCorrect.innerHTML = 'You answered ' + ' "' + corectAnswerValue + '" ' + ' which is the correct answer!';
        selAnswer.innerHTML = '';

        if (document.getElementById('diff').innerText === 'medium') {
            incrementPoints(CORRECT_MEDIUM);
        } else if (document.getElementById('diff').innerText === 'hard') {
            incrementPoints(CORRECT_HARD)
        } else {
            incrementPoints(CORRECT_BONUS);
        }

        document.getElementById('score').innerHTML = score;

    } else {
        answers.wrong++;
        answers.total++;
        selIncorrect.innerHTML = 'Wrong, correct answer should be ' + ' "'  + corectAnswerValue + '".' ;
        selAnswer.innerHTML = '';
    }
    document.getElementById('stats').innerHTML = ' Question ' + answers.total + '/10' + ' (correct ' + answers.correct + ',' + ' incorrect ' + answers.wrong + ')';


    if (answers.total === 10) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html");

    }
}

function questionHandler(cor, incor) {
    var holder = incor;
    holder.push(cor);
    holder.sort();
    selAnswer.innerHTML = '';
    selIncorrect.innerHTML = '';
    selCorrect.innerHTML = '';
    for (var i = 0; i < holder.length; i++) {
        var el = document.createElement('a');
        var checker = holder[i] == cor ? true : false;
        el.setAttribute('data-cor', checker);
        el.innerHTML = holder[i];
        el.addEventListener('click', sendAnswer);
        selAnswer.appendChild(el);

    }
}

function requestAJAX(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(JSON.parse(xhr.responseText))
        }
    }

    xhr.open('GET', url, true);
    xhr.send();
}

incrementPoints = num => {
    score += num;
    score.innerText = score;
};
