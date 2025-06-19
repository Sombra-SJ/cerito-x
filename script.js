document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("reset");
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const keyMap = {
        "Numpad1": 6, "Numpad2": 7, "Numpad3": 8,
        "Numpad4": 3, "Numpad5": 4, "Numpad6": 5,
        "Numpad7": 0, "Numpad8": 1, "Numpad9": 2,
    };

    const handleCellClick = (index) => {
        if (board[index] !== "" || !gameActive) {
            return;
        }

        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        checkResult();
    };

    const checkResult = () => {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            alert(`Jugador ${currentPlayer} Gano!`);
            gameActive = false;
            return;
        }

        if (!board.includes("")) {
            alert("Empate!");
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
    };

    const resetGame = () => {
        currentPlayer = "X";
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        cells.forEach(cell => (cell.textContent = ""));
    };

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleCellClick(index));
    });

    resetButton.addEventListener("click", resetGame);

    document.addEventListener("keydown", (event) => {
        if (keyMap[event.code] !== undefined) {
            handleCellClick(keyMap[event.code]);
        }
    });
});
