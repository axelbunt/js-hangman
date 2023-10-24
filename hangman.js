function greeting(turnCount, answerArray) {
    document.getElementById("displayStatus").innerHTML = "\"Виселица\" –  игра на угадывание слов. В нашем варианте " +
    "компьютер будет загадывать слово, а вы отгадывать его. <br>У Вас будет " + turnCount + " попыток.<br>" +
    "Загаданое компьютером слово:<br>" + answerArray.join(" ") + "<br>Нажмите Далее, чтобы начать.";  // полностью описать правила
}

function pickWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

function setupAnswerArray(word) {
    var answerArray = [];
    for (var i = 0; i < word.length; i++) {
        answerArray[i] = "_";
    }
    return answerArray;
}

function openLettersAndNotify(guess, word, answerArray, remainingLetters) {
    var correctLetter = false;
    alreadyUsedLetters.push(guess);
    for (var j = 0; j < word.length; j++) {
        if (word[j] === guess && answerArray[j] == "_") {
            answerArray[j] = guess;
            remainingLetters--;
            correctLetter = true;
        }
    }
    if (remainingLetters == 0) {
        showAnswerAndRatePlayer(turnCount, word);
    } else if (remainingLetters > 0) {
        if (turnCount == 1) {
            if (correctLetter == true) {
                    showAnswerAndRatePlayer(turnCount, word);
            } else {
                turnCount--;
                showAnswerAndRatePlayer(turnCount, word);
            }
        } else {
            if (correctLetter == false) {
                turnCount--;
                document.getElementById("displayStatus").innerHTML = "К сожалению, данной буквы в слове нет:<br>"+answerArray.join(" ")
                 + "<br>У Вас осталось попыток: " + turnCount;
                 document.getElementById("showAlreadyUsedLetters").innerHTML = 'Использованные буквы:<br>' + alreadyUsedLetters.join(', ');;
            } else {
                document.getElementById("displayStatus").innerHTML = "Введённая Вами буква верна:<br>" + answerArray.join(" ")
                 +  "<br>У Вас осталось попыток: " + turnCount;
                 document.getElementById("showAlreadyUsedLetters").innerHTML = 'Использованные буквы:<br>' + alreadyUsedLetters.join(', ');;
        }
        }
    }
    return newGameState = {
        newRemainingLetters: remainingLetters,
        newTurnCount: turnCount,
    };

}

function showAnswerAndRatePlayer(turnCount, word) {
    if (turnCount == 0) {
        document.getElementById("displayStatus").innerHTML = "К сожалению, попытки кончились! Было загадано слово: \""
         + word + "\".";
    } else {
        document.getElementById("displayStatus").innerHTML = "Победа! Было загадано слово: \"" + word + "\".";
    }
    document.getElementById("guessOfPlayer").style.display = 'none';
    document.getElementById("interactWithPlayer").style.display = 'none';
    document.getElementById("confirmActions").style.display = 'none';
    document.getElementById("exitButton").style.display = 'none';
    document.getElementById("restartGame").style.visibility = 'visible';
}

function confirmActions(word, answerArray) {
    if (counterOfConfirmActions % 2 == 0) {
        document.getElementById("displayStatus").innerHTML = "Введите букву, которая по-вашему мнению есть в слове: ";
        document.getElementById("showAlreadyUsedLetters").innerHTML = 'Использованные буквы:<br>' + alreadyUsedLetters.join(', ');
        counterOfConfirmActions += 1;
    } else {
        var guess = document.getElementById("guessOfPlayer").value.toLowerCase();
        if (guess == "" || guess == " " ) {
            document.getElementById("displayStatus").innerHTML = "Введите только <b>одну букву</b>: ";
            document.getElementById("showAlreadyUsedLetters").innerHTML = 'Использованные буквы:<br>' + alreadyUsedLetters.join(', ');
        } else if (alreadyUsedLetters.includes(guess)) {
            document.getElementById("displayStatus").innerHTML = "Вы <b>уже использовали</b> эту букву. Введите новую: ";
            document.getElementById("showAlreadyUsedLetters").innerHTML = 'Использованные буквы:<br>' + alreadyUsedLetters.join(', ');
        } else {
            openLettersAndNotify(guess, word, answerArray, remainingLetters, turnCount);
            remainingLetters = newGameState.newRemainingLetters;
            turnCount = newGameState.newTurnCount;
            counterOfConfirmActions += 1;
        }
    }
}

var turnCount = 11;
var counterOfConfirmActions = 0;
var words = ["мистер", "танк", "профессионал", "майнкрафт", "слово", "ноутбук", "мышь", "школа", "друзья", "телефон", "адаптер", "тетрадь", "ручка", "калач", "книга", "черчение", "дневник", "часы", "наушники", "провод", "ластик", "линейка", "циркуль", "учебник", "пират", "учительница", "команда", "автобус", "подарок", "радуга", "стадион", "щенок", "луна", "сокровище", "заяц", "торт", "фломастер", "рыбак", "парк", "ромашка", "путешествие", "бумага", "аист", "щука", "писатель", "математика", "счёт", "меню", "успех", "стол", "велосипед", "пирамида", "число"];
var alreadyUsedLetters = [];
var word = pickWord(words);
var remainingLetters = word.length;
var answerArray = setupAnswerArray(word);

function startGame(turnCount, answerArray) {
    greeting(turnCount, answerArray);
}

function exitGame(word) {
    document.getElementById("displayStatus").innerHTML = "Очень жаль, что вы завершили игру. Было загадано слово: " + word + ".";
    document.getElementById("guessOfPlayer").style.display = 'none';
    document.getElementById("interactWithPlayer").style.display = 'none';
    document.getElementById("confirmActions").style.display = 'none';
    document.getElementById("exitButton").style.display = 'none';
    document.getElementById("restartGame").style.visibility = 'visible';
}
