//references to interactive elements
const button = document.querySelector('button')
const wordP = document.querySelector('#word')
const answerP = document.querySelector('#answer')
const paragraph = document.querySelectorAll('p')
const counterDisplay = document.querySelector('#counterDisplay')
const messageContainer = document.querySelector('#messageContainer')
const continueButton = document.querySelector('#continueButton')
const quitButton = document.querySelector('#quitButton')
const displayedMessage = document.querySelector('#displayedMessage')
const tipContainer = document.querySelector('.tip')

//import words
import { answers, words } from '../words.js'

//counter
let counter = 0
function countScore(){
    counter++
    counterDisplay.innerHTML = 'Переглянуто слів: ' + counter
    showMessage()
}

//timer
const stopwatchDisplay = document.querySelector('#stopwatchDisplay')

let seconds = 0
let minutes = 0
let hours = 0

function updateStopwatch(){
    seconds++
    if(seconds === 60){
        seconds = 0
        minutes++
    }
    if(minutes === 60){
        minutes = 0
        hours++
    }
    let displayedSeconds = seconds.toString().padStart(2, 0)
    let displayedMinutes = minutes.toString().padStart(2, 0)
    let displayedHours = hours.toString().padStart(2, 0)
    stopwatchDisplay.textContent = displayedHours + ':' + displayedMinutes + ':' + displayedSeconds
}

setInterval(updateStopwatch, 1000)

//audio
let isMuted = true

//background melody
let melody = new Audio()
melody.src = 'audio/music/melody.wav'
melody.volume = 0.1

//message appearing sound
let messageSFX = new Audio()
messageSFX.src = 'audio/sfx/message.wav'
messageSFX.volume = 0.6

function playSound(sound){
    if(!isMuted){
        sound.play()
        sound.loop = true
    }
    if(!isMuted && sound === messageSFX){
        sound.play()
        sound.loop = false
    }
}

const volumeButton = document.querySelector('#volumeButton')

function muteSounds(){
    if(!isMuted){
        volumeButton.classList.remove('fa-solid', 'fa-volume-high')
        volumeButton.classList.add('fa-solid', 'fa-volume-xmark')
        volumeButton.title = 'Аудіосупровід ВИМКНЕНО'
        melody.muted = true
        messageSFX.muted = true
        isMuted = true
    }
    else if(isMuted){
        volumeButton.classList.remove('fa-solid', 'fa-volume-xmark')
        volumeButton.classList.add('fa-solid', 'fa-volume-high')
        volumeButton.title = 'Аудіосупровід УВІМКНЕНО'
        melody.muted = false
        messageSFX.muted = false
        isMuted = false
    }
    playSound(melody)
}

volumeButton.addEventListener('click', muteSounds)

//message
let isMessagesAllowed = true
const messageButton = document.querySelector('#messageButton')
messageButton.addEventListener('click', allowMessages)

function allowMessages(){
    if(isMessagesAllowed){
        messageButton.classList.remove('fa-solid', 'fa-bell')
        messageButton.classList.add('fa-solid', 'fa-bell-slash')
        messageButton.title = 'Надсилати нагадування НЕДОЗВОЛЕНО'
        isMessagesAllowed = false
    }
    else if(!isMessagesAllowed){
        messageButton.classList.remove('fa-solid', 'fa-bell-slash')
        messageButton.classList.add('fa-solid', 'fa-bell')
        messageButton.title = 'Надсилати нагадування ДОЗВОЛЕНО'
        isMessagesAllowed = true
    }
}

let isMessageDisplayed = false
function showMessage(){
    if(isMessagesAllowed){
        if(!isMessageDisplayed && counter % 50 == 1 && counter != 1){
            displayMessage()
            playSound(messageSFX)
        }
    }
}

function displayMessage(){
    let numberOfRevisedWords = counter - 1
    displayedMessage.innerHTML = 'Було переглянуто ' + numberOfRevisedWords  + ' слів!'
    messageContainer.style.display = 'flex'
    messageContainer.classList.add('showed')
    setTimeout(() => {
        messageContainer.classList.remove('showed')
        isMessageDisplayed = true
    }, 500)
}

//continue/quit learning
quitButton.addEventListener('click', () => {
    open('../index.html', '_self')
})
continueButton.addEventListener('click', hideMessage)

function hideMessage(){
    messageContainer.classList.add('hiden')
    setTimeout(() => {
        messageContainer.style.display = 'none'
        messageContainer.classList.remove('hiden')
        isMessageDisplayed = false
    },500)
}

//game
let isWordShowed = false

startGame()

button.addEventListener('click', startGame)

paragraph.forEach(P => {
    P.addEventListener('click', showWord)
})

function startGame(){
    if(!isMessageDisplayed){
        countScore()
        generateWord()
        animateGame()
    }
}

function generateWord(){
    const number = Math.floor(Math.random()*words.length)
    wordP.textContent = words[number]
    answerP.textContent = answers[number]
    emphasizeLetter(answerP.textContent)
    isWordShowed = false
    showWord()
}

function showWord(){
    if(!isMessageDisplayed){
        if(!wordP.classList.contains('animationed')){
            if(!isWordShowed){
                wordP.style.display = ''
                answerP.style.display = 'none'
                isWordShowed = true
            }
            else{
                wordP.style.display = 'none'
                answerP.style.display = ''
                isWordShowed = false
            }
        }
    }
}

//animations
window.addEventListener('keyup', (event) => {
    if(event.key === ' ' &&
       !wordP.classList.contains('animationed')){
        startGame()
        tipContainer.style.display = 'none'
    }
    if(event.key === 's' ||
       event.key === 'і' ||
       event.key === 'ы'){
        showWord()
        tipContainer.style.display = 'none'
    }
})

function animateGame(){
    wordP.classList.add('animationed')
    button.disabled = true
    wordP.addEventListener('animationend', () => {
        wordP.classList.remove('animationed')
        button.disabled = false
    })
}

//emphasize stressed letter
function emphasizeLetter(word){
    const pattern = /[А-ЯҐЄІЇ]/g
    const emphasizedWord = word.replace(pattern, match => {
        return "<span class='emphasized'>" + match + "</span>"
    })
    answerP.innerHTML = emphasizedWord
}