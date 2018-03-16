/*
 * Create a list that holds all of your cards
 */
const listOfCards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
"fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb",
"fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];
let openList = [];
let matchList = [];
let moveCounterDisplay = document.querySelector('.moves');
let counterOfMoves = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let shuffleListOfCards = shuffle(listOfCards);
const cards = document.querySelectorAll('.deck li');

for(i = 0; i < cards.length; i++){
    cards[i].firstElementChild.className = shuffleListOfCards[i];
}

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
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const deckOfCards = document.querySelector('.deck');
const starsPanel = document.querySelector('.stars');
const stars = starsPanel.querySelectorAll('li');
const restartButton = document.querySelector('.restart')
let startTime;
let endTime;

deckOfCards.addEventListener('click', function(evt){
    if(!(evt.target.className === 'deck') && !(evt.target.isClicked === 1) && !(evt.target.localName === 'i')){
        showSymbol(evt);
        addCardToOpenList(evt);
        incrementCounter();
        timeOfGame();
        removeStarFromScorePanel();
    }
})

restartButton.addEventListener('click', function(){
    resetGame();
})

function showSymbol(evt){
    evt.target.className ='card open show';
    evt.target.isClicked = 1;
}

function addCardToOpenList(evt){
    openList.push(evt.target.firstElementChild); 
    checkTwoCardsMatch(openList);
    checkTwoCardsNotMatch(openList);
}

function checkTwoCardsMatch(array){
    if(array.length === 2 && array[0].className === array[1].className){
        array[0].parentNode.className = 'card match show';
        array[1].parentNode.className = 'card match show';
        matchList.push(array[0]);
        clearTheOpenList(array);
    }    
}

function checkTwoCardsNotMatch(array){
    if(array.length === 2 && array[0].className !== array[1].className){
        setTimeout(function(){
            array[0].parentNode.className = 'card close';
            array[1].parentNode.className = 'card close';
            array[0].parentNode.isClicked = 0;
            array[1].parentNode.isClicked = 0;
            clearTheOpenList(array);
        },800);
    }
}


function clearTheOpenList(array){
    for(let i = 0; i < 2; i++){
        array.shift();
    }
    
    return array;
}

function incrementCounter(){
    counterOfMoves++;
    moveCounterDisplay.innerHTML = counterOfMoves;
}

function timeOfGame(){
    if(counterOfMoves === 1){
        startTime = Date.now();
    }
    if(matchList.length === 8){
        endTime = Date.now() - startTime;
        console.log(Math.floor(endTime/1000))
    }
}

function removeStarFromScorePanel(){
    if(counterOfMoves === 20){
        starsPanel.lastElementChild.style.visibility ='hidden';
    }else if(counterOfMoves === 40){
        starsPanel.lastElementChild.previousElementSibling.style.visibility ='hidden';
    }
}

function resetGame(){
    for(let card of cards){
        card.className = "card close"
        card.isClicked = 0;
    }
    for(star of stars){
        star.style.visibility = 'visible'
    }
    counterOfMoves = 0;
    moveCounterDisplay.innerHTML = counterOfMoves;
    matchList = [];
}
