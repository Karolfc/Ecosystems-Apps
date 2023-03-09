const NGROK = `${window.location.hostname}`;
let socket = io(NGROK, { path: '/real-time' });
console.log('Server IP: ', NGROK);

let deviceWidth, deviceHeight = 0;
let mupiWidth, mupiHeight = 0;

let raquetaWidth = 170;
let raquetaHeight = 30;
let controllerX, controllerY = 0;

let ballSize = 20;
let ballX = 100;
let ballY = 10;
let ballSpeedX = 5;
let ballSpeedY = 4;

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
    controllerX = windowWidth / 2;
    controllerY = windowHeight / 2;
    mupiWidth = windowWidth;
    mupiHeight = windowHeight;
    background(0);
}

function draw() {
    background(0);
    fill(0, 180, 216);
    ellipse(ballX, ballY, ballSize);
    rect(controllerX, controllerY + 280, raquetaWidth, raquetaHeight);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX < ballSize/2 || ballX > width - ballSize/2) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY < ballSize/2 || ballY > height - ballSize/2) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX >= controllerX && ballX <=controllerX + raquetaWidth && ballY >= controllerY + 280 && ballY <= controllerY + windowHeight-280) {
        ballSpeedY = -ballSpeedY;
    }
}

function mouseDragged() {
    socket.emit('positions', { controlX: pmouseX, controlY: pmouseY });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor(x, y) {
    noStroke();
    fill(255);
    ellipse(x, y, 10, 10);
}

socket.on('mupi-instructions', instructions => {
    console.log('ID: ' + socket.id);
    let { rotationX, rotationY, rotationZ } = instructions;
    controllerX = (rotationX * mupiHeight) / 90;
});

socket.on('mupi-size', deviceSize => {
    let { deviceType, windowWidth, windowHeight } = deviceSize;
    deviceWidth = windowWidth;
    deviceHeight = windowHeight;
    console.log(`User is using an ${deviceType} smartphone size of ${deviceWidth} and ${deviceHeight}`);
});