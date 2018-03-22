//Variables needed

const pack = document.querySelector('.pack');

let cardDeck = [
    'fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-cheese', 'fa-cheese'
]

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
        cardFace.classList.add('fa', cardIcon);
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




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
