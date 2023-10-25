/* 
 * Filename: sophisticated_code.js
 * Description: This code is a sophisticated implementation of a card game called "Blackjack".
 * It follows the traditional rules of Blackjack and allows users to play against a computer dealer.
 */

// Declare global variables
let deck = [];
let players = [];
let currentPlayer = 0;

// Function to create a deck of cards
function createDeck() {
  const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  deck = [];

  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx]
      };
      deck.push(card);
    }
  }

  shuffleDeck();
}

// Function to shuffle the deck of cards
function shuffleDeck() {
  for (let i = 0; i < 1000; i++) {
    let card1Idx = Math.floor(Math.random() * deck.length);
    let card2Idx = Math.floor(Math.random() * deck.length);
    let temp = deck[card1Idx];
    deck[card1Idx] = deck[card2Idx];
    deck[card2Idx] = temp;
  }
}

// Function to deal cards to players
function dealCards() {
  for (let i = 0; i < 2; i++) {
    players.forEach(player => {
      let card = deck.pop();
      player.hand.push(card);
      calculateScore(player);
    });
  }
}

// Function to calculate the score of a player
function calculateScore(player) {
  player.score = 0;
  player.hand.forEach(card => {
    let cardValue = card.value;
    if (cardValue === 'A') {
      if (player.score + 11 > 21) {
        cardValue = 1;
      } else {
        cardValue = 11;
      }
    } else if (cardValue === 'K' || cardValue === 'Q' || cardValue === 'J') {
      cardValue = 10;
    }
    player.score += parseInt(cardValue);
  });
}

// Function to display player's hand and score
function displayHand(player) {
  console.log(`\n${player.name}'s Hand:`);
  player.hand.forEach(card => {
    console.log(`${card.value} of ${card.suit}`);
  });
  console.log(`Score: ${player.score}`);
}

// Function to check if a player has Blackjack
function hasBlackjack(player) {
  return player.score === 21 && player.hand.length === 2;
}

// Function to check if player busts
function isBust(player) {
  return player.score > 21;
}

// Function to simulate the dealer's turn
function simulateDealerTurn() {
  displayHand(players[1]);

  while (players[1].score < 17) {
    let card = deck.pop();
    players[1].hand.push(card);
    calculateScore(players[1]);
    displayHand(players[1]);
  }

  if (isBust(players[1])) {
    console.log('Dealer Busts! You Win!');
  } else {
    compareScores();
  }
}

// Function to compare the scores of player and dealer
function compareScores() {
  if (players[0].score > players[1].score) {
    console.log('You Win!');
  } else if (players[0].score < players[1].score) {
    console.log('Dealer Wins!');
  } else {
    console.log('It\'s a Tie!');
  }
}

// Function to start the game
function startGame() {
  createDeck();

  let playerName = prompt('Enter your name:');
  let player = {
    name: playerName,
    hand: [],
    score: 0
  };
  players.push(player);

  let dealer = {
    name: 'Dealer',
    hand: [],
    score: 0
  };
  players.push(dealer);

  dealCards();

  players.forEach(player => {
    displayHand(player);

    if (hasBlackjack(player)) {
      console.log('Blackjack! You Win!');
    } else if (isBust(player)) {
      console.log('Bust! You Lose!');
    }
  });

  simulateDealerTurn();
}

// Start the game
startGame();