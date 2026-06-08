(function () {
    'use strict'
    console.log('reading JS');

    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const score = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');

    //object 
    const gameData = {
        dice: ['1die.jpg', '2die.jpg', '3die.jpg',
            '4die.jpg', '5die.jpg', '6die.jpg'],
        players: ['player 1', 'player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 30
    };

    startGame.addEventListener('click', function () {
        gameData.index = Math.round(Math.random());
        console.log(gameData.index);

        gameControl.innerHTML = '<h2> The game has started </h2>';
        gameControl.innerHTML += '<button id="quit"> Wanna Quit? </button>';

        //Restart the game if someone quit
        document.querySelector("#quit").addEventListener('click', function () {
            gameData.score = [0, 0];
            gameData.index = Math.round(Math.random());
            score.innerHTML = '';
            setUpTurn();
        });
        setUpTurn();
    })

    //StartGame ends here
    function setUpTurn() {
        game.innerHTML = `<p> Roll the dice for the ${gameData.players[gameData.index]
            } </p>`;
        actionArea.innerHTML = '<button id="roll"> Roll the Dice</button>';

        document.querySelector("#roll").addEventListener('click', function () {
            throwDic();
        })
    }

    function throwDic() {

        //clear out 
        actionArea.innerHTML = " ";

        //roll dice to get num from 0 - 5.99 which rounds down. add 1 to get 6
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;

        game.innerHTML = `<p> Roll the dice for ${gameData.players[gameData.index]
            }</p>`;
        game.innerHTML += `<img src ="images/${gameData.dice[gameData.roll1 - 1]
            }"> <img src="images/${gameData.dice[gameData.roll2 - 1]
            }">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;



        if (gameData.rollSum === 2) {
            game.innerHTML += '<p> Snap! Snake eyes!</p>'
            //set score for current player 
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            //wait 2 sec
            setTimeout(setUpTurn, 2000);
        }
        else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p> Sorry, one of your rolls was a one, switching to ${gameData.players[gameData.index]}<\p>`;
            setTimeout(setUpTurn, 2000);

        }
        else {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            score.innerHTML = `<p>Player 1: ${gameData.score[0]} | Player 2: ${gameData.score[1]}</p>`;
            checkWinningCondition();
            actionArea.innerHTML = `<button id ="rollagain">Roll again </button> or <button id="pass"> Pass</button>`;

            document.querySelector('#rollagain').addEventListener('click', function () {
                throwDic();
            })

            document.querySelector('#pass').addEventListener('click', function () {
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn()
            }
            )
        }
    }

    function checkWinningCondition() {
        if (gameData.score[gameData.index]
            > gameData.gameEnd
        ) {
            score.innerHTML = `<h2> ${gameData.players[gameData.index]
                } wins with ${gameData.score[gameData.index]
                } points! </h2>`;

            actionArea.innerHTML = '';
            document.querySelector('#quit').innerHTML = 'Start a New Game';
        }

        else {
            score.innerHTML = `<p> Score is currently <strong> ${gameData.players[0]
                }: 
                ${gameData.score[0]} <strong> and <strong> ${gameData.players[1]}:
                ${gameData.score[1]
                } <strong></p>`



        }
    }

    function showCurrentScore() {
        score.innerHTML = `<p> The score is currently <strong> ${gameData.players[0]}
        ${gameData.score[0]} <strong> and <strong> ${gameData.players[1]}; 
        ${gameData.score[1]}<strong>
        </p>`;
    }

})();
