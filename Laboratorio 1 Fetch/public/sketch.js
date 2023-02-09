let canvas;
let userRender;
let bitcoinRender;
let populationRender;
let dogRender;
let catRender;

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
}

function draw() {
    background(0, 50);
    newCursor();
}

function buttonClicked(){
    document.getElementById("user").onclick = getUserdata;
    document.getElementById("bitcoin").onclick = getBitcoindata;
    document.getElementById("us").onclick = getUSdata;
    document.getElementById("dog").onclick = getDogdata;
    document.getElementById("cat").onclick = getCatdata;
}

buttonClicked();

//Random user 

async function getUserdata() {
    try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        userRender = data;
        console.log(data);
    } catch (error) {
        console.log(error);
    }
    render(user);
}

// Bitcoin price

async function getBitcoindata() {
    try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        const data = await response.json();
        bitcoinRender = data;
        console.log(data);
    } catch (error) {
        console.log(error);
    }
    render(bitcoin);
}

// US Population

async function getUSdata() {
    try {
        const response = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
        const data = await response.json();
        populationRender = data;
        console.log(data);
    } catch (error) {
        console.log(error);
    }
    render(us);
}

// Dog random image

async function getDogdata() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    dogRender = data;
    console.log(dogRender);
    render(dog);
}

//Random cat fact

async function getCatdata() {
    try {
        const data = await fetch('https://catfact.ninja/fact').then(response => response.json());
        catRender = data;
        console.log(data);
        
    } catch (error) {
        console.log(error);
    }
    render(cat);
}

// Render

function render(type) {
    document.getElementById("renderFetch").innerHTML=``;
    const renderDatos = document.createElement("div");
    if (type === user) {
        renderDatos.innerHTML = `<img id="imgUser"src="${userRender.results[0].picture.medium}" <br><br><br><b>${userRender.results[0].name.title} ${userRender.results[0].name.first} ${userRender.results[0].name.last}</b> <br>Gender: ${userRender.results[0].gender}<br> Email: ${userRender.results[0].email}>`
    }
    if(type === bitcoin){
        renderDatos.innerHTML = `<b>${bitcoinRender.bpi.EUR.description}</b><br> 1 BTC =<br>${bitcoinRender.bpi.EUR.symbol} ${bitcoinRender.bpi.EUR.rate} ${bitcoinRender.bpi.EUR.code}<br><br>
        <b>${bitcoinRender.bpi.GBP.description}</b><br> 1 BTC =<br>${bitcoinRender.bpi.GBP.symbol} ${bitcoinRender.bpi.GBP.rate} ${bitcoinRender.bpi.GBP.code}<br><br>
        <b>${bitcoinRender.bpi.USD.description}</b><br> 1 BTC =<br>${bitcoinRender.bpi.USD.symbol} ${bitcoinRender.bpi.USD.rate} ${bitcoinRender.bpi.USD.code}`;
    }
    if(type === us){
        renderDatos.innerHTML = `<b>${populationRender.data[0].Nation} Population</b><br><br> Year: ${populationRender.data[0].Year}<br> Population: ${populationRender.data[0].Population}`;
    }
    if(type === dog){
        renderDatos.innerHTML = `<img id="fotoDog" src="${dogRender.message}">`;
    }
    if(type === cat){
        renderDatos.innerHTML = `<b>Cat Fact:</b> <br><br>${catRender.fact}`;
    }

    document.getElementById("renderFetch").appendChild(renderDatos);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor() {
    noStroke();
    fill(255);
    ellipse(pmouseX, pmouseY, 10, 10);
}