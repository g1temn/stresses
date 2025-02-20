import { answers, words } from '../words.js'

//stopwatch
const stopwatchDisplay = document.querySelector('#stopwatch-display')

let hours = 0
let minutes = 0 
let seconds = 0

function updateStopwatch() {
    seconds++
    if(seconds == 60) {
        seconds = 0
        minutes++
    }
    if(minutes == 60) {
        seconds = 0
        minutes = 0
        hours ++
    }
    let displayedHours = hours.toString().padEnd(2, 0)
    let displayedMinutes = minutes.toString().padStart(2, 0)
    let displayedSeconds = seconds.toString().padStart(2, 0)
    stopwatchDisplay.innerHTML = `${displayedHours}:${displayedMinutes}:${displayedSeconds}`
}

let stopwatch = setInterval(updateStopwatch, 1000)

//programm itself
const toNextButtons = document.querySelectorAll('.to-next-button')

const toRightButton = document.querySelector('#to-right-button')
const toWrongButton = document.querySelector('#to-wrong-button')

const displayedWord = document.querySelector('#displayed-word')

const counterDisplay = document.querySelector('#counter-display')

const counterDisplayForRightAnswers = document.querySelector('#specific-counter-display-for-right-answers')
const counterDisplayForWrongAnswers = document.querySelector('#specific-counter-display-for-wrong-answers')

const finalStatisticsWindow = document.querySelector('#fianl-statistics-window')

let index = 0

let isAnswerShowed = false

let numberOfRightAnswers = 0
let numberOfWrongAnswers = 0

let checkedWords = 0

let isStatisticsShowed = false

const numberOfRightAnswersDisplay = document.querySelector('#number-of-right-answers-display')
const numberOfWrongAnswersDisplay = document.querySelector('#number-of-wrong-answers-display')

const correctRectangle = document.querySelector('#correct-rectangle')
const incorrectRectangle = document.querySelector('#incorrect-rectangle')

const rightPercentageDisplay = document.querySelector('#right-percentage-display')

const exitButton = document.querySelector('#exit-button')
const restartButton = document.querySelector('#restart-button')

let rightAnswers = []
let wrongAnswers = []

let statisticsSFX = new Audio()
statisticsSFX.src = './sfx/statistics appearing.wav'

let messageOptions = ['Вітаю! Ви успішно склали тест!', 
                      'Ви добре впорались!',
                      'Бро, тєбє нада трєніроватса...']

const congratulationsContainerDisplay = document.querySelector('#congratulations-container')

function showStatistics() {
    //calculate right coefficient
    let rightCoef = (numberOfRightAnswers / checkedWords).toFixed(1)
    if(index + 1 > words.length) {
        isStatisticsShowed = true
        //play sound
        playSound(statisticsSFX)
        //pick message
        if(rightCoef >= 0.7) {
            congratulationsContainerDisplay.innerHTML = messageOptions[0]
        }
        else if(rightCoef > 0.3 && rightCoef < 0.7) {
            congratulationsContainerDisplay.innerHTML = messageOptions[1]
        } else {
            congratulationsContainerDisplay.innerHTML = messageOptions[2]
        }
        // change rect`s style if it`s 100%
        if(rightCoef == 1) {
            correctRectangle.style.borderRadius = '1rem 1rem 1rem 1rem'
        } else if(rightCoef == 0) {
            incorrectRectangle.style.borderRadius = '1rem 1rem 1rem 1rem'
        }
        //show fianl statistics window
        finalStatisticsWindow.style.display = 'flex'
        //show right/wrong number
        numberOfRightAnswersDisplay.innerHTML = `Правильні: ${numberOfRightAnswers}`
        numberOfWrongAnswersDisplay.innerHTML = `Неправильні: ${numberOfWrongAnswers}`
        //calculate width of the rect
        correctRectangle.style.width = `${rightCoef * 100}%`
        incorrectRectangle.style.width = `${(1 - rightCoef) * 100}%`
        //show percentage of rigth answers
        rightPercentageDisplay.innerHTML = `${rightCoef * 100}%`
    }
}

function playSound(sound) {
    sound.play()
    sound.volume = 0.3
}

const emphasizedAnswers = answers.map(answer => {
    return answer.replace(/[А-ЯҐЄІЇ]/g, match => `<span id='emphasized'>${match}</span>`)
})

toRightButton.addEventListener('click', () => {
    numberOfRightAnswers++
    counterDisplayForRightAnswers.innerHTML = numberOfRightAnswers
})
toWrongButton.addEventListener('click', () => {
    numberOfWrongAnswers++
    counterDisplayForWrongAnswers.innerHTML = numberOfWrongAnswers
})

function showDisplayedWord(i, array) {
    displayedWord.innerHTML = array[i]
    counterDisplay.innerHTML = `${index + 1}/${words.length}`
    checkedWords++
}

showDisplayedWord(index, words)

toNextButtons.forEach(button => {
    button.addEventListener('click', changeWord)
})

function changeWord() {
    index++
    showStatistics()
    showDisplayedWord(index, words)
    isAnswerShowed = false
}

function changeDisplayedWord() {
    if(!isAnswerShowed) {
        showDisplayedWord(index, emphasizedAnswers)
    } else {
        showDisplayedWord(index, words)
    }
    isAnswerShowed = !isAnswerShowed
}

displayedWord.addEventListener('click', changeDisplayedWord)

restartButton.addEventListener('click', () => {
    location.reload()
})

window.addEventListener('keyup', function(event) {
    if(!isStatisticsShowed) {
        if(event.key == '1') {
            numberOfRightAnswers++
            counterDisplayForRightAnswers.innerHTML = numberOfRightAnswers
            changeWord()
        }
        if(event.key == '2') {
            numberOfWrongAnswers++
            counterDisplayForWrongAnswers.innerHTML = numberOfWrongAnswers
            changeWord()
        }
        if(event.key == 'Enter') {
            changeDisplayedWord()
        }
    }
})

exitButton.addEventListener('click', () => {
    open('../index.html')
})