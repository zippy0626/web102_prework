/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */


import GAMES_DATA from "./games.js";


const GAMES_JSON = JSON.parse(GAMES_DATA);


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

function addGamesToPage(games) {

  for (const game of games) {
    const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        gameCard.innerHTML = `
            <p>${game.name}</p>
            <img src="${game.img}" class="game-img" />
            <p>${game.description}</p>
            <p>Backers: ${game.backers}</p>
            <p>Pledged: $${game.pledged.toLocaleString("en-US")}</p>
            <p>Goal: $${game.goal.toLocaleString("en-US")}</p>
        `;
    gamesContainer.appendChild(gameCard);
  }
}
addGamesToPage(GAMES_JSON);



/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */


const contributionsCard = document.getElementById("num-contributions");
let totalBackers = GAMES_JSON.reduce((total, game) => {
    return total+=game.backers;
}, 0).toLocaleString('en-US');
contributionsCard.innerHTML = `
    ${totalBackers}
`;


const raisedCard = document.getElementById("total-raised");
let totalMoneyRaised = GAMES_JSON.reduce((total, game) => {
    return total+=game.pledged
}, 0).toLocaleString('en-US');
raisedCard.innerHTML = `
    $${totalMoneyRaised}
`;


const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `
    ${GAMES_JSON.length}
`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */


function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  let unfundedGames = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal
  });

  addGamesToPage(unfundedGames);
}


function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  let fundedGames = GAMES_JSON.filter((game) => {
    return game.pledged >= game.goal
  });

  addGamesToPage(fundedGames);
}


function showAllGames() {
  deleteChildElements(gamesContainer);

  addGamesToPage(GAMES_JSON);
}


const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */


const descriptionContainer = document.getElementById("description-container");

const unfundedGamesCount = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
}).length;

const displayString = `
    ${ unfundedGamesCount===1 ?
        `A total of $${totalMoneyRaised} has been raised for ${GAMES_JSON.length} games. Currently, ${unfundedGamesCount} game remains unfunded. We need your help to fund these amazing games!` 
        :
        `A total of $${totalMoneyRaised} has been raised for ${GAMES_JSON.length} games. Currently, ${unfundedGamesCount} games remains unfunded. We need your help to fund these amazing games!` 
    }
`

const displayStrEle = document.createElement('p');
    displayStrEle.innerText = displayString;
descriptionContainer.appendChild(displayStrEle);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item
