let myPlatform;
let myBall;
let isPaused = false;
let isEnd = false;
let interval;


function startGame() {
    if (isPaused === false || isEnd === true) {
        isEnd = false;
        isPaused = false;
        clearInterval(interval);
        myPlatform = new platform(200, 15, "green", 200, 360);
        myBall = new ball(20, "yellow", 100, 100);
        myGameArea.start();
    } else {
        isPaused = false;
    }

}

function platform(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function ball(r, color, x, y) {
    this.radious = r;
    this.speedX = 5;
    this.speedY = 5;
    this.x = x;
    this.y = y;
    this.update = function () {
        const ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radious, 0, 2 * Math.PI);
        ctx.fill();
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.collisionPlatform = function (x, y, width) {
        if ((this.y === y - this.radious) && ((this.x < x + width) && (this.x > x))) {
            this.speedY = (-1) * this.speedY;
        }
    }
    this.collisionBall = function () {
        if (this.y === 20) {
            this.speedY = (-1) * this.speedY;
        }
        if ((this.x === 600) || (this.x === 10)) {
            this.speedX = (-1) * this.speedX;
        }
    }
    this.collisionDown = function () {
        if (this.y > 400) {
            ctx.font = "40px Arial";
            ctx.fillStyle = "blue";
            ctx.fillText("Koniec gry", 220, 200);
            isEnd = true;
            clearInterval(interval);
        }
    }

}
const myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.canvas.style = "text-align:center";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }
}

function updateGameArea() {
    if (isPaused === false) {
        myGameArea.clear();
        myBall.collisionBall();
        myBall.collisionPlatform(myPlatform.x, myPlatform.y, myPlatform.width);
        myBall.newPos();
        myBall.update();
        myPlatform.newPos();
        myPlatform.update();
        myBall.collisionDown();
    } else {
        ctx.font = "40px Arial";
        ctx.fillStyle = "blue";
        ctx.fillText("Stop", 250, 200);
    }

}

function moveleft() {
    myPlatform.speedX = -10;
}

function moveright() {
    myPlatform.speedX = 10;

}

function clearmove() {
    myPlatform.speedX = 0;
    myPlatform.speedY = 0;
}

function pauseGame() {
    isPaused = true;
}

window.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        case 37:
            moveleft();
            break;
        case 39:
            moveright();
            break;
    }
}, false);

window.addEventListener('keyup', function (event) {
    switch (event.keyCode) {
        case 37:
            clearmove();
            break;
        case 39:
            clearmove();
            break;
    }
}, false);