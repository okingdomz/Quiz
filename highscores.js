const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
//  mapp takes a bunch of items and makes them into something else, sort of like react
    .map( score => {
    return (`<li class="high-score">${score.name} - ${score.score}</li>`);
})
.join(""); 
