let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};


const scoreElement = document.querySelector('.js-score');

const resultElement = document.querySelector('.js-result');

const finalResultElement = document.querySelector('.js-final-result');

const autoPlayButton = document.querySelector('.auto-play');

document.querySelector('.emoji-r').addEventListener('click',()=>{
  playGame('rock');
})

document.querySelector('.emoji-p').addEventListener('click',()=>{
  playGame('paper');
})

document.querySelector('.emoji-s').addEventListener('click',()=>{
  playGame('scissors');
})

document.querySelector('.reset-score-button').addEventListener('click',reset)

document.querySelector('.auto-play').addEventListener('click',auto)

document.body.addEventListener('keydown', (event) => {

  const key = event.key.toLowerCase();

  if (key === 'r') playGame('rock');
  if (key === 'p') playGame('paper');
  if (key === 's') playGame('scissors');
});

updateScore();


function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else {
      result = 'Tie.';
    }

  } 
  
  else if (playerMove === 'paper') 
  {
      if (computerMove === 'rock') {
        result = 'You win.';
      } else if (computerMove === 'paper') {
        result = 'Tie.';
      } else{
        result = 'You lose.';
      }
    
  } 
  else {
      if (computerMove === 'rock') {
        result = 'Tie.';
      } else if (computerMove === 'paper') {
        result = 'You lose.';
      } else {
        result = 'You win.';
      }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else {
    score.ties += 1;
  }
  
  localStorage.setItem('score', JSON.stringify(score));
  
  finalResultElement.innerText=`${result}`;
  resultElement.innerHTML = `You picked <img src="images/${playerMove}-emoji.png" class="move-icon"> Computer picked <img src="images/${computerMove}-emoji.png" class="move-icon">`;

  updateScore();
}


function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

function updateScore(){

  scoreElement.innerText = `Wins: ${score.wins},Losses: ${score.losses},Ties: ${score.ties}`;

};

function reset(){
  score={
    wins : 0,
    losses : 0,
    ties : 0
  };
  localStorage.setItem('score',JSON.stringify(score));

  updateScore();

  resultElement.innerText='';
  finalResultElement.innerText='';
};

let isplaying=false;
let autoPlayInterval;

function auto(){

  if(!isplaying){

    isplaying=true;
    autoPlayButton.innerText='Stop AutoPlay'

    autoPlayInterval=setInterval(()=>{
      const playermove=pickComputerMove();

      playGame(playermove);
    },1000);

    console.log(autoPlayInterval);

  }
  else
  {
    isplaying=false;
    autoPlayButton.innerText='AutoPlay'

    resultElement.innerText='';

    finalResultElement.innerText='';

    clearInterval(autoPlayInterval);
  }
  

}
