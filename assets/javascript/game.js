$(document).ready(function(){
    var landmarks=[ "statue of liberty", "eiffel tower", "big ben","leaning tower of pisa","colosseum", "empire state building", "hollywood sign","golden gate bridge","notre dame", "tokyo tower", "london eye","st.peter's basilica", "sagrada familia", "little mermaid", "great wall of china", "sydney opera house","st.basil's cathedral","arc de triomphe",
"berlin wall", "stonehenge","taj mahal", "pyramids of giza", "the great sphinx", "tower bridge", "the forbidden city in china"
, "mount everest", "capitol hill", "sears tower","brooklyn bridge","burj al arab hotel","trevi fountain"," times square",
"the white house", "louvre museum","buckingham palace", "pompeii", "versailles", "machu picchu", "the grand canyon", "mount rushmore", "space needle", "mount fuji"]
// Sometimes I will go out with semicolon since I have somewhat hardtime tracking it 
const maxGuess= 9;
var pauseGame= false;
var guessedLetters = [];
var guessingWord=[];
var wordToMatch;
var numGuess;
var wins=0;

resetGame();

//keypress

document.onkeypress= function(event) {
    if (isAlpha(event.key)&& !pauseGame){
        checkForLetter(event.key.toUpperCase())
    }
}
 
//starting code for game function 
// double check to see whether letter is in word 
//also adding sound to wrong and correct answer

function checkForLetter(letter){
    var foundLetter=false;
    var correctSound= document.createElement("audio");
    var incorrectSound= document.createElement("audio");
    correctSound.setAttribute("src", "assets/sounds/chimes-glassy.mp3");
    incorrectSound.setAttribute("src","assets/sounds/glitch-in-the-matrix.mp3");

    for (var i=0, q=wordToMatch.length; i<q; i++) {
        if (letter === wordToMatch[i]) {
            guessingWord[i]=letter;
            foundLetter= true;
            correctSound.play();
        if (guessingWord.join("") === wordToMatch){
            wins++;
            pauseGame= true;
            updateDisplay();
            setTimeout(resetGame,4000);
        }
        }
    }
    // to check whether incorrect guess is already on the list
if (!foundLetter) {
    incorrectSound.play();
    if (!guessedLetters.includes(letter)){
        guessedLetters.push(letter);
        numGuess--
// what I did there was to add incorrect letter to guessed letter list and show the number of remaining guess
    }
    if (numGuess===0){
        guessingWord=wordToMatch.split();
        pauseGame= true;
        setTimeout(resetGame, 4000);
    }
}
updateDisplay ();
}

//making sure that the keypressed is between a-z 
function isAlpha (ch){
    return /^[A-Z]$/i.test(ch);
}

function resetGame(){
    numGuess=maxGuess;
    pauseGame=false;


wordToMatch=landmarks[Math.floor(Math.random()*landmarks.length)].toUpperCase(
)
console.log(wordToMatch);

guessedLetters=[];
guessingWord=[];
// reset the word array

//reset the gussed word

for (var i=0, q=wordToMatch.length;i<q; i++) {
    if (wordToMatch[i]===" "){
        guessingWord.push(" ");
    }
    else {
        guessingWord.push("_");
    }
}

//basically setting the code to put a space instead of an underscore between multiwords 

updateDisplay();
}

function updateDisplay(){
    document.getElementById("Winstotal").innerText=wins;
    document.getElementById("currentWord").innerText= guessingWord.join("");
    document.getElementById("guessesRemaining").innerText=numGuess;
    document.getElementById("guessedLetters").innerText= guessedLetters.join("");
}
})