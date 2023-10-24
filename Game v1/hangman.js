var words = [
    "мистер",
    "танк",
    "профессионал",
    "майнкрафт",
    "слово",
    "ноутбук",
    "мышь",
    "школа",
    "друзья",
    "телефон",
    "адаптер",
    "тетрадь",
    "ручка",
    "калач",
    "книга",
    "черчение",
    "дневник",
    "часы",
    "наушники",
    "провод",
    "ластик",
    "линейка",
    "циркуль",
    "учебник",
    "пират",
    "учительница",
    "команда",
    "автобус",
    "подарок",
    "радуга",
    "стадион",
    "щенок",
    "луна",
    "сокровище",
    "заяц",
    "торт",
    "фломастер",
    "рыбак",
    "парк",
    "ромашка",
    "путешествие",
    "бумага",
    "аист",
    "щука",
    "писатель",
    "математика",
    "счёт",
    "меню",
    "успех",
    "стол",
    "велосипед",
    "пирамида",
    "число",
];
function greeting(turnCount) {
    alert("\"Виселица\"-игра на угадывание слов. В нашем варианте компьютер " +
        "будет загадывать слово, а вы отгадывать его. У Вас будет " +
        turnCount + " попыток.");
}

function intro(answerArray) {
    alert("Загаданое компьютером слово: " + answerArray.join(" "));
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

function getGuess() {
    return prompt("Угадайте букву или нажмите Отмена для выхода из игры.");
}

function notifyAboutRightAnswer(answerArray) {
    alert("Введённая вами буква верна: " + answerArray.join(" "));
}

function notifyAboutWrongAnswer(answerArray, turnCount) {
    alert("К сожалению, этой буквы в слове нет: " + answerArray.join(" ") +
        ". У Вас осталось попыток: " + turnCount + ".");
}

function askForSingleLetter() {
    alert("Пожалуйста, введите только одну букву.");
}

function openLettersAndNotify(guess, word, answerArray, remainingLetters, turnCount) {
    guess = guess.toLowerCase();
    var correctLetter = false;
    for (var j = 0; j < word.length; j++) {
        if (word[j] === guess && answerArray[j] == "_") {
            answerArray[j] = guess;
            remainingLetters--;
            correctLetter = true;
        }
    }
    if (remainingLetters > 0) {
        if (correctLetter === false) {
            turnCount--;
            notifyAboutWrongAnswer(answerArray, turnCount);
        } else {
            notifyAboutRightAnswer(answerArray);
        }
    }
    return {
        newRemainingLetters: remainingLetters,
        newTurnCount: turnCount,
    }
}

function showAnswerAndRatePlayer(userExited, turnCount, word) {
    if (userExited) {
        alert("Очень жаль что вы завершили игру! Возвращайтесь в нашу игру. " +
            "Было загадано слово: \"" + word + "\".");
    } else if (turnCount === 0) {
        alert("К сожалению, попытки кончились! Было загадано слово: \"" + word +
            "\".");
    } else {
        alert("Победа! Было загадано слово: \"" + word + "\".");
    }
}

function startGame() {
    var word = pickWord(words);
    var turnCount = 11;
    var answerArray = setupAnswerArray(word);
    var remainingLetters = word.length;
    var userExited = false;

    greeting(turnCount);
    intro(answerArray);
    while (remainingLetters > 0 && turnCount > 0) {
        var guess = getGuess();
        if (guess === null) {
            userExited = true;
            break;
        } else if (guess.length !== 1) {
            askForSingleLetter();
        } else {
            var newGameState = openLettersAndNotify(guess, word, answerArray,
                remainingLetters, turnCount);
            remainingLetters = newGameState.newRemainingLetters;
            turnCount = newGameState.newTurnCount;
        }
    }
    showAnswerAndRatePlayer(userExited, turnCount, word);
}
