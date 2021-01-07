console.log('Hello Sexy');


////// Create a Internal Class to track our Game of Our Board

var Game = function() {
  this. currentPlayer = "X";
  this.board =[
    ["","",""],
    ["","",""],
    ["","",""],
  ];

}


/////// Define User Events //////////
//// User Clicks a Space
Game.prototype.toggleSpace = function(e) {
  console.log(e);

  var [rowi, coli] = e.target.id.split("");
  // debugger;

  this.board[rowi][coli] = this.currentPlayer;
  e.target.innerText = this.currentPlayer;

  if (this.checkWin(rowi, coli)) {
    console.log("WE HAVE A WINNER");
  } else {
    this.togglePlayer(this.currentPlayer)
  }


}

Game.prototype.togglePlayer = function() {
  this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";

  console.log(`next player ${this.currentPlayer}`);

  document.getElementById('currentPlayer').innerHTML = this.currentPlayer;

}

Game.prototype.checkWin = function(rowi, coli) {

  var count = 0;
  /// Check Row
  for (var square of this.board[rowi]) {
    if (square !== this.currentPlayer) {
      break
    }
    count++;
  }

  if (count === 3) {
    return (true)
  }

  /// Check Col
  count = 0;

  for (var i = 0; i < this.board.length; i++) {
    if (this.board[i][coli] !== this.currentPlayer) {
      break
    }
    count ++;
  }

  if (count === 3) {
    return (true)
  }

  // Diagnals
  count = 0;

  const majorDiagnal = ["00", "11", "22"]
  const minorDiagnal = ["20", "11", "02"]

  let dignal = null;
  if (majorDiagnal.indexOf(rowi + coli) > -1) {
    dignal = majorDiagnal;
  } else if (minorDiagnal.indexOf(rowi + coli) > -1) {
    dignal = minorDiagnal;
  }

  // debugger;

  if (dignal) {
    for (var i = 0; i < dignal.length; i++) {
      var [rowi, coli] = dignal[i].split("");

      if (this.board[rowi][coli] !== this.currentPlayer) {
        break
      }
      count ++;
    }
  }

  if (count === 3) {
    return (true)
  }

  return (false)

}

Game.prototype.onStartUp = function() {
  document.getElementById('currentPlayer').innerHTML = this.currentPlayer;

}

Game.prototype.restart = function() {
  this.board =[
    ["","",""],
    ["","",""],
    ["","",""],
  ];

  this.currentPlayer = "X";

  var spaces = document.getElementsByClassName('space');

  for (var space of spaces) {
    space.innerHTML= "-";
  }

  document.getElementById('currentPlayer').innerHTML = this.currentPlayer;

}

///// Create Our Game instace
var game = new Game();
game.onStartUp();


/// Get the Spaces
var spaces = document.getElementsByClassName('space');


for (var space of spaces) {

  space.addEventListener('click', game.toggleSpace.bind(game), false)
}


//// Set Reset Button
document.getElementById('reset').addEventListener('click', game.restart.bind(game), false)

