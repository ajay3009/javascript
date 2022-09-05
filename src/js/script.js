const SUITS = ["S", "D", "C", "H"];
const HTML_CODES = {
  S: "&spades;",
  D: "&diams;",
  C: "&clubs;",
  H: "&hearts;",
};
const RANKS = [
  "A",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
const NO_OF_PLAYERS = 4;
const PLAYER_NAMES = ["north", "south", "east", "west"];
const CARD_VALUES = {
  A: 4,
  K: 3,
  Q: 2,
  J: 1,
};

/**
 *
 * @param {*} name
 */

function Player(name) {
  this.name = name;
  this.cards = [];
  this.score = 0;
}

/**
 *
 * @param {*} deck
 */
Player.prototype.hand = function (deck) {
  this.cards = [];
  while (this.cards.length < 13) {
    const index = Math.floor(Math.random() * deck.length);
    this.cards.push(deck[index]);
  }
};

Player.prototype.calculateScore = function () {
  this.cards.forEach((item) => {
    this.score += CARD_VALUES[item.rank] || 0;
  });
};

function CardGame() {
  this.element = document.getElementById("game");
  console.log(this.element);
  this.deck = [];
  this.players = [];
  this.createDeck();
  this.shuffleCards();
  this.element.addEventListener("click", (event) => {
    console.log(event);
    const { btn } = event.target.dataset;
    if (btn === "shuffle") {
      this.shuffleCards.call(this);
    }
  });
}

CardGame.prototype.initPlayers = function () {
  this.players = [];
  PLAYER_NAMES.forEach((name, index) => {
    const player = new Player(name);
    player.hand(this.deck);
    player.calculateScore();
    this.players.push(player);
  });
};

CardGame.prototype.createDeck = function () {
  this.deck = [];
  for (let i = 0; i < SUITS.length; i++) {
    for (let j = 0; j < RANKS.length; j++) {
      this.deck.push({
        rank: RANKS[j],
        suit: SUITS[i],
      });
    }
  }
};

CardGame.prototype.shuffleCards = function () {
  for (let index = this.deck.length - 1; index > -1; index -= 1) {
    randomCard = Math.floor(Math.random() * index);
    [this.deck[index], this.deck[randomCard]] = [
      this.deck[randomCard],
      this.deck[index],
    ];
  }
  this.initPlayers();
  this.displayCards();
};

CardGame.prototype.displayCards = function () {
  this.players.forEach((player) => {
    const element = document.getElementById(player.name);
    element.textContent = "";
    const title = element.parentElement.getElementsByTagName("h3");
    if (title.length) {
      title[0].textContent = `${player.name} (${player.score})`;
    }
    player.cards.forEach((card) => {
      let carditem = document.createElement("div");
      let className = `card rank${card.rank} ${card.suit}`;
      carditem.setAttribute("class", className);
      carditem.innerHTML = card.rank + "<br/>" + HTML_CODES[card.suit];
      element.appendChild(carditem);
    });
  });
};

new CardGame();
