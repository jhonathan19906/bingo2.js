//numero de las bolas 
var usedNumbers = new Array(90);
var calledNumbers = new Array();
var goal = "line";

function init() {
    generateNewCard();
}

function generateNewCard() {
    // elementos en la matriz
    resetUsedNumbers();
    // 24 posibilidades 
    for (var i = 0; i < 25; i++) {
        if (i == 12) // skip free square
            continue;
        // genera un numero aleatorio para cada cuadro
        generateSquare(i);
    }
}

function generateSquare(squareNum) {
    var currentSquare = "sq" + squareNum;
    var number;
    // array numero de columna
    var baseNumbers = new Array(0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4);
    // genera un número aleatorio para cada cuadrado (depende de la columna)
    newNumber = (baseNumbers[squareNum] * 15) + generateNewNum();
    // el bucle se asegura de que no haya duplicados
    while (usedNumbers[newNumber] == true) {
        newNumber = (baseNumbers[squareNum] * 15) + generateNewNum();
    }
    // establece el número usado en la matriz como verdadero para que no haya duplicados
    usedNumbers[newNumber] = true;
    // establece el cuadrado actual en el nuevo númeror
    document.getElementById(currentSquare).value = newNumber;
}

function generateNewNum() {
    // genera un número aleatorio entre 1 y 15
    return Math.floor((Math.random() * 15) + 1); //15
}

function resetUsedNumbers() {
    //establece todos los elementos de la matriz usedNumbers en falso (restablece la matriz)
    for (var i = 0; i < usedNumbers.length; i++) {
        usedNumbers[i] = false;
    }
}

// Al hacer clic, genera una nueva carta aleatoria
function generateAnotherCard() {
    resetUsedNumbers();
    generateNewCard();
    resetSquareColours();
}

// restablece todos los cuadrados excepto GRATIS a blanco
function resetSquareColours() {
    for (var i = 0; i < 25; i++) {
        if (i == 12)
            continue;
        var currentSquare = document.getElementById("sq" + i);
        currentSquare.style.backgroundColor = "#ffffff";
    }
    return;
}

function markSquare(square) {
    var currentSquare = document.getElementById(square);
    if (currentSquare.style.backgroundColor == "lightblue") 
        currentSquare.style.backgroundColor = "#ffffff";
    else
        currentSquare.style.backgroundColor = "lightblue";
    return;
}

function callNumber() {
    var rand = Math.floor(Math.random() * 75) + 1; // número aleatorio entre 1 y 75
        // si el número está en la matriz (ya se ha llamado)
    if (calledNumbers.includes(rand))
        callNumber();
    else {
        calledNumbers.push(rand);
        if (rand >= 1 && rand <= 15)
            document.getElementById("currentCall").innerHTML = 'B' + rand;
        else if (rand >= 16 && rand <= 30)
            document.getElementById("currentCall").innerHTML = 'I' + rand;
        else if (rand >= 31 && rand <= 45)
            document.getElementById("currentCall").innerHTML = 'N' + rand;
        else if (rand >= 46 && rand <= 60)
            document.getElementById("currentCall").innerHTML = 'G' + rand;
        else
            document.getElementById("currentCall").innerHTML = 'O' + rand;
        document.getElementById("calledNums").innerHTML = calledNumbers;
    } 
}

function lineBingo() {
    goal = "line";
    document.getElementById("bLine").style.backgroundColor = "#4286f4";
    document.getElementById("bLine").disabled = true;
    document.getElementById("bFull").disabled = true;
    document.getElementById("bFull").style.backgroundColor = "#grey";

}

function fullBingo() {
    goal = "full";
    document.getElementById("bFull").style.backgroundColor = "#4286f4";
    document.getElementById("bFull").disabled = true;
    document.getElementById("bLine").disabled = true;
    document.getElementById("bLine").style.backgroundColor = "#grey";
}

function checkForBingo() {
    if (goal == "line") {
        checkVerticalBingo();
        checkHorizontalBingo();
        checkDiagonalBingo();
        checkCornersBingo();
    }
    else {
        checkFullBingo();
    }
}

function checkVerticalBingo() {
    for (var i = 0; i < 5; i++) {
        var sq1 = document.getElementById('sq' + i);
        var sq2 = document.getElementById('sq' + (i + 5));
        var sq3 = document.getElementById('sq' + (i + 10));
        var sq4 = document.getElementById('sq' + (i + 15));
        var sq5 = document.getElementById('sq' + (i + 20));

        checkLines(sq1, sq2, sq3, sq4, sq5);
    }
}

function checkHorizontalBingo() {
    j = 0;
    for (var i = 0; i < 5; i++) {
        switch(i) {
            case 0: 
                var sq1 = document.getElementById('sq' + i);
                var sq2 = document.getElementById('sq' + (i + 1));
                var sq3 = document.getElementById('sq' + (i + 2));
                var sq4 = document.getElementById('sq' + (i + 3));
                var sq5 = document.getElementById('sq' + (i + 4));
                break;
            case 1: 
                var sq1 = document.getElementById('sq' + (i + 4));
                var sq2 = document.getElementById('sq' + (i + 5));
                var sq3 = document.getElementById('sq' + (i + 6));
                var sq4 = document.getElementById('sq' + (i + 7));
                var sq5 = document.getElementById('sq' + (i + 8));
                break;
            case 2: 
                var sq1 = document.getElementById('sq' + (i + 8));
                var sq2 = document.getElementById('sq' + (i + 9));
                var sq3 = document.getElementById('sq' + (i + 10));
                var sq4 = document.getElementById('sq' + (i + 11));
                var sq5 = document.getElementById('sq' + (i + 12));
                break;
            case 3: 
                var sq1 = document.getElementById('sq' + (i + 12));
                var sq2 = document.getElementById('sq' + (i + 13));
                var sq3 = document.getElementById('sq' + (i + 14));
                var sq4 = document.getElementById('sq' + (i + 15));
                var sq5 = document.getElementById('sq' + (i + 16));
                break;
            case 4: 
                var sq1 = document.getElementById('sq' + (i + 16));
                var sq2 = document.getElementById('sq' + (i + 17));
                var sq3 = document.getElementById('sq' + (i + 18));
                var sq4 = document.getElementById('sq' + (i + 19));
                var sq5 = document.getElementById('sq' + (i + 20));
                break;
        }
        checkLines(sq1, sq2, sq3, sq4, sq5);
    }
}

function checkDiagonalBingo() {
    for (var i = 0; i < 2; i++) {
        switch(i) {
            case 0:
                var sq1 = document.getElementById('sq' + 0);
                var sq2 = document.getElementById('sq' + 6);
                var sq3 = document.getElementById('sq' + 12);
                var sq4 = document.getElementById('sq' + 18);
                var sq5 = document.getElementById('sq' + 24);
                break;
            case 1:
                var sq1 = document.getElementById('sq' + 4);
                var sq2 = document.getElementById('sq' + 8);
                var sq3 = document.getElementById('sq' + 12);
                var sq4 = document.getElementById('sq' + 16);
                var sq5 = document.getElementById('sq' + 20);
                break;
        }
        checkLines(sq1, sq2, sq3, sq4, sq5);
    }
}

function checkCornersBingo() {
    var sq1 = document.getElementById('sq' + 0);
    var sq2 = document.getElementById('sq' + 4);
    var sq3 = document.getElementById('sq' + 20);
    var sq4 = document.getElementById('sq' + 24);

    if (sq1.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq1.value)) &&
            sq2.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq2.value)) &&
            sq3.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq3.value)) &&
            sq4.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq4.value))) {
                youWinCorners(sq1, sq2, sq3, sq4);
                return;
    }
    else {
        document.getElementById("currentCall").innerHTML = "Not a valid bingo! Keep trying!";
        return;
    }
}

function checkFullBingo() {
    var j = 0;
    var flag = false;
    for (var i = 0; i < 5; i++) {
        var sq1 = document.getElementById('sq' + j);
        j++;
        var sq2 = document.getElementById('sq' + j);
        j++;
        var sq3 = document.getElementById('sq' + j);
        j++;
        var sq4 = document.getElementById('sq' + j);
        j++;
        var sq5 = document.getElementById('sq' + j);
        j++;

        if (sq1.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq1.value)) &&
            sq2.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq2.value)) &&
            sq3.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq3.value)) &&
            sq4.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq4.value)) &&
            sq5.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq5.value))) {
                flag = true;
        }
        else if (sq1.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq1.value)) &&
            sq2.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq2.value)) &&
            sq3.value == "FREE" &&
            sq4.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq4.value)) &&
            sq5.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq5.value))) {
                flag = true;
        }
        else {
            flag = false;
            break;
        }
    }
    if (flag == true) {
        youWinFullBingo();
    }
    else {
        document.getElementById("currentCall").innerHTML = "Not a valid bingo! Keep trying!";
        return;
    }
}

function checkLines(sq1, sq2, sq3, sq4, sq5) {
    if (sq1.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq1.value)) &&
        sq2.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq2.value)) &&
        sq3.value == "FREE" &&
        sq4.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq4.value)) &&
        sq5.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq5.value))) {
            youWin(sq1, sq2, sq3, sq4, sq5);
            return;
    }
    else if (sq1.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq1.value)) &&
            sq2.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq2.value)) &&
            sq3.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq3.value)) &&
            sq4.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq4.value)) &&
            sq5.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq5.value))) {
                youWin(sq1, sq2, sq3, sq4, sq5);
                return;
    }
    else {
        document.getElementById("currentCall").innerHTML = "Not a valid bingo! Keep trying!";
        return;
    }
}

function youWin(sq1, sq2, sq3, sq4, sq5) {
    sq1.style.backgroundColor = "yellow";
    sq2.style.backgroundColor = "yellow";
    sq3.style.backgroundColor = "yellow";
    sq4.style.backgroundColor = "yellow";
    sq5.style.backgroundColor = "yellow";
    document.getElementById("bCall").disabled = true;
    document.getElementById("bBingo").disabled = true;
    document.getElementById("currentCall").innerHTML = "BINGO!";
    alert("BINGO! You win!");
    throw new Error("Not an error! Just finishes any execution of the game!");
}

function youWinCorners(sq1, sq2, sq3, sq4) {
    sq1.style.backgroundColor = "yellow";
    sq2.style.backgroundColor = "yellow";
    sq3.style.backgroundColor = "yellow";
    sq4.style.backgroundColor = "yellow";
    document.getElementById("bCall").disabled = true;
    document.getElementById("bBingo").disabled = true;
    document.getElementById("currentCall").innerHTML = "BINGO!";
    alert("BINGO! You win!");
    throw new Error("Not an error! Just finishes any execution of the game!");
}

function youWinFullBingo() {
    document.getElementById("bCall").disabled = true;
    document.getElementById("bBingo").disabled = true;
    document.getElementById("currentCall").innerHTML = "BINGO!";
    alert("BINGO! You win!");
    throw new Error("Not an error! Just finishes any execution of the game!");
}
