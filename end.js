const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem("highScores"))  || [];

const max_high_score = 5;
console.log(highScores);
console.log(JSON.parse(localStorage.getItem("highScores")));
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    console.log(username.value);
    // disables username button if there is nothing typed in the box (!)
    saveScoreBtn.disabled = !username.value;

});


saveHighScore = (e) => {
    console.log("clicked the save button");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);
    // sorted array
    highScores.sort( (a,b) => b.score - a.score)
        // making the high score display from best to worst, and remove the lowest score when a new on appears)
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.replace("index.html");
    console.log(highScores);
};