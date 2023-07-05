// cronómetro a contar o tempo de jogo//
function startTime() {
    let second = 0;

    setInterval(function () {
        $("#seconds").html(pad(++second % 60));
        $("#minutes").html(pad(parseInt(second / 60, 10)));
    }, 1000);
}

let playerRed = "R";
let playerYellow = "Y";
let player1 = $("#player1").val()
let player2 = $("#player2").val()
//Começar no jogador com as fichas vermelhas
let currPlayer = playerRed;

let gameOver = false;
let board;

let rows = 6;
let columns = 7;
let currColumns = [];

window.onload = function () {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            // criação de 42 divs com os círculos//
            let hole = document.createElement("div");
            hole.id = r.toString() + "-" + c.toString();
            hole.classList.add("hole");
            hole.addEventListener("click", setPiece);
            document.getElementById("board").append(hole);
        }
        board.push(row);


    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let r;
    let c = parseInt(coords[1]);

    r = currColumns[c];

    if (r < 0) {
        return;
    }

    board[r][c] = currPlayer; // atualizar o jogo
    let hole = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        hole.classList.add("red-piece");
        $("#jogador1").removeClass("playing");
        $("#jogador2").addClass("playing");
        currPlayer = playerYellow;
    } else {
        hole.classList.add("yellow-piece");
        $("#jogador2").removeClass("playing");
        $("#jogador1").addClass("playing");
        currPlayer = playerRed;
    }

    r -= 1;
    currColumns[c] = r; //atualizar o array

    checkWinner();
}

function checkWinner() {
    // possibilidades de vencer na horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // possibilidades de vencer na vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // possibilidades de vencer na diagonal \\>>
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // possibilidades de vencer na diagonal <<//
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

//Verificar vencedor e colocar na função de checkWinner em todas as possibilidades
function setWinner(r, c) {
    let winningPlayer;
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winningPlayer = player1;
    } else {
        winningPlayer = player2;
    }
    winner.innerText = `${winningPlayer} Vence`;
    updateHistory("Quatro em Linha", winningPlayer);
    gameOver = true;
    $("#show").show();
}

function handleStartGame() {
    //guardar nome dos players
    player1 = $("#player1").val()
    player2 = $("#player2").val()
    //caso os inputs dos jogadores não estejam preenchidos não avança
    if (!player1 || !player2) {
        return;
    }
    $("#jogador1").text(player1)
    $("#jogador2").text(player2)
    $("#menu").hide();
    $("#game").show();
    startTime()
}




