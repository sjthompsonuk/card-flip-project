//VARIABLES NEEDED

//DOM Selectors
const reshuffle = document.querySelector('.restart');
const pack = document.querySelector('.pack');
const moveCounter = document.querySelector('.moves');
const starsImage = document.querySelector('.stars');
const minsTimer = document.querySelector('.mins');
const secsTimer = document.querySelector('.secs');
const tensTimer = document.querySelector('.tens');
const scoreBoard = document.querySelector('.score-board');

//DOM Selectors - Modals
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');
const modalText1 = document.querySelector('.modal-text1');
const modalText2 = document.querySelector('.modal-text2');
const modalRetry = document.querySelector('.retry-button');
const nameModal = document.querySelector('.name-modal');
const nameSubmit = document.querySelector('.submit-button');
const nameForm = document.querySelector('.name-form');
const newPlayerName = document.querySelector('.inputName');

//Counters
let moves = 0;
let matches = 0;
let openList = [];
let stars = 3;
let mins = 0;
let secs = 0;
let tens = 0;
let newScore = 0;
let playerName;

//Stars Reset Variable
const threeStarsHTML = starsImage.innerHTML;

//Timeout Variables
let timer;
let hider;

//Validation Variables
let validBoard = false;
let openingWelcome = false; //TODO - NEED TO FIX LACK OF USE

//Score Board Array of Objects, spare slot at 6, needs to be filled or sort doesn't work
let scores = [
    {name: '-', starValue: 0, timeValue: '0:00', scoreValue: 0},
    {name: '-', starValue: 0, timeValue: '0:00', scoreValue: 0},
    {name: '-', starValue: 0, timeValue: '0:00', scoreValue: 0},
    {name: '-', starValue: 0, timeValue: '0:00', scoreValue: 0},
    {name: '-', starValue: 0, timeValue: '0:00', scoreValue: 0},
    {}
];

//Array of Cards Pre Shuffle
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
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// New Deck function
function newDeck() {
    //Shuffle Pack
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
        // Ensure helper class .fa assigned
        cardFace.classList.add('fa');
        // Add specific fa icon
        cardFace.classList.add(cardIcon);
        cardHolder.appendChild(cardFace);
        deck.appendChild(cardHolder);
    });
    //Remove existing Deck
    while (pack.firstChild) {
      pack.removeChild(pack.firstChild);
    }
    //Add HTML to DOM
    pack.appendChild(fragment);
    //Validate Board - prevents play on title page board
    validBoard = true;
}

//Event Listener for a full start or restart
reshuffle.addEventListener('mousedown', function() {
    resetAll();
});
//Reset function seperated out so it can be called from other functions.
function resetAll() {
    // Removes bug causing error if attempting to reset while mismatch cards wait to hide
    window.clearTimeout(hider);
    // Get a new shuffled deck and reset variables
    newDeck();
    moves = 0;
    moveCounter.textContent = moves.toString();
    stars = 3;
    updateStars();
    openList = [];
    matches = 0;
    resetTimer();
    // Open Name Request Modal
    nameModal.style.display = "block";
}

// Name Request Modal
// Create clickable text for submission
nameSubmit.addEventListener('click', function(evt) {
    //prevent the auto form reset/page reload
    evt.preventDefault();
    //store name
    playerName = newPlayerName.value;
    newPlayerName.value = null;
    //change validation property
    openingWelcome = false;
    //close
    nameModal.style.display = 'none';
})
//Same for someone pressing Enter key
nameForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    playerName = newPlayerName.value;
    newPlayerName.value = null;
    openingWelcome = false;
    nameModal.style.display = 'none';
})


//GAMEPLAY SCRIPT

//Create listener for a move/click
pack.addEventListener('click', function(evt) {
    //check card should be available to select - correct Node, card face down, not already matched, haven't got 2 cards face up already, board is ready for play, name request modal not displaying.
    if ((evt.target.nodeName == 'LI') && (evt.target.classList.contains('open') == false) && (evt.target.classList.contains('match') == false) && (openList[1] == null) && (validBoard == true) && (openingWelcome == false)) {
        //increment move counter
        moves += 1;
        moveCounter.textContent = moves.toString();
        //start timer if first move
        if (moves == 1) {
            runTimer();
        }
        //update stars
        updateStars();
        //display card
        evt.target.classList.add('open');
        evt.target.classList.add('show');
        //Send the card to the logic function to decide what happens next
        openListLogic(evt.target);
    }
});

//openList logic function - decides from selected card what action to take
function openListLogic(card) {
    //first case is this is the first card of a pair to be selected - hold in a list for later comparison
    if (openList == false) {
        openList.push(card);
    } else {
        //second case is this is the second card of a pair which will need comparing
        openList.push(card);
        if (openList[0].firstChild.className == openList[1].firstChild.className) {
            //there is a match so perform mathcing function
            matchCards();
        } else {
            //there is no match...allow the cards to both be disaplyed for a set time before hiding both.
            hider = window.setTimeout(function() {
                hideCards();
            }, 2500);
        }
    }
}

//Matching cards remain face up by changing classes (one class per time for IE compatibility)
function matchCards() {
    openList[0].classList.remove('open');
    openList[0].classList.remove('show');
    openList[0].classList.add('match');
    openList[1].classList.remove('open');
    openList[1].classList.remove('show');
    openList[1].classList.add('match');
    //empty openList array
    openList = [];
    //increment matches and check if won
    matches += 1;
    if (matches == 8) {
        //if so
        stopTimer();
        updateScores();
        winnerScreen();
    }
}

//If non matching cards, then hide by changing classes (one per time for IE)
function hideCards() {
    openList[0].classList.remove('open');
    openList[0].classList.remove('show');
    openList[1].classList.remove('open');
    openList[1].classList.remove('show');
    //empty openList array
    openList = [];
}

//WIN OCCURS

function winnerScreen() {
    // Give winning message modal for TOP SCORE
    if (stars * (1000 - (mins * 60 + tens * 10 + secs)) == scores[0].scoreValue) {
        modalText1.innerText = "TOP SCORE of " + newScore + "!!!!"
        modalText2.innerText = " YOU WON in... " + mins + ":" + tens + secs + " with " + stars + " stars."
        modal.style.display = "block";
    } else {
        // Give winning message modal for NOT TOP SCORE
        modalText1.innerText = "You scored " + newScore + " !!!!"
        modalText2.innerText = "You won in " + mins + ":" + tens + secs + " with " + stars + " stars."
        modal.style.display = "block";
    }
}

// Stars function runs each time a card is clicked and a move registered
function updateStars() {
    // selected 2 move number values to reduce stars.
    if ((moves == 30) || (moves == 40)) {
        starsImage.removeChild(starsImage.lastElementChild);
        stars -= 1;
    }   else if (moves == 0) {
        //For initial build/reset
        starsImage.innerHTML = threeStarsHTML;
    }
}

//TIMER FUNCTIONS
// Start timer function
// Every second a new event should arrive from browser queue causing a clock iteration.
function runTimer() {
    timer = window.setTimeout(iterateTimer, 1000); //needs to use the delay!!
}

// Stop timer function
function stopTimer() {
    window.clearTimeout(timer);
}

// Reset Timer Fucntion
function resetTimer() {
    stopTimer();
    secs = 0;
    tens = 0;
    mins = 0;
    secsTimer.innerText = secs;
    tensTimer.innerText = tens;
    minsTimer.innerText = mins;
}

// Iterate Timer Function will run every 1000ms after first move unless stopped by a win or reset.
function iterateTimer() {
    secs += 1;
    if (secs == 10) {
        tens += 1;
        secs = 0;
    }
    if (tens == 6) {
    mins += 1;
    tens = 0;
    }
    secsTimer.innerText = secs;
    tensTimer.innerText = tens;
    minsTimer.innerText = mins;
    //repreat the delayed request for a 1000ms delay before iteration
    runTimer();
}

function updateScores() {
    //calculate new score and place 6th - index 5.
    newScore = stars * (1000 - (mins * 60 + tens * 10 + secs))
    //(6th worst from previous is overwritten regardless and not shown)
    scores[5] = {name: playerName, starValue: stars, timeValue: mins + ':' + tens + secs, scoreValue: newScore};
    //order scores array by score high to low
    scores.sort(function (a, b) {
        return (b.scoreValue - a.scoreValue);
    });
    //repopulate score table
    scoresPopulate();
}

//repopulate from scores array indies 0-4 only (1st to 5th) - as 6th is not necessarily 6th best.
function scoresPopulate() {
    // clear scoreboard  minus table headers
    for (let i = 0; i < 5; i++) {
        scoreBoard.removeChild(scoreBoard.lastElementChild);
    }
    // create fragment then new table HTML from scores array.
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 5; i++) {
        //create new elements
        let newRow = document.createElement('tr');
        let newPlace = document.createElement('td');
        let newName = document.createElement('td');
        let newStars = document.createElement('td');
        let newTime = document.createElement('td');
        let newScore = document.createElement('td');
        //assign appropriate values
        newPlace.textContent = (i + 1);
        newName.textContent = scores[i].name;
        newStars.textContent = scores[i].starValue;
        newTime.textContent = scores[i].timeValue;
        newScore.textContent = scores[i].scoreValue;
        //build HTML
        newRow.appendChild(newPlace);
        newRow.appendChild(newName);
        newRow.appendChild(newStars);
        newRow.appendChild(newTime);
        newRow.appendChild(newScore);
        fragment.appendChild(newRow);
    }
    //insert fragment into DOM
    scoreBoard.appendChild(fragment);
}

// ENDING WINNING MODAL

// Modal Close
close.addEventListener('click', function() {
    modal.style.display = 'none';
});

//Model Retry button
modalRetry.addEventListener('click', function() {
    modal.style.display = 'none';
    resetAll();
});
