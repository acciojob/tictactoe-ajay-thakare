 const btn = document.getElementById("submit");

    // btn event listener
    btn.addEventListener("click", () => {
      const player1 = document.getElementById("player1").value;
      const player2 = document.getElementById("player2").value;

      let currentPlayer = "x";
      let moves = 0;
      let gameOver = false;

      document.querySelector(".container").innerHTML =
        `<div class="message">${player1}, you're up</div>`;

      const message = document.querySelector(".message");

      const board = document.createElement("div");
      board.className = "board";

      const winPatterns = [
        //row
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        //col
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        //digonal
        [1, 5, 9],
        [3, 5, 7],
      ];

      function checkWinner() {
        for (let pattern of winPatterns) {
          const [a, b, c] = pattern;

          const cellA = document.getElementById(a);
          const cellB = document.getElementById(b);
          const cellC = document.getElementById(c);

          if (
            cellA.textContent !== "" &&
            cellA.textContent === cellB.textContent &&
            cellB.textContent === cellC.textContent
          ) {
            message.textContent =
              currentPlayer === "x"
                ? `${player1} congratulations you won!`
                : `${player2} congratulations you won!`;

            gameOver = true;

            return true;
          }
        }
        return false;
      }

      for (let i = 1; i < 10; i++) {
        const cell = document.createElement("div");
        cell.id = i;
        cell.className = "cell";
        board.appendChild(cell);

        // cell event listner
        cell.addEventListener("click", () => {
          if (cell.textContent !== "") return;
          if (gameOver) return;

          cell.textContent = currentPlayer;
          moves++;

          const hasWon = checkWinner();
          if (hasWon) return;

          if (moves === 9) {
            message.textContent = "It's a draw!";
            gameOver = true;
            return;
          }

          currentPlayer = currentPlayer === "x" ? "o" : "x";

          message.textContent =
            currentPlayer === "x"
              ? `${player1}, you're up`
              : `${player2}, you're up`;
        });
      }

      document.querySelector(".container").appendChild(board);
    });