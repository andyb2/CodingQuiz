var highscore = 0;
var rdm;
var y;
var mathRdm;
var countdown;
var timeAmount;
var startTimer;
var questionNum;

var questions = [
    {
        question: 'Who invented JavaScript?',
        answers: ['Brendan Eich', 'George Washington', 'Frank Abignale', 'Steve Jobs'],
        correct: 1
    },
    {
        question: 'When was the moon landing?',
        answers: ['1900', '1969', '1980', '1958'],
        correct: 2
    },
    {
        question: 'How far away is the moon from earth',
        answers: ['20,000km', '250,010km', '384,400', '415,146km'],
        correct: 3
    },
    {
        question: 'Einstein was known for what famous equation?',
        answers: ['Gm=tv2', 'Milky Way', '??', 'E=mc2'],
        correct: 4
    },
    {
        question: 'What is my name?',
        answers: ['Beavis', 'Charles', 'Scooter', 'Andrew'],
        correct: 4
    },
]

//
function timer() {
    countdown = document.querySelector("#timeLeft").textContent = timeAmount
    startTimer = setInterval(timerDecrease, 1000)
}

function timerDecrease(decrease = 1) {
    countdown -= decrease
    document.querySelector('#timeLeft').textContent = countdown

    if (countdown < 1) {
        clearInterval(startTimer);
        document.querySelector('#starter').innerHTML = ''
        document.querySelector('#restart').innerHTML = `<button onclick="location = location['href']" id="restart-button" type="button" class="btn btn-primary">Restart Quiz!</button>`
        document.querySelector('.timer').innerHTML = `<h3>You're out of time! Try again.<h3><br>Score: ${highscore}/5`
        getName();
        if (countdown < 10) {
            timerBelowTen()
        }
    }
}

function timerBelowTen() {
    if (number === y.correct) {
        userAns()
    } else {
        countdown = 0
    }
    getName();
}

function restartQuiz() {
    onClick = "location = location['href']"
    document.querySelector('#starter').innerHTML = `<div id="start-button"></div>`
    startQuiz()
}

function startQuiz() {
    document.querySelector('.timer').classList.remove('d-none')
    timeAmount = 60
    document.querySelector('#start-button').innerHTML = ''
    timer();
    nextQuest();
}

// randomize questions each time a new quiz starts
function nextQuest() {
    mathRdm = Math.floor(Math.random() * questions.length)
    y = questions[mathRdm]
    rdm = mathRdm
    document.querySelector('#starter').innerHTML =
        `<div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${y.question}</h5>
                <div class="row my-2">
                    <button onclick="userAns(1)" class="btn btn-primary">${y.answers[0]}</button>
                </div>
                <div class="row my-2">
                    <button onclick="userAns(2)" class="btn btn-primary">${y.answers[1]}</button>
                </div>
                <div class="row my-2">
                    <button onclick="userAns(3)" class="btn btn-primary">${y.answers[2]}</button>
                </div>
                <div class="row my-2">
                    <button onclick="userAns(4)" class="btn btn-primary">${y.answers[3]}</button>
                </div>
            </div>
        </div>`

    return mathRdm
}

function userAns(number) {
    if (number === y.correct) {
        highscore++

    } else {
        timerDecrease(10);
    }

    if (questions.length === 1) {

        if (number === y.correct) {
            document.querySelector('#starter').innerHTML = `<h1 class="text-center" id="yourScore">Your score was:</h1> <h4 class="text-center">${highscore}/5</h4>`
            document.querySelector('.timer').innerHTML = ''
            clearInterval(startTimer);
            getName();
        } else {
            document.querySelector('#starter').innerHTML = `<h1 class="text-center" id="yourScore">Your score was:</h1> <h4 class="text-center">${highscore}/5</h4>`
            document.querySelector('.timer').innerHTML = ''
            clearInterval(startTimer);
            getName();
        }
    }
    if (mathRdm === rdm) {
        questions.splice(mathRdm, 1)
        nextQuest();
    }
}

function getName() {
    document.querySelector('#enterName').innerHTML =
        `
        <div class="col-sm-10">
            <input type="text" readonly class="form-control-plaintext" id="scorePrompt"><h3>Enter your name to save your score!</h3></input>
         </div>
    </div>
    <div class="mb-3 row">
        <label for="scoreCardName" class="col-sm-10 col-form-label">Name:</label>
        <div class="col-sm-10">
            <input type="textarea" class="form-control" id="nameInput">
        </div>
    </div>
    <div class="row">
        <div class="column">
            <button type="button" onclick="scorePage(); clearPageScores();" class="btn btn-primary">Submit</button>
        </div>
    </div>
    `
}

function clearPageScores() {
    document.querySelector('#enterName').innerHTML = ''
}

function scorePage() {
    var nameSave = document.querySelector('#nameInput').value
    var scoringInfo = JSON.parse(window.localStorage.getItem("Name/Score")) || [];
    var olEl = document.createElement("ol");
    var storedInfo = {
        nameSave: nameSave,
        highscore: highscore
    }

    if (nameSave === '') {
        scorePage();
    } 

        scoringInfo.push(storedInfo)
        localStorage.setItem('Name/Score', JSON.stringify(scoringInfo));
        document.querySelector('.d-none').classList.remove('d-none')
        document.querySelector('#savedScore').append(olEl)
        scoringInfo.forEach(function (score) {
            // create li tag for each high score
            var liTag = document.createElement("li");
            liTag.textContent = score.nameSave + " you scored " + score.highscore + '/5';

            // display on page

            olEl.appendChild(liTag);
        });
}
