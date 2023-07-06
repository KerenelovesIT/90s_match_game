
const boadContainer = document.querySelected('.board-container')

let cards = [
    {name: A1 , img: }
    {name: A1 , img: }
    {name: A2 , img: }
    {name: A2 , img: }
    {name: A3 , img: }
    {name: A3 , img: }
    {name: A4 , img: }
    {name: A4 , img: }
    {name: A5 , img: }
    {name: A5 , img: }
    {name: A6 , img: }
    {name: A6 , img: }
    {name: A7 , img: }
    {name: A7 , img: }
    {name: A8 , img: }
    {name: A8 , img: }
    {name: A9 , img: }
    {name: A9 , img: }
    {name: A10 , img: }
    {name: A10 , img: }
    {name: A11 , img: }
    {name: A11 , img: }
    {name: A12 , img: }
    {name: A12 , img: }
]

//declare cards
let firstCard, secondCard
let lockBoard = false
let score = 0

document.querySelector('.score').textContent = score

const generateCards = () => {
    for (card of cards) {
        const cardElement = document.createElement('div')
        cardElement.classList.add('card')
        cardElement.setAttribute('data-name', card.name)
        cardElement.innerHTML = `
        <div class="front">
            <img class="font-image src="${card.img}" />
        </div>
        <div class="back"></div>
        `
        boardContainer.appendChild(cardElement)
        cardElement.addEventListener ('click', flipCard)
    }
}
generateCards()


const shuffleCards = () => {

    let currentIndex = cards.length,
    randomIndex,
    temporaryValue
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -=1
        temporaryValue = cards[currentIndex]
        cards[currentIndex] = cards[randomIndex]
        cards[randomIndex] = temporaryValue
    }
}

function flipCard() {
    if (lockBoard) return
    if (this === firstCard) return

    this.classList.add('flipped')

    if(!firstCard) {
    firstCard = this
    return
    }

    secondCard = this 
    score++
    document.querySelector('.score').textContent = score
    lockBoard = true
    
    checkForMatch()
}

function unflipCards() {
    setTimeout(() {
        firstCard.classList.remove('flipped')
        secondCard.classList.remove('flipped')
        resetBoard()
    }, 1000)
}

function checkForMatch (){
    let isMatch = firstCard.dataset.name === secondCard.dataset.name

    isMatch ? disableCards() : unflipCards()

} 


function disableCards(){
    firstCard.removeEventListener('click, flipCard')
    secondCard.removeEventListener('click, flipCard')

    resetBoard()
}

function resetBoard() {
    firstCard = null
    secondCard = null
    lockBoard = false
}

function restart() {
    resetBoard()
    shuffleCards()
    score = 0 
    document.querySelector('.score').textContent = score
    boardContainer.innerHTML = 
    generateCards()
}

document.querySelector('main').addEventListener('click', handleChoice)