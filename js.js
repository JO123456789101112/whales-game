let currMoleTile;
let currPlantTile;
let score = 0;
let balance = 0; // رصيد الجنيهات
let gameOver = false;

window.onload = function() {
    // إخفاء صفحة التحميل بعد 3 ثوانٍ وفتح صفحة اللعبة
    setTimeout(showGamePage, 3000);
    setControlButtons();
}

function showGamePage() {
    // إخفاء صفحة التحميل
    document.getElementById("splashScreen").style.display = "none";

    // إظهار صفحة اللعبة
    document.getElementById("gamePage").style.display = "block";

    // إعداد اللعبة
    setGame();
}

function setGame() {
    const board = document.getElementById("board");
    board.innerHTML = ""; // تفريغ اللوحة عند إعادة اللعب

    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        board.appendChild(tile);
    }

    score = 0;
    balance = 0;
    gameOver = false;

    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("balance").innerText = "Balance: " + balance + " جنيه";

    setInterval(setMole, 1000);
    setInterval(setPlant, 2000);
}

function setControlButtons() {
    // زر إعادة اللعب
    const retryButton = document.getElementById("retryButton");
    retryButton.onclick = function() {
        setGame(); // إعادة ضبط اللعبة
    };

    // زر السحب
    const withdrawButton = document.getElementById("withdrawButton");
    withdrawButton.onclick = function() {
        // توجيه إلى صفحة السحب مع تمرير الرصيد في الرابط
        window.location.href = `withdrawbg.html?balance=${balance}`;
    };
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) return;

    if (currMoleTile) currMoleTile.innerHTML = "";

    let mole = document.createElement("img");
    mole.src = "./image/download.jpeg";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id === num) return;

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) return;

    if (currPlantTile) currPlantTile.innerHTML = "";

    let plant = document.createElement("img");
    plant.src = "./image/piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id === num) return;

    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) return;

    if (this === currMoleTile) {
        score += 10;

        // تحديث الرصيد بناءً على النقاط
        let newBalance = Math.floor(score / 100);
        if (newBalance > balance) {
            balance = newBalance;
            document.getElementById("balance").innerText = "Balance: " + balance + " جنيه";
        }

        // تحديث النقاط
        document.getElementById("score").innerText = "Score: " + score;
    } else if (this === currPlantTile) {
        // عرض النتيجة النهائية عند انتهاء اللعبة
        document.getElementById("score").innerText = "GAME OVER: " + score;
        document.getElementById("balance").innerText = "Final Balance: " + balance + " جنيه";
        gameOver = true;
    }
}
