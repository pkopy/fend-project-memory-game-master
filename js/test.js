/*
 * Create a list that holds all of your cards
 */
const listOfCards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
"fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb",
"fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];
let openList = [];
let matchList = [];
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
deckOfCards.addEventListener('click', function(evt){
    if(!(evt.target.className === 'deck')){
        showSymbol(evt);
        addCardToOpenList(evt);
    }
})

function showSymbol(evt){
    evt.target.classList.add('open', 'show');
}

function addCardToOpenList(evt){
    openList.push(evt.target.firstElementChild);
    if(openList.length === 2 && openList[0].className === openList[1].className){
        openList[0].parentNode.className = 'card match show';
        openList[1].parentNode.className = 'card match show';
        matchList.push(openList[0]);
        openList = [];
    }else if(openList.length === 2 && openList[0].className !== openList[1].className){
        setTimeout(function(){
            openList[0].parentNode.className = 'card';
            openList[1].parentNode.className = 'card';
            openList = [];
        }, 200)
    }
}
