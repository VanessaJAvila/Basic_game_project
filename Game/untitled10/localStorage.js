
function pad(value) {
    return value > 9 ? value : "0" + value;
}

function updateHistory(game_name, winner, time,level) {
    let currentHistory = JSON.parse(localStorage.getItem("history") || "[]");
    let now = new Date();
    currentHistory.unshift({
            level : level,
            game_name: game_name,
            winner: winner,
            time: time,
            date:  now.toLocaleDateString()+' às ' + pad(now.getHours()) + ':' + pad(now.getMinutes()),
        }
    )
    localStorage.setItem("history", JSON.stringify(currentHistory))
}
