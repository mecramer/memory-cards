// Add DOM hooks
const cardsContainer = document.querySelector('#cards-container');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const currentEl = document.querySelector('#current');
const showBtn = document.querySelector('#show');
const hideBtn = document.querySelector('#hide');
const questionEl = document.querySelector('#question');
const addCardBtn = document.querySelector('#add-card');
const clearBtn = document.querySelector('#clear');
const addContainer = document.querySelector('#add-container');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = [
  {
    question: 'What must a variable begin with?',
    answer: 'A letter, $ or _'
  },
  {
    question: 'What is a variable?',
    answer: 'Container for a piece of data'
  },
  {
    question: 'Example of Case Sensitive Variable',
    answer: 'thisIsAVariable'
  }
];

// Create all cards
// loops through the data array and runs the createCard() function on each
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in the DOM
// this is constructing the card to be inserted into the page
// function builds the html for all the cards
function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  // first card also gets an active class name
  if(index === 0) {
    card.classList.add('active');
  }

  // build the html for the card
    card.innerHTML = `
      <div class="inner-card">
        <div class="inner-card-front">
          <p>${data.question}</p>
        </div>
        <div class="inner-card-back">
          <p>${data.answer}</p>
        </div>
      </div>
    `;

    // this event listener toggles the show-answer class wich kicks off a ton of css to flip the cards
    card.addEventListener('click', () => card.classList.toggle('show-answer') );

    // Add to DOM cards, push each card
    cardsEl.push(card);

    // send to the page
    cardsContainer.appendChild(card);

    // update page counter
    updateCurrentText();

}

// Show number of cards
function updateCurrentText() {
  currentEl.innerText = `
    ${ currentActiveCard + 1} / ${cardsEl.length}
  `;
}

createCards();

// Event Listeners
// clicking on the next button increases the active card index by 1
// card left will give the effect of card sliding in
// className replaces whichever classes currently exist
// this changes the current card to left before going onto a new current card
// then we get the new current card index and set the class for that to be card active
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard = currentActiveCard + 1;

  if(currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// same as nextBtn, but class name in index are slightly different
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard = currentActiveCard - 1;

  if(currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});