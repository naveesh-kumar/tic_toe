var Tictactoe = (function () {

    var player1, player2, cellTapped = 0, gameOver = false;

    function onCellClick(currentCell, row, column) {
        var html = currentCell.innerHTML.trim();
        if (gameOver == false && (!html || html == "&nbsp;")) {

            var player = (cellTapped % 2) === 0 ? 1 : 2;

            if (player == 1) {
                currentCell.innerHTML = "X";
                updatePlayerTurn(player2);
            } else {
                currentCell.innerHTML = "O";
                updatePlayerTurn(player1);
            }

            cellTapped++;

            if (hasMatchedColumn(column) == true) {
                highlight(row, column, 'col');
                gameOver = true;
                showCongratulationMsg(player == 1 ? player1 : player2);
            }

            if (hasMatchedRow(row) == true) {
                highlight(row, column, 'row');
                gameOver = true;
                showCongratulationMsg(player == 1 ? player1 : player2);
            }

            if (hasMatchedDiagonal(row, column) == true) {
                highlight(row, column, 'diagonal');
                gameOver = true;
                showCongratulationMsg(player == 1 ? player1 : player2);
            }

        }
    }

    function startGame(ev) {
        ev.preventDefault();

        var target = ev.target;

        player1 = target.player1.value;
        player2 = target.player2.value;

        if (!player1) {
            alert("Please provide Player-1 name");
            return false;
        } else if (!player2) {
            alert("Please provide Player-2 name");
            return false;
        } else if (player1 == player2) {
            alert("Player name cannot be same");
            return false;
        }

        var startupEle = document.getElementById("startup");
        var gameboardEle = document.getElementById("gameboard");
        var player1NameEle = document.getElementById("player1Name");
        var player2NameEle = document.getElementById("player2Name");

        startupEle.setAttribute("class", "hide");
        gameboardEle.setAttribute("class", "show");
        player1NameEle.innerHTML = player1;
        player2NameEle.innerHTML = player2;
        updatePlayerTurn(player1);
        buildGameBoard();
    }

    function restartGame() {
        var c = window.confirm("Do you want to restart the game?");

        if (c == true) {
            window.location.reload();
        }
    }

    function resetGame() {
        var cells = document.getElementsByClassName("col-md-4");
        cellTapped = 0;
        updatePlayerTurn(player1);
        gameOver = false;
        buildGameBoard();
    }

    function hasMatchedRow(rowIndex) {
        var arr = [],
            value = "";

        for (var i = 0; i < 3; i++) {
            value = getCellValue(rowIndex, i);
            if (!value) continue;
            arr.push(value);
        }

        return hasFullfilled(arr.join("-"));
    }

    function hasMatchedColumn(columnIndex) {
        var arr = [],
            value = "";

        for (var i = 0; i < 3; i++) {
            value = getCellValue(i, columnIndex);
            if (!value) continue;
            arr.push(value);
        }

        return hasFullfilled(arr.join("-"));
    }

    function hasMatchedDiagonal(rowIndex, columnIndex) {
        var arr = [],
            value = "";

        for (var i = 0; i < 3; i++) {
            value = getCellValue(i, 2 - i);
            if (!value) continue;
            arr.push(value);
        }

        if (!hasFullfilled(arr.join("-"))) {
            arr = [];
            for (var i = 0; i < 3; i++) {
                value = getCellValue(i, i);
                if (!value) continue;
                arr.push(value);
            }
        }

        return hasFullfilled(arr.join("-"));

    }

    function getCellValue(rowIndex, columnIndex) {
        var validValue = ["X", "O"];
        var ele = document.getElementById('row-' + rowIndex + '-col-' + columnIndex);
        var value = (ele && ele.innerHTML) ? ele.innerHTML : "";
        return (validValue.indexOf(value) != -1) ? value : "";
    }

    function buildGameBoard() {
        var template = "",
            applyBorderBottom = "";

        for (var i = 0; i < 3; i++) {
            applyBorderBottom = (i != 2) ? "tictoeborder-bottom" : "";
            template += '<div class="row">';
            template += ' <div class="col-md-4 tictoeborder-right ' + applyBorderBottom + ' text-center" id="row-' + i + '-col-0" onclick="tictactoe.onCellClick(this, ' + i + ', 0)">&nbsp;</div>';
            template += ' <div class="col-md-4 tictoeborder-right ' + applyBorderBottom + ' text-center" id="row-' + i + '-col-1" onclick="tictactoe.onCellClick(this, ' + i + ', 1)">&nbsp;</div>';
            template += ' <div class="col-md-4 ' + applyBorderBottom + ' text-center" id="row-' + i + '-col-2" onclick="tictactoe.onCellClick(this, ' + i + ', 2)">&nbsp;</div>';
            template += '</div>';
        }

        document.getElementById("gameboard-content").innerHTML = template;
    }

    function hasFullfilled(str) {
        return ('X-X-X' == str || 'O-O-O' == str) ? true : false;
    }

    function highlight(row, col, type) {
        var id = "";
        for (var i = 0; i < 3; i++) {
            if (type == "row") {
                id = 'row-' + row + '-col-' + i;
            } else if (type == "col") {
                id = 'row-' + i + '-col-' + col;
            } else if (type == "diagonal") {
                id = 'row-' + i + '-col-' + i;
            }
            document.getElementById(id).style.color = "green";
        }
    }

    function updatePlayerTurn(playerName) {
        document.getElementById("playerTurn").innerHTML = playerTurnMsg(playerName);
    }

    function showCongratulationMsg(playerName) {
        alert("Congrats " + playerName + ", you have won the match.");
    }

    function playerTurnMsg(playerName) {
        return playerName + " its your turn";
    }

    return {
        onCellClick: onCellClick,
        startGame: startGame,
        restartGame: restartGame,
        resetGame: resetGame
    }

});