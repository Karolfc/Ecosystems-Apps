const URL = `http://${window.location.hostname}:8080`;
let socket = io(URL, {
    path: '/real-time'
});

let leftButton;
let rightButton;
let noButton;

function setup() {
    createCanvas(windowWidth, windowHeight);
    leftButton = {
        x: windowWidth / 4,
        y: windowHeight / 2,
        diameter: 150,
        direction: 'LEFT',
        isPressed: false
    }
    rightButton = {
        x: windowWidth / 4 * 3,
        y: windowHeight / 2,
        diameter: 150,
        direction: 'RIGHT',
        isPressed: false
    }
}

function draw() {
    background(0, 50)
    renderButton(leftButton)
    renderButton(rightButton)
}

function renderButton(button) {
    fill(0, 0, 255)
    circle(button.x, button.y, button.diameter)
}

function buttonPressed(button) {
    if (dist(mouseX, mouseY, button.x, button.y) <= button.diameter / 2) {
        button.isPressed = true
        sendDirection(button)
    }
}

function buttonReleased(button) {
    button.isPressed = false
    return button.isPressed
}

function mousePressed() {
    buttonPressed(leftButton)
    buttonPressed(rightButton)
}

let message = {messageTab: 'The user is not tapping at any button'}

function mouseReleased() {
    buttonReleased(leftButton)
    buttonReleased(rightButton)
    if (!buttonReleased(leftButton) && !buttonReleased(rightButton)) {  //Cuando suceda el buttoReleased de ambos botones(que a ninguno de ellos se le este dando click) debe enviar el mensaje 
        socket.emit('controller-message', message);

        /*___________________________________________

        1) Emit a message when the user is not tapping at any button
        _____________________________________________ */


    }
}

/*___________________________________________

2) Create a function that includes the socket method to emit the directions
_____________________________________________ */

function sendDirection(button) {  //Funcion para enviar la direccion a la que se le hace click (rigth Button or left button)
    socket.emit('send-direction', {button}); //El controlador envia al servidor los parametros de las direcciones que quiere enviar en X y Y
}