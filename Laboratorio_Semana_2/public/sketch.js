let canvas;
let pokemonRender;

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

document.getElementById("pokemon").onclick = getBulbasaur;
document.getElementById("charmanderEvolve").onclick = getCharmander;
document.getElementById("squirtleEvolve").onclick = getSquirtle;
document.getElementById("pikachuEvolve").onclick = getPikachu;

function getBulbasaur() {
    pokedata = 1;
    getPokemondata(pokedata)
}

function getCharmander() {
    pokedata = 4;
    getPokemondata(pokedata)
}

function getSquirtle() {
    pokedata = 7;
    getPokemondata(pokedata)
}

function getPikachu() {
    pokedata = 25;
    getPokemondata(pokedata)
}

// PokeAPI

async function getPokemondata(pokedata) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokedata}`);
        const data = await response.json();
        pokemonRender = data;
        console.log(data);
    } catch (error) {
        console.log(error);
    }
    render();
}

// Render

function render() {
    document.getElementById("renderFetch").innerHTML=``;
    const renderDatos = document.createElement("div");
    renderDatos.innerHTML = `<img src="${pokemonRender.sprites.versions["generation-v"]["black-white"].animated.front_default}"> <br><br><b>${pokemonRender.name}</b>   Nº. ${pokemonRender.id}<br><br> Height:<br>${pokemonRender.height} m <br><br> Weight: <br>${pokemonRender.weight} kg <br><br> Ability: <br> ${pokemonRender.abilities[0].ability.name} <br>${pokemonRender.abilities[1].ability.name}<br>
    <br><button onclick="Evolucionar()" id="Evolucionar">Evolve Pokemon</button>
    `
    document.getElementById("renderFetch").appendChild(renderDatos);
}

function Evolucionar() {
    if (pokedata == 1 || pokedata == 2 || pokedata == 4 || pokedata == 5 || pokedata == 7 || pokedata == 8 || pokedata == 25) {
        getPokemondata(++pokedata);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor() {
    noStroke();
    fill(255);
    ellipse(pmouseX, pmouseY, 10, 10);
}