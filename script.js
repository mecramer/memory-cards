// Add DOM hooks
const cardsContainer = document.querySelector('#cards-container');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const currentEl = document.querySelector('#current');
const showBtn = document.querySelector('#show');
const hideBtn = document.querySelector('#hide');
const questionEl = document.querySelector('#question');
const answerEl = document.querySelector('#answer');
const addCardBtn = document.querySelector('#add-card');
const clearBtn = document.querySelector('#clear');
const addContainer = document.querySelector('#add-container');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();

// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];

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

// Get cards from local storage
// get strong from local storage and run JSON.parse() on it to unstringify
// if cards eixis, return them, if not, create an empty array
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Add card to local storage
// this overwrites the entire array in local storagee whenever it changes, not just the one change
// send data to localstorage after running JSON.stringify() to make it a string
// reloading the window gets the new value in local storage onto the page
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

createCards();

// Event Listeners

// Next Button
// clicking on the next button increases the active card index by 1
// card left will give the effect of card sliding in
// className replaces whichever classes currently exist
// this changes the current card to left before going onto a new current card
// then we get the new current card index and set the class for that to be card active
nextBtn.addEventListener('click', () => {
  // only run if currentActiveCard exists
  if(cardsEl[currentActiveCard]) {
    cardsEl[currentActiveCard].className = 'card left';

    currentActiveCard = currentActiveCard + 1;

    if(currentActiveCard > cardsEl.length - 1) {
      currentActiveCard = cardsEl.length - 1;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();
  }
  
});

// Previous Button
// same as nextBtn, but class name in index are slightly different
prevBtn.addEventListener('click', () => {
  if(cardsEl[currentActiveCard]) {
    cardsEl[currentActiveCard].className = 'card right';

    currentActiveCard = currentActiveCard - 1;

    if(currentActiveCard < 0) {
      currentActiveCard = 0;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();
  }

  
});


// Show Add New Card container
// if we click the add new item button, the class changes to make the add new card information show
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// Hide Add New Card container
// if we click the X, the show class is removed, hiding this container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// Add new card
// 1. take the values from the question and answers field
// 2. check that both are not empty
// 3. send the data to the createCard function
// 4. reset the values to nothing for the two fields
// 5. remove the 'show' class so input is now hidden again
// 6. push the data to the cardsData array
// 7. run setCardsData() function with the new value of cardsData
addContainer.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;
  // console.log(question, answer);

  if(question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);

    setCardsData(cardsData);
  }
});

// Clear cards button
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
});