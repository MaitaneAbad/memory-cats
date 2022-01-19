'use strict';

document.addEventListener('DOMContentLoaded', () => {
  //card options
  const cardArray = [
    { name: 'oneCat', img: './assets/images/oneCat.jpg' },
    { name: 'oneCat', img: './assets/images/oneCat.jpg' },
    { name: 'twoCat', img: './assets/images/twoCat.jpg' },
    { name: 'twoCat', img: './assets/images/twoCat.jpg' },
    { name: 'threeCat', img: './assets/images/threeCat.jpg' },
    { name: 'threeCat', img: './assets/images/threeCat.jpg' },
    { name: 'fourCat', img: './assets/images/fourCat.jpg' },
    { name: 'fourCat', img: './assets/images/fourCat.jpg' },
    { name: 'fiveCat', img: './assets/images/fiveCat.jpg' },
    { name: 'fiveCat', img: './assets/images/fiveCat.jpg' },
    { name: 'sixCat', img: './assets/images/sixCat.jpg' },
    { name: 'sixCat', img: './assets/images/sixCat.jpg' },
    { name: 'sevenCat', img: './assets/images/sevenCat.jpg' },
    { name: 'sevenCat', img: './assets/images/sevenCat.jpg' },
    { name: 'eightCat', img: './assets/images/eightCat.jpg' },
    { name: 'eightCat', img: './assets/images/eightCat.jpg' },
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  const resultDisplayWin = document.querySelector('.js-win');
  const buttonResetWin = document.querySelector('.js-containerWin');
  const score = document.querySelector('.js-score');
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  //create your board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img');
      card.setAttribute('src', './assets/images/background.jpg');
      card.setAttribute('data-id', i);
      card.setAttribute('class', 'background');
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    }
  }

  //check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId === optionTwoId) {
      cards[optionOneId].setAttribute('src', './assets/images/background.jpg');
      cards[optionTwoId].setAttribute('src', './assets/images/background.jpg');
    } else if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].removeEventListener('click', flipCard);
      cards[optionTwoId].removeEventListener('click', flipCard);
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneId].setAttribute('src', './assets/images/background.jpg');
      cards[optionTwoId].setAttribute('src', './assets/images/background.jpg');
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      score.textContent = ' ';
      resultDisplayWin.textContent = 'Congratulations! You found them all!';
      const button = document.createElement('button');
      button.textContent = 'Reset';
      button.setAttribute('class', 'buttonReset');
      button.addEventListener('click', reset);
      buttonResetWin.appendChild(button);
    }
  }
  function reset() {
    window.location.reload();
  }
  //flip your card
  function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 1000);
    }
  }

  createBoard();
});
