// Let with array and object for questions 
let questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        answer: "3. parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        answer: "3. quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["1. Javascript", "2. terminal / bash", "3. for loops", "4. console log"],
        answer: "4. console log"
    },

];
// Declared variables
let score = 0;
let questionIndex = 0;

// Start working code 
// Declared variables
let currentTime = document.querySelector("#currentTime");
let timer = document.querySelector("#startTime");
let questionsDiv = document.querySelector("#questionsDiv");
let wrapper = document.querySelector("#wrapper");

// Shows the seconds left is 15 seconds per question:
let secondsLeft = 76;
// Holds interval time
let holdInterval = 0;
// Holds penalty time
let penalty = 10;
// Creates new element
let ulCreate = document.createElement("ul");

// Added to trigger timer on button, then shows user a display on the screen
timer.addEventListener("click", function () {
    // Checking zero because it's initially set to zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

