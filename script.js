const boardContainer = document.querySelector('.board-container')

let cards = [
    {id:1, name: 'A1' , img: 'images/Ginger.png' },
    {id:2, name: 'A1' , img: 'images/Ginger1.png' },
    {id:3, name: 'A2' , img: 'images/Rugrats.png'},
    {id:4, name: 'A2' , img: 'images/Rugrats1.png'},
    {id:5, name: 'A3' , img: 'images/A3.png' },
    {id:6, name: 'A3' , img: 'images/A3.3.png'},
    {id:7, name: 'A4' , img: 'images/A4.png'},
    {id:8, name: 'A4' , img: 'images/a4.4.png'},
    {id:9, name: 'A5' , img: 'images/A5.png'},
    {id:10, name: 'A5' , img: 'images/A5.5.png'},
    {id:11, name: 'A6' , img: 'images/A6.png'},
    {id:12, name: 'A6' , img: 'images/a6.6.png'},
    {id:13, name: 'A7' , img: 'images/A7.png'},
    {id:14, name: 'A7' , img: 'images/A7.7.png'},
    {id:15, name: 'A8' , img: 'images/A8.png'},
    {id:16, name: 'A8' , img: 'images/A8.8.png'} ,
    {id:17, name: 'A9' , img: 'images/A9.png'} ,
    {id:18, name: 'A9' , img: 'images/A9.9.png'},
    {id:19, name: 'A10' , img: 'images/A10.png'},
    {id:20, name: 'A10' , img: 'images/a10.10.png'},
    {id:21, name: 'A11' , img: 'images/A11.png'},
    {id:22, name: 'A11' , img: 'images/a11.11.png'},
    {id:23, name: 'A12' , img: 'images/A12.png'},
    {id:24, name: 'A12' , img: 'images/a12.12.png'}
]


//declare cards
let firstCard, secondCard
let lockBoard = false
let score = 0
document.querySelector('.score').textContent = score

const shuffleCards = () => {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = cards[currentIndex]
    cards[currentIndex] = cards[randomIndex]
    cards[randomIndex] = temporaryValue
  }
}

//Must be able to generate cards//
const generateCards = () => {
  shuffleCards()
  for (card of cards) {
    const cardElement = document.createElement('div')
    cardElement.classList.add('card')
    cardElement.setAttribute('data-name', card.name)
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src="${card.img}" style="width: 200px; height: 290px;" />
      </div>
      <div class="back"></div>
    `
    boardContainer.appendChild(cardElement)
    cardElement.addEventListener('click', flipCard)
  }
}
generateCards()
//get cards to shuffle around to make sure card position unpredictacble//

//Functions get cards to do everything//
//create flip card function//
//easier when I seperated cards//
function flipCard() {
  if (lockBoard) return
  if (this === firstCard) return
  this.classList.add('flipped')
  if (!firstCard) {
    firstCard = this
    return
  }
  secondCard = this

  lockBoard = true
  checkForMatch()
}
//create unflipped card function//
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flipped')
    secondCard.classList.remove('flipped')
    resetBoard()
  }, 1000)
}
// Check if card match//
function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name
 
  if (isMatch) {
    score++
    document.querySelector('.score').textContent = score
    disableCards()
  } else {unflipCards()}
  
}
// add event listeners//
function disableCards() {
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)
  resetBoard()
}
//get cards to reset and reload//
function resetBoard() {
  firstCard = null
  secondCard = null
  lockBoard = false
}
//have the ability to restart once done//
function restart() {
  resetBoard()
  shuffleCards()
  score = 0
  document.querySelector('.score').textContent = score
  boardContainer.innerHTML = ''
  generateCards()
}
document.querySelector('main').addEventListener('click', handleChoice)
