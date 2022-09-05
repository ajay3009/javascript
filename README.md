# Introduction

The goal of this challenge is to produce a beautiful and functional web app that shuffles four hands and determines the number of points a hand is worth in bridge.

# Getting Started

Guide users through getting your code up and running on their own system. In this section you can talk about:

- [Installation process](#installation)
- [Usage](#usage)
- [Testing](#test)
- [App Description](#description)

## Installation

To install project's `dependencies`:

```
npm install
```

## Usage

To run the app :

```
npm start
```

Preview of the app:

![alt text](https://github.com/ajay3009/javascript/blob/main/src/images/Game_Snapshot.JPG)

## Test

To test the app :

```
npm test
```

Preview of test cases:

![alt text](https://github.com/ajay3009/javascript/blob/main/src/images/testing_snapshot.JPG)

## Description

Each Player name is appended with the current score of the hand using following logic

**An Ace is worth four points, a King is worth three points, a Queen is worth two, and a Jack is worth one. Other cards are not worth points.**

```
North (5)
```

**Assumptions**:

```diff
- Currently the score of each player is not hidden.
- Cards for opposite team is also not hidden.
```

**Player** class is defined in ES5 that contains name, cards for each player and total score.

```
function Player(name) {
  this.name = name;
  this.cards = [];
  this.score = 0;
}

```

Following methods defined for Player Class :

1. **Hand** : To get the cards in a hand.
2. **calculateScore** : To calculate the score of the player.

**CardGame** class is defined in ES5 that contains element, deck array, players array.

```
function CardGame() {
  this.element = document.getElementById("game");
  this.deck = [];
  this.players = [];
}
```

Following methods defined for CardGame Class :

1. **initPlayers** : To initialize each players with default values.
2. **createDeck**: Create deck for the card game.
3. **shuffleCards** : Shuffle card method.
4. **displayCards** : Display card on the UI.
