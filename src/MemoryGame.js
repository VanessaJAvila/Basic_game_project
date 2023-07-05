let timerInterval; // save the timer info at the end of the game
let levelId; // save the level played
let board = [[1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
    [17, 18, 19, 20]];// board with the game grid

let playerName = $("#playerName");//variable to save player name

let winGame = [];// array with selected pairs

let playNow = true; // boolean variable to temporary hold (after 2 cards selection)

function startTimer() {
    $("#timer").removeAttr("style");/// show the timer removing the previous css style
    let second = 0;

    function pad(value) { // function adds a leading zero.
        return value > 9 ? value : "0" + value;//It checks if the value passed to it is a single digit (less than or equal to 9), then it adds a leading zero.
    }

    timerInterval = setInterval(function () {
        $("#seconds").html(pad(++second % 60));//replaces the innerHTML with the value returned by pad() function.
        $("#minutes").html(pad(parseInt(second / 60, 10)));//given string argument and returns an integer of particular radix.
    }, 1000);
}

const cardArray = [//Array with 10 cards img
    {
        img: 'imagens/formas.png',
    },
    {
        img: 'imagens/geometria.png',
    },
    {
        img: 'imagens/icone_arvore.png',
    },
    {
        img: 'imagens/icone_css.png',
    },
    {
        img: 'imagens/icone_html.png',
    },
    {
        img: 'imagens/icone_js.png',
    },
    {
        img: 'imagens/icone_outras.png',
    },
    {
        img: 'imagens/icone_pc.png',
    },
    {
        img: 'imagens/icone_programmer.png',
    },
    {
        img: 'imagens/icone_react.png',
    }
]


 function levelSelector(level) {
    switch (level) {
        case "Fácil":
            board = board.slice(0, 3); // minimizing the board after click level 1 with 3 array´s
            break;
        case "Médio":
            board = board.slice(0, 4);// adapting the board to level 2 with 4 array´s
            break;
        case "Difícil":// Difficult level board
            break;
    }
    board = createCardsBoard() // function to prepare the board with the img
    alert("Vamos testar a tua memória " + (playerName.val()) + "!"); //alert with player name value
    startGame();//calling function to begin the selected game
}// function with selection structure to set type of board after click at level button

let level1 = $(".level1"); // saving the button
let level2 = $(".level2");
let level3 = $(".level3");

// Check player name existence after each level selection

level1.click(function () {
    if (!playerName[0].checkValidity()) {
        alert("Digita o teu nome");
        return false;
    } else {
        levelSelector("Fácil");
    }
})
level2.click(function () {
    if (!playerName[0].checkValidity()) {
        alert("Digita o teu nome! ");
        return false;
    } else {
        levelSelector("Médio");
    }
})
level3.click(function () {
    if (!playerName[0].checkValidity()) {
        alert("Digita o teu nome");
        return false;
    } else {
        levelSelector("Difícil");
    }
})

// Save the level played

level1.click(function () {
    if (level1) {
        return levelId = "Fácil";
    }
})
level2.click(function () {
    if (level2) {
        return levelId = "Médio";
    }
})
level3.click(function () {
    if (level3) {
        return levelId = "Difícil";
    }
})

//Random card selection

let cards_dup = []; // array to save the cards random selection duplication

function cardsDup() { // function to fill the board with the cards selection

    cardArray.forEach(card => { // insertion of cards img in each element of the grid
        if (cards_dup.length === board.length * 4) {// condition to stop the forEach when the cards img dups are spread by the grid
            return;
        }
        cards_dup.push(card); // save the random img in the cards dup array * 2
        cards_dup.push(card);
    })
}

function randomCardsPairs() {
    let randomImg = Math.floor(Math.random() * cards_dup.length);// Doing a random selection of card image and saving
    let img1 = cards_dup[randomImg];
    cards_dup.splice(randomImg, 1);
    return img1;
}

function createCardsBoard() {
    cardsDup();// calling the function that generate the duplicated cards
    for (let r = 0; r < board.length; r++) {
        let line = board[r];
        for (let c = 0; c < line.length; c++) {
            line[c] = randomCardsPairs();// cicle to fill the rows and columms of the board with the random cards pairs
        }
    }
    return board; //board prepared with random images
}

let memoryGame = $(".memory-game");

function hideMenu() {
    let menu = $("#menu");
    return menu.hide();
}
let firstCard;//variable to save the first clicked card img
let popupContainer = $(".popUp-container");// div to pop up return menu
let popupMenu = $(".popUpMenu");// div to pop up return menu
popupContainer.hide(); //hide popup input

function startGame() {
    hideMenu();//calling the function to hide the level menu once the start is clicked
    startTimer();

    board.forEach(line => {
            let game_line = $("<div class='game-line'></div>");//creating div to game lines
            line.forEach(card => { // function for each element
                let game_place = $("<div class='game-place'></div>");//creating div to place the img at the grid
                game_place.append("<img class='game-img hidden' alt = game src='" + card.img + "'>");//adding front images to the place at the grid
                game_place.append("<img class='game-img' alt = game src='imagens/carta.png'>");//adding back-cards to the place at the grid
                game_place.click(function () { // function to allow click on the game place
                    if (!playNow) {//condition to stop click if variable playNow is with a false value
                        return
                    }
                    let cards = $(this).children()//select the child img inside the div on click.
                    let frontAtual = cards.eq(0); //Reduce the set of matched elements to the one at the specified index
                    cards.toggleClass("hidden");// remove class hidden of cards

                    if (firstCard) {
                        if (firstCard.attr("src") === frontAtual.attr("src")) {//condition to compare the src attr. of the pair selected
                            let wcard = firstCard.attr("src");// variable to save the img src attribute
                            winGame.push(wcard);// add card atribute to win game array
                            checkEndGame();// function to check end  game after each play
                            firstCard = null;// remove the variable value
                        } else {
                            playNow = false;//variable with bolean value to stop player move
                            setTimeout(function () {// function to set the playing time interval
                                firstCard.siblings().removeClass("hidden");//allows us to search through the siblings of these elements and show the first card img
                                frontAtual.siblings().removeClass("hidden");// allows us to search through the siblings of these elements and show the 2nd card img
                                firstCard.addClass("hidden");// hide the 1st card img
                                frontAtual.addClass("hidden");// hide the 2nd card img
                                playNow = true;//variable with bolean value to allow player move
                                firstCard = null;// remove the variable value
                            }, 1000);// interval of 1 sec
                        }
                    } else {
                        firstCard = frontAtual// replacing the first card value to back-face card
                    }
                })
                game_line.append(game_place);// add square spot to memory game div
            })
            memoryGame.append(game_line); // add game line to memory game div
        }
    )
}

function endGame() {
    popupMenu.append(`<p class='pop'>Parabéns ${playerName.val()}!</p>`);// add text to popup div
    popupMenu.append("<button type= 'button' id='backToMeNu' name='Menu'><a href='menu.html'>MENU</a></button>");// adding button with the Menu option to the div
    let timer = $("#minutes").text()+ ":" + $("#seconds").text()
    clearInterval(timerInterval);

    updateHistory("Jogo da Memória", playerName.val(),timer,levelId)
    return popupContainer.show();// the popup menu and congratulations to the winner appear
}

function checkEndGame() {// function to congratulate at the end of the game and go back to menu
    if (board.length === 3 && winGame.length === 6) { // condition // comparison level 1
        endGame()
    }
    if (board.length === 4 && winGame.length === 8) { // condition // comparison level 2
        endGame()
    }
    if (board.length === 5 && winGame.length === 10) { // condition // comparison level 3
        endGame()
    }
}


