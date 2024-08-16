/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}




/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page

function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        
        // game object from parsed array/list
        let game = games[i];
        
        // new div tag
        let gameCard = document.createElement('div');

        // add class to classlist of each gameCard
        gameCard.classList.add("game-card");

        // going inside each gameCard's div content (empty rn) and adding html tags/content
        // USE BACKTICK not quotes, backtick is on tilde key
        gameCard.innerHTML = `
        <img src="${game.img}" alt="${game.name}" class = "game-img">
        <h2>${game.name}</h2>
        <p>${game.description}</p>
        <p>Pledged: ${game.pledged.toLocaleString('en-US')}</p>
        <p>Goal: ${game.goal.toLocaleString('en-US')}</p>
        `;

        // append
        gamesContainer.appendChild(gameCard);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);
// GAMES_JSON is a list with dictionaries inside it




/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

const totalBackers = GAMES_JSON.reduce((acc, game) => {
    return acc += game.backers;
}, 0); //forgot 0 here meaning accumulation = 0

contributionsCard.innerHTML = `
    <p>${totalBackers.toLocaleString('en-US')}</p>
`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc += game.pledged;
}, 0);

raisedCard.innerHTML = `
    <p>${totalRaised.toLocaleString('en-US',
        {
            style:'currency',
            currency:'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }
    )}
    </p>
`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// access gamesContainer from before, get the count
const gamesCount = gamesContainer.childElementCount

// change innerHTML of gamesCard
gamesCard.innerHTML = `
    <p>${gamesCount.toLocaleString('en-US')}</p>
`;




/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    
    let unfundedGames = GAMES_JSON.filter((game) => {
        console.log(game);
        return game.pledged < game.goal;
    });

    console.log(unfundedGames)

    addGamesToPage(unfundedGames);
}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    let fundedGames = GAMES_JSON.filter((game) => {
        console.log(game);
        return game.pledged >= game.goal;
    });

    console.log(fundedGames)

    addGamesToPage(fundedGames);

}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    console.log(GAMES_JSON.length)
    addGamesToPage(GAMES_JSON);
}


// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);




/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

const numOfUnfundedGames = GAMES_JSON.filter((game) => {
  return game.goal > game.pledged;  
}).length //output: 7

const displayStr = `A total of $${totalRaised.toLocaleString()} has been raised for ${gamesCount} games. Currently ${numOfUnfundedGames != 1 ? `${numOfUnfundedGames} games remain unfunded. We need your help to fund these amazing games!` : `${numOfUnfundedGames} game remains unfunded. We need your help to fund this amazing game!`}`

descriptionContainer.innerHTML = `
    <p>${displayStr}</p>
`


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item