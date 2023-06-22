var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var headerElement = document.getElementById('header')
var submitButton = document.getElementById('score')
var submitButtonClick = document.getElementById('submit-btn')
var timerId = 0
var highScoresArray = []
if (localStorage.getItem("userScores")) {
    highScoresArray = JSON.parse(localStorage.getItem("userScores"))
}

var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-btns')

let shuffledQuestions, currentQuestionIndex

submitButtonClick.addEventListener('click', submitScore)
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    headerElement.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    timerId = setInterval(countDown, 1000)

}

function countDown() {
    timerElement.textContent = timeRemaining--
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    if (correct) {
        alert('Correct!')
    } else {
        alert('Wrong...')
        timeRemaining= timeRemaining - 10
    }
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')   
    } else {
        
        clearInterval(timerId)
        submitButton.classList.remove('hide')
        questionContainerElement.classList.add('hide') 
    }  
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function submitScore() {
    var initialsInput = document.getElementById('submit-initials')
    var userScore = {
        initial:initialsInput.value, score:timeRemaining
    }
    highScoresArray.push(userScore)
    localStorage.setItem("userScores", JSON.stringify(highScoresArray))
    alert("check")
}

var questions = [
    {
        question: 'Which of the following HTML elements is used to define a paragraph?',
        answers: [
            {text: '<body>', correct: false},
            {text: '<head>', correct: false},
            {text: '<h1>', correct: false},
            {text: '<p>', correct: true}
        ]
    },
    {
        question: 'Which of the following tags is used to transform text into a bold version?',
        answers: [
            {text: '<blockquote>', correct: false},
            {text: '<em>', corect: false},
            {text: '<loud>', correct: false},
            {text: '<strong>', correct: true}
        ]
    },
    {
        question: 'In JavaScript, what is the type of loop that continues as long as the specified condition remains TRUE?', 
        answers: [
            {text: 'For Loop', correct: false},
            {text: 'While Loop', correct: true},
            {text: 'Conditional Loop', correct: false},
            {text: 'Else Loop', correct: false}
        ]
    },
    {
        question: 'What is a JavaScript element that represents either TRUE or FALSE values?',
        answers: [
            {text: 'Boolean', correct: true},
            {text: 'String', correct: false},
            {text: 'Conditional', correct: false},
            {text: 'Variable', correct: false}
        ]
    },
    {
        question: 'In JavaScript, what element is used to store and manipulate text?',
        answers: [
            {text: 'Arrays', correct: false},
            {text: 'Functions', correct: false},
            {text: 'Variables', correct: false},
            {text: 'Strings', correct: true}
        ]
    },
    {
        question: 'What does the "C" in "CSS" stand for?',
        answers: [
            {text: 'Calculating', correct: false},
            {text: 'Cascading', correct: true},
            {text: 'Crusading', correct: false},
            {text: 'Colorful', correct: false}
        ]
    },
    {
        question: 'What CSS property is used to round the edges of a border?',
        answers: [
            {text: 'Border-Round', correct: false},
            {text: 'Border-Curve', correct: false},
            {text: 'Border-Radius', correct: true},
            {text: 'Border-Percent', correct: false}
        ]
    },
    {
        question: 'What does API stand for?',
        answers: [
            {text: 'Always Program Inside', correct: false},
            {text: 'Actions Prevent Ineptitude', correct: false},
            {text: 'All People Included', correct: false},
            {text: 'Application Programming Interface', correct: true}
        ]
    },
    {
        question: 'What is the name of the CSS design that calls for adaptable elements based on the device resolution or screen size?',
        answers: [
            {text: 'Responsive', correct: true},
            {text: 'Evolving', correct: false},
            {text: 'Shifting', correct: false},
            {text: 'Cascading', correct: false}
        ]
    },
    {
        question: 'What is the name of the stylesheet that defines the presentation of an HTML document?',
        answers: [
            {text: 'PHP', correct: false},
            {text: 'CSS', correct: true},
            {text: 'JavaScript', correct: false},
            {text: 'API', correct: false}
        ]
    }
]

var timeRemaining = questions.length * 10

var timerElement = document.getElementById('timer-text')
