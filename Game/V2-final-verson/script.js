(function () {
    'use strict';

    const pickBtn = document.querySelector('#pick');
    const rollBtn = document.querySelector('#roll');
    const againBtn = document.querySelector('#again');
    const passBtn = document.querySelector('#pass');
    const quitBtn = document.querySelector('#quit');
    const gasPedal = document.querySelector('#gas');
    const die1 = document.querySelector('#die1');
    const die2 = document.querySelector('#die2');
    const player1Score = document.querySelector('.player1board');
    const player2Score = document.querySelector('.player2board');
    const player1Car = document.querySelector('#player1Car');
    const player2Car = document.querySelector('#player2Car');
    const player1Track = document.querySelector('#player1Track');
    const player2Track = document.querySelector('#player2Track');

    //Sounds
    const gasSound = document.querySelector('#gasSound');
    const backgroundSound = document.querySelector('#backgroundSound');
    backgroundSound.volume = 0.35;
    gasSound.volume = 1;


    // Storing game scores, players, and current turn
    const gameData = {
        players: ['Player 1', 'Player 2'],
        score: [0, 0],
        currentPlayer: 0,
        gameEnd: 30,
        gameStarted: false,
        pendingRoll1: 0,
        pendingRoll2: 0,
        pendingTotal: 0,
        waitingForGas: false
    };

    // Disabling these buttons before the game starts
    rollBtn.disabled = true;
    againBtn.disabled = true;
    passBtn.disabled = true;

    // random player picker and game refreshing
    pickBtn.addEventListener('click', function () {
        gameData.currentPlayer = Math.round(Math.random());
        gameData.score = [0, 0];
        gameData.gameStarted = true;
        playBackgroundSound();
        resetGameBoard();
        setUpTurn();
    });

    rollBtn.addEventListener('click', rollDice);
    againBtn.addEventListener('click', rollDice);
    gasPedal.addEventListener('click', pressGas);

    // Switching players
    passBtn.addEventListener('click', function () {
        switchPlayer();
        setUpTurn();
    });

    // Quit resets the game without refreshing the page
    quitBtn.addEventListener('click', function () {
        gameData.score = [0, 0];
        gameData.currentPlayer = 0;
        gameData.gameStarted = false;
        resetGameBoard();
        rollBtn.disabled = true;
        againBtn.disabled = true;
        passBtn.disabled = true;
        showMessage('Game reset. Pick a player to start.');
    });

    //Buttons for current player
    function setUpTurn() {
        rollBtn.disabled = false;
        againBtn.disabled = true;
        passBtn.disabled = true;
        gameData.waitingForGas = false;
        showMessage(`${gameData.players[gameData.currentPlayer]}'s turn`);
    }

    // Rolls two dice and waits for the gas pedal before moving
    function rollDice() {
        if (!gameData.gameStarted) {
            showMessage('Pick a player to start first.');
            return;
        }

        const roll1 = Math.floor(Math.random() * 6) + 1;
        const roll2 = Math.floor(Math.random() * 6) + 1;

        showDice(roll1, roll2);
        rollBtn.disabled = true;
        againBtn.disabled = true;
        passBtn.disabled = true;
        const rollTotal = roll1 + roll2;

        if (rollTotal === 2) {
            // Snake eyes resets the current player's score
            gameData.score[gameData.currentPlayer] = 0;
            updateScore();
            moveCars();
            showMessage('Snake eyes! Score goes back to 0.');
            switchPlayer();
            setTimeout(setUpTurn, 1200);
        } else if (roll1 === 1 || roll2 === 1) {
            // Any single one ends the player's turn
            showMessage("You rolled a one. next player's turn.");
            switchPlayer();
            setTimeout(setUpTurn, 1200);
        } else {
            gameData.pendingRoll1 = roll1;
            gameData.pendingRoll2 = roll2;
            gameData.pendingTotal = rollTotal;
            gameData.waitingForGas = true;
            showMessage('Click the gas pedal to move.');
        }
    }

    // Gas pedal applies the safe dice roll to the current player's car
    function pressGas() {
        if (!gameData.waitingForGas) {
            showMessage('Roll the dice first, then press gas.');

            return;
        }

        gameData.waitingForGas = false;
        playSound(gasSound);
        moveCurrentPlayer();
    }

    // Checking if the current player reached the winning score
    function checkWinner() {
        if (gameData.score[gameData.currentPlayer] >= gameData.gameEnd) {
            showMessage(`${gameData.players[gameData.currentPlayer]} wins!`);
            rollBtn.disabled = true;
            againBtn.disabled = true;
            passBtn.disabled = true;
        } else {
            showMessage(`${gameData.players[gameData.currentPlayer]} rolled safely.`);
            rollBtn.disabled = false;
            againBtn.disabled = false;
            passBtn.disabled = false;
        }
    }

    // Switching between Player 1 and Player 2
    function switchPlayer() {
        if (gameData.currentPlayer === 0) {
            gameData.currentPlayer = 1;
        } else {
            gameData.currentPlayer = 0;
        }
    }

    // Updating the scoreboard 
    function updateScore() {
        player1Score.textContent = gameData.score[0];
        player2Score.textContent = gameData.score[1];
    }

    // Moving each car based on its score
    function moveCurrentPlayer() {
        gameData.score[gameData.currentPlayer] += gameData.pendingTotal;
        updateScore();
        moveCars();
        checkWinner();
    }

    function moveCars() {
        const player1Move = getCarMove(gameData.score[0], player1Track, player1Car);
        const player2Move = getCarMove(gameData.score[1], player2Track, player2Car);

        player1Car.style.transform = `translateX(${player1Move}px)`;
        player2Car.style.transform = `translateX(${player2Move}px)`;
    }

    // Making 30 points line up with the end of the track
    function getCarMove(score, track, car) {
        const progress = Math.min(score / gameData.gameEnd, 1);
        const carStart = parseInt(getComputedStyle(car).left);
        const finishBuffer = 10;
        const trackDistance = track.clientWidth - car.offsetWidth - carStart - finishBuffer;

        return progress * trackDistance;
    }

    // Shows the dice image files that match each roll
    function showDice(roll1, roll2) {
        die1.innerHTML = `<img src="images/${roll1}die.png" alt="Die showing ${roll1}">`;
        die2.innerHTML = `<img src="images/${roll2}die.png" alt="Die showing ${roll2}">`;
    }

    // Displaying turn and game messages near the dice
    function showMessage(message) {
        const messageBox = document.querySelector('#message');

        if (messageBox) {
            messageBox.textContent = message;
        } else {
            const newMessage = document.createElement('p');
            newMessage.id = 'message';
            newMessage.textContent = message;
            document.querySelector('#diceArea').appendChild(newMessage);
        }
    }

    // Resetting score, car position, and dice display
    function resetGameBoard() {
        updateScore();
        moveCars();
        die1.textContent = '-';
        die2.textContent = '-';
        gameData.pendingRoll1 = 0;
        gameData.pendingRoll2 = 0;
        gameData.pendingTotal = 0;
        gameData.waitingForGas = false;
    }

    // Keeps the background music playing continuously
    function playBackgroundSound() {
        if (!backgroundSound.paused) {
            return;
        }

        return backgroundSound.play().catch(function () {
            return Promise.resolve();
        });
    }

    // Plays a sound from the beginning
    function playSound(sound) {
        sound.currentTime = 0;
        return sound.play().catch(function () {
            return Promise.resolve();
        });
    }
})();
