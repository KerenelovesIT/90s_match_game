
const boadContainer = document.querySelector('.board-container')

let cards = [
    {name: A1 , img: A1.png }
    {name: A1 , img: a1.1.png }
    {name: A2 , img: A2.png}
    {name: A2 , img: a2.2.png}
    {name: A3 , img: A3.png }
    {name: A3 , img: A3.3.png}
    {name: A4 , img: A4.png}
    {name: A4 , img: a4.4.png}
    {name: A5 , img: A5.png}
    {name: A5 , img: A5.5.png}
    {name: A6 , img: A6.png}
    {name: A6 , img: a6.6.png}
    {name: A7 , img: A7.png}
    {name: A7 , img: A7.7.png}
    {name: A8 , img: A8.png}
    {name: A8 , img: A8.8.png}
    {name: A9 , img: A9.png}
    {name: A9 , img: A9.9.png}
    {name: A10 , img: A10.png}
    {name: A10 , img: a10.10png}
    {name: A11 , img: A11.png}
    {name: A11 , img: a11.11.png}
    {name: A12 , img: A12.png}
    {name: A12 , img: a12.12.png}
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
            <img class="front-image src="${card.img}" />
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
    ssetTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
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