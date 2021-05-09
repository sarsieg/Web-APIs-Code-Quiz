// Let with array and object for questions 
var questions = [
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
var score = 0;
var questionIndex = 0;

// Start working code 
// Declared variables
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

// Shows the seconds left is 15 seconds per question:
var secondsLeft = 76;
// Holds interval time
var holdInterval = 0;
// Holds penalty time
var penalty = 10;
// Creates new element
var ulCreate = document.createElement("ul");

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
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Added event to compare users choices with the correct answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
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
     var createH1 = document.createElement("h1");
     createH1.setAttribute("id", "createH1");
     createH1.textContent = "All Done!"
 
     questionsDiv.appendChild(createH1);

     // Paragraph
     var createP = document.createElement("p");
     createP.setAttribute("id", "createP");
 
     questionsDiv.appendChild(createP); 

     // Added if statement to calculate the time remaining then replace it with their score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }
 // Added label to enter in initials after score is taken 
 var createLabel = document.createElement("label");
 createLabel.setAttribute("id", "createLabel");
 createLabel.textContent = "Enter your initials: ";

 questionsDiv.appendChild(createLabel);

  // Added input 
  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  questionsDiv.appendChild(createInput);

  // Added submit
  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";

  questionsDiv.appendChild(createSubmit);

 // Event listener to capture initials and local storage for initials and score
 createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    if (initials === null) {

        console.log("No value entered!");

    } else {
        var finalScore = {
            initials: initials,
            score: timeRemaining
        }
        console.log(finalScore);
        var allScores = localStorage.getItem("allScores");
        if (allScores === null) {
            allScores = [];
        } else {
            allScores = JSON.parse(allScores);
        }
        allScores.push(finalScore);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);
        // Travels to final page
        window.location.replace("./highscores.html");
    }
});

} 

