var correct = 0;
var quizList = [];
var sumAnswer;
var quiz;
var number1;
var number2;
var mode;
var timeLeft = 60;
var timer = document.getElementById("timer");
var start = document.getElementById("startScreen");
var play = document.getElementById("gameOver");
var reset = document.getElementById("reset")

// game over screen when time is up
function countdown() {
    if (timeLeft == 0) {
        document.getElementById("modeName").innerHTML = "Game Over"
        document.getElementById("gameOver").innerHTML = "You got " + correct + " correct, with an acuracy of " + Math.round(100 * (correct / quizList.length)) + "%." + "<br>" + quiz;
        timer.innerHTML = "";
    }

    else {
        timer.innerHTML = "Time :" + timeLeft + "s";
        timeLeft--;
    }
}
// Hides start screen
document.getElementById("start").onclick = function () {

    if (start.style.display === "none") {
        start.style.display = "block";
    } else {
        start.style.display = "none";
        play.style.display = "block";
        reset.style.display = "inline";
    }

    setInterval("countdown()", 1000);
    mathTest();
}

//sets values for operrands and operator
function mathTest() {

    number1 = Math.floor(Math.random() * 12)+1;
    number2 = Math.floor(Math.random() * 12)+1;
    var diviNum = number1 * number2;
    document.getElementById("numberA").innerHTML = number1;
    document.getElementById("numberB").innerHTML = number2;


    mode = document.getElementById("modeSelect").value;

    //Selects mode from dropdown menu
    switch (mode) {
        case "add":
            sumAnswer = number1 + number2;
            document.getElementById("opSelect").innerHTML = "+";
            document.getElementById("opSelect").value = "+";
            document.getElementById("modeName").innerHTML = "Addition";

            break;

        case "sub":
            sumAnswer = number1 - number2;
            document.getElementById("opSelect").innerHTML = "-";
            document.getElementById("opSelect").value = "-";
            document.getElementById("modeName").innerHTML = "Subtraction";

            break;

        case "mul":
            sumAnswer = number1 * number2;
            document.getElementById("opSelect").innerHTML = "&times;";
            document.getElementById("opSelect").value = "&times;";
            document.getElementById("modeName").innerHTML = "Multiplication";

            break;

        case "divi":
            document.getElementById("numberA").innerHTML = diviNum;
            sumAnswer = diviNum / number2;
            document.getElementById("opSelect").innerHTML = "&divide;";
            document.getElementById("opSelect").value = "&divide;";
            document.getElementById("modeName").innerHTML = "Division";

            break;

        default: sumAnswer = number1 + number2;
            break;
    };

}

//checks the input and stores question for feedback
function check() {

    var ops = document.getElementById("opSelect").value;
    var response = document.getElementById("inputA").value;
    var may = Boolean(response == sumAnswer);
    var ans;

    if (response == NaN) {
        response = 0
    }

    function solution() {

        if (may == true) {
            ans = "&#10004;";
        }

        else {
            ans = "&#10008;" + " Correct answer was " + sumAnswer;
        }

        quiz = "";

        //stores the math question into an array
        quizList.unshift(number1 + " " + ops + " " + number2 + " = " + response + " " + ans);

        //displays a list of the previous questions on the page 
        for (q = 0; q < quizList.length; q++) {
            quiz += quizList[q] + "<br>";
        }
        //document.getElementById("quizQuestion").innerHTML = quiz;
    };

    //check if response is correct 
    if (response == sumAnswer) {
        correct++;
        //makes input blank after clicking next
        document.getElementById("inputA").value = "";
    }
    else {
        //makes input blank after clicking next
        document.getElementById("inputA").value = "";
    };

    document.getElementById("score").innerHTML = "Correct :" + correct;
    solution();
    mathTest();

}

//allows use of return key to enter input
var inputEnter = document.getElementById("inputA");

inputEnter.addEventListener("keyup", nextClick);

function nextClick(event) {

    if (event.keyCode === 13) {
        document.getElementById("next").click();
    }

};
