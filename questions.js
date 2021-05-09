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

// Renders questions and choices to page: 
function render(questionIndex) {
    // Clears the existing data when prompted
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // Added for loops to loop through all info in array
    for (let i = 0; i < questions.length; i++) {
        // Appends question title only
        let userQuestion = questions[questionIndex].title;
        let userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        let listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Added event to compare users choices with the correct answer
function compare(event) {
    let element = event.target;

    if (element.matches("li")) {

        let createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Added function if answer is correct to prompt a message and confirm the correct answer next to it
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // Correct condition 
        } else {
            // Added function if answer is incorrect to prompt a message and reveal the correct answer next to it
            // Added penalty to deduct -5 seconds off secondsLeft count down for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
     // Added question index to determine the number question the user is on
     questionIndex++;
// Added if else statement to show last page with the user stats once all questions have been answered
     if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
//Added allDone function to append last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

// Heading:
     let createH1 = document.createElement("h1");
     createH1.setAttribute("id", "createH1");
     createH1.textContent = "All Done!"
 
     questionsDiv.appendChild(createH1);