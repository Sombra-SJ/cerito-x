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
        if (board[index] !== "" || !gameActive) return;

        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        cells[index].classList.add(currentPlayer);

        checkResult();
      };

      const checkResult = () => {
        let roundWon = false;

        for (let [a, b, c] of winningConditions) {
          if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
          }
        }

        if (roundWon) {
          gameActive = false;
          showTemporaryMessage(`Jugador ${currentPlayer} ¡Ganó!`);
          return;
        }

        if (!board.includes("")) {
          gameActive = false;
          showTemporaryMessage("¡Empate!");
          return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
      };

      const resetGame = () => {
        currentPlayer = "X";
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        cells.forEach(cell => {
          cell.textContent = "";
          cell.classList.remove("X", "O");
        });
      };

      const showTemporaryMessage = (msg) => {
        const messageBox = document.createElement("div");
        messageBox.textContent = msg;
        messageBox.style.position = "fixed";
        messageBox.style.top = "50%";
        messageBox.style.left = "50%";
        messageBox.style.transform = "translate(-50%, -50%)";
        messageBox.style.background = "#00ffff"; // cian
        messageBox.style.color = "#121212";
        messageBox.style.padding = "20px 40px";
        messageBox.style.borderRadius = "10px";
        messageBox.style.boxShadow = "0 0 20px rgba(0, 255, 255, 0.9)";
        messageBox.style.fontSize = "1.5rem";
        messageBox.style.zIndex = "999";
        document.body.appendChild(messageBox);

        setTimeout(() => {
          document.body.removeChild(messageBox);
          resetGame();
        }, 2000);
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
