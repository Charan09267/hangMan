const hangManImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const guessesText = document.querySelector(".gusses-text b");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");




let currentWord,correctLetter=[] ,  wrongGuessCount = 0;
const maxGuesses = 6;

const resetGame = ()=>{
  //resetting
  correctLetter = [];
  wrongGuessCount =0;
  hangManImage.src = `images/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `${wrongGuessCount}/${maxGuesses}`;
  keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
  wordDisplay.innerHTML = currentWord.split("").map(()=> `<li class="letter"></li>`).join("");
  gameModal.classList.remove("show");
}

const getRandomWord = ()=>{
  //displaying hints and words
  const { word , hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  document.querySelector(".hint-text b").innerText  = hint;
  resetGame();
  

}

const gameOver = (isVictory) =>{
  //currect or wrong word with deatils 
  setTimeout(() =>{
    const modalText = isVictory ? `You found the word` : `The correct word was:`;
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' :'lost'}.gif` ;
    gameModal.querySelector("h4").innerText = `${isVictory ? 'congrats!': 'GameOver!'}`
    gameModal.querySelector("p").innerHTML = `${modalText} <b> ${currentWord}</b>`
    gameModal.classList.add("show");
  },300);
}

const intitGame = (button , clickedLetter) =>{
  // checking if clicked letter is existed on the current word
  if(currentWord.includes(clickedLetter)){
    //showing all the correct letters on the word display
    [...currentWord].forEach((letter,index) =>{
      if(letter === clickedLetter){
        correctLetter.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    })
  }else{
    //wrong click image display
    wrongGuessCount++;

    hangManImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount}/${maxGuesses}`;

  //calling gameOver funtion if any of the conditions meet
  if(wrongGuessCount === maxGuesses)  return gameOver(false);
  if(correctLetter.length  === currentWord.length)  return gameOver(true);
}

//creating keyboard buttons
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener('click', e => intitGame(e.target,String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener('click', getRandomWord);