//Variables needed
const reshuffle = document.querySelector('.restart');
const pack = document.querySelector('.pack');
let moves = 0;
const moveCounter = document.querySelector('.moves');
let matches = 0;
let openList = [];
const starsImage = document.querySelector('.stars');
const threeStarsHTML = starsImage.innerHTML;
let stars = 3;
let timer;
const minsTimer = document.querySelector('.mins');
const secsTimer = document.querySelector('.secs');
const tensTimer = document.querySelector('.tens');
let mins = 0;
let secs = 0;
let tens = 0;
let playerName = 'Sam';
// 6th place score for adding data before sort and delete. Placeholders needed to make sorting function simple.
let scores = [
    {name: 'Sam', starValue: 3, timeValue: '0:10', scoreValue: 10},
    {name: 'No One Yet', starValue: 0, timeValue: '0:00', scoreValue: 0},
    {name: 'No One Yet', starValue: 0, timeValue: '0:00', scoreValue: 0},
    {name: 'No One Yet', starValue: 0, timeValue: '0:00', scoreValue: 0},
    {name: 'No One Yet', starValue: 0, timeValue: '0:00', scoreValue: 0},
    {}
];
//Set of values relate to Font-Awesome icons
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

//Event Listener for a full start or restart

reshuffle.addEventListener('mousedown', function() {
    // Get a new shuffled deck and reset variables
    newDeck();
    moves = 0;
    moveCounter.textContent = moves.toString();
    stars = 3;
    updateStars();
    openList = [];
    matches = 0;
    resetTimer();
});


// Card click listener

pack.addEventListener('click', function(evt) {
    //check card should be flippable
    if ((evt.target.nodeName == 'LI') && (evt.target.classList.contains('open') == false) && (evt.target.classList.contains('match') == false) && (openList[1] == null)) {
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
        //Send to openList logic function
        openListLogic(evt.target);
    }
})

//openList logic function - decides from selected card what action to take

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

//Match cards by changing classes (one class per time for IE compatibility)
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
        stopTimer();
        winnerScreen();
        updateScores();
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

//Winner screen function - MORE TO CODE HERE!! Add delay possibly too

function winnerScreen() {
    // Give winning message
    alert("YOU WON in " + mins + ":" + tens + secs + " with " + stars + "stars. See th leader board at the bottom");
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

// Start timer function

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
    console.log('iteration occured');
    console.log(secs);
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
    runTimer();
}

function updateScores() {
    //calculate new score and place 6th - index 5.
    scores[5] = {name: playerName, starValue: stars, timeValue: mins + ':' + tens + secs, scoreValue: stars * (1000 - (mins * 60 + tens * 10 + secs))};
    //order scores array by score
    scores.sort(function (a, b) {
        return (b.scoreValue - a.scoreValue);
    });
    //repopulate score table
    scoresPopulate();
}

//repopulate from scores array indies 0-4 only (1st to 5th)
function scoresPopulate() {

}
