//Variables needed
const reshuffle = document.querySelector('.fa-repeat');
const pack = document.querySelector('.pack');
let moves = 0;
const moveCounter = document.querySelector('.moves');
let matches = 0;
let openList = [];
const starsImage = document.querySelector('.stars');
const threeStarsHTML = starsImage.innerHTML;
let stars = 3;

let cardDeck = [
    'fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb'
];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// New Deck function
function newDeck() {
    //Shuffle
    cardDeck = shuffle(cardDeck);
    //Build HTML for deck
    const fragment = document.createDocumentFragment();
    const deck = document.createElement('ul');
    deck.classList.add('deck');
    fragment.appendChild(deck);
    cardDeck.forEach(function(cardIcon) {
        const cardHolder = document.createElement('li');
        cardHolder.classList.add('card');
        const cardFace = document.createElement('i');
        cardFace.classList.add('fa');
        cardFace.classList.add(cardIcon);
        cardHolder.appendChild(cardFace);
        deck.appendChild(cardHolder);
    })
    //Remove existing Deck
    while (pack.firstChild) {
      pack.removeChild(pack.firstChild);
    }
    //Add HTML to DOM
    pack.appendChild(fragment);
}

//Event Listener for newDeck

reshuffle.addEventListener('mousedown', function() {
    newDeck();
    moves = 0;
    moveCounter.textContent = moves.toString();
    stars = 3;
    updateStars();
    openList = [];
    matches = 0;
});


 // Card listener
 /*
  * set up the event listener for a card. If a card is clicked:
  *  - display the card's symbol (put this functionality in another function that you call from this one)
  *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
  */

pack.addEventListener('click', function(evt) {
    //check card should be flippable
    if ((evt.target.nodeName == 'LI') && (evt.target.classList.contains('open') == false) && (evt.target.classList.contains('match') == false) && (openList[1] == null)) {
        //increment move counter
        moves += 1;
        moveCounter.textContent = moves.toString();
        //update stars
        updateStars();
        //display card
        evt.target.classList.add('open');
        evt.target.classList.add('show');
        //Send to openList logic function
        openListLogic(evt.target);
    }
})

//openList logic function
/*
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function openListLogic(card) {
    if (openList == false) {
        openList.push(card);
        console.log(openList);
    } else {
        openList.push(card);
        console.log(openList);
        if (openList[2] != null) {console.log("Error - too many in openList")}
        else {
            if (openList[0].firstChild.className == openList[1].firstChild.className) {
                matchCards();
            } else {
                setTimeout(function() {
                    hideCards();
                }, 2500);
            }
        }
    }
}

//Match cards by changing classes (one per time for IE)
function matchCards() {
    openList[0].classList.remove('open');
    openList[0].classList.remove('show');
    openList[0].classList.add('match');
    openList[1].classList.remove('open');
    openList[1].classList.remove('show');
    openList[1].classList.add('match');
    //resetting openList array
    openList = [];
    //inc matches and check if won
    matches += 1;
    if (matches == 8) {
        winnerScreen();
    }
}

//Hiding cards by changing classes (one per time for IE)
function hideCards() {
    openList[0].classList.remove('open');
    openList[0].classList.remove('show');
    openList[1].classList.remove('open');
    openList[1].classList.remove('show');
    //resetting openList array
    openList = [];
}

//Winner screen function - MORE TO CODE HERE!!

function winnerScreen() {
    alert("YOU WIN! and have " + stars);
}

// Stars function runs each time a card is clicked and a move registered

function updateStars() {
    if ((moves == 30) || (moves == 40)) {
        starsImage.removeChild(starsImage.lastElementChild);
        stars -= 1;
    }   else if (moves == 0) {
        starsImage.innerHTML = threeStarsHTML;
    }
}
