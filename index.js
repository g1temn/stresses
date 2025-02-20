//social media references buttons
const youtubeButton = document.getElementById('youtube')
const twitterButton = document.getElementById('twitter')
const telegramButton = document.getElementById('telegram')

youtubeButton.addEventListener('click', () => {
    open('https://www.youtube.com/')
})
twitterButton.addEventListener('click', () => {
    open('https://www.twitter.com/')
})
telegramButton.addEventListener('click', () => {
    open('https://web.telegram.org/k/')
})

//references to different modes
const mode1Button = document.getElementById('reference-betton-mode1')
const mode2Button = document.getElementById('reference-betton-mode2')
const mode3Button = document.getElementById('reference-betton-mode3')
const listOfTheWordButton = document.getElementById('reference-betton-list-of-the-words')

mode1Button.addEventListener('click', () => {
    open('https://g1temn.github.io/mode1/', '_self')
})
mode2Button.addEventListener('click', () => {
    open('https://g1temn.github.io/mode2/', '_self')
})
listOfTheWordButton.addEventListener('click', () => {
    open('https://osvita-ua.translate.goog/test/training/materialy-instrumenty/65116/?_x_tr_sl=uk&_x_tr_tl=ru&_x_tr_hl=ru&_x_tr_pto=sc', '_self')
})

//live greeeting
const greetingMessage = document.getElementById('greeting')
const questionMessage = document.getElementById('question')

getDate()

function getDate() {
    const date = new Date()
    const hour = date.getHours()
    if(hour == 23 || hour <= 6){
        greetingMessage.textContent = 'Пісяти й спати! Які, трясця, наголоси?'
        questionMessage.textContent = '8 годин сну, чи не так?'
    }
    else if(hour > 6 && hour <=11){
        greetingMessage.textContent = 'Доброго ранку!'
        questionMessage.textContent = 'Наголоси вже зачекались на тебе.'
    }
    else if(hour > 11 && hour <=16){
        greetingMessage.textContent = 'Добрий день!'
        questionMessage.textContent = 'Готові попрактикуватися?'
    }
    else if(hour > 16 && hour < 23){
    greetingMessage.textContent = 'Добрий вечір!'
        questionMessage.textContent = 'Як щодо вечірньої практики?'
    }
}
