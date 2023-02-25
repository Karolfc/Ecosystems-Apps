const express = require('express');
const os = require('os')
const cors = require('cors');
const serverApp = express();
const PORT = 5050;
const IPaddress = os.networkInterfaces()["Wi-Fi"][1].address;

//---------------------------- Setting EJS
serverApp.set('view engine', 'ejs');

//---------------------------- "use" external midleware
serverApp.use(express.json());
serverApp.use(cors({
    origin: '*'
}));

//---------------------------- Server listening
serverApp.listen(PORT, (error) => {
    console.log(`http://${IPaddress}:${PORT}`);
});

//---------------------------- First serve Static resources
serverApp.use('/player', express.static('public-player'));
serverApp.use('/display', express.static('public-display'));
serverApp.use('/moves', express.static('public-moves'));

//---------------------------- Dinamic files
serverApp.get('/player', (request, response) => {
    response.render('player', { DNS: `http://${IPaddress}:${PORT}` });
});

serverApp.get('/display', (request, response) => {
    response.render('display', { DNS: `http://${IPaddress}:${PORT}` });
});

serverApp.get('/moves', (request, response) => {
    response.render('moves', { DNS: `http://${IPaddress}:${PORT}` });
});

//---------------------------- Data base
let players = []; 
// player structure =  {name: ‘’, move: ‘’}

//---------------------------- API Endpoints

serverApp.get('/moves', (request, response) => {
    const {name, move} = request.body;
    addOrUpdatePlayer(name, move);
    response.json({received: request.body});
    // send players
});

serverApp.post('/player', (request, response) => { // Add a player to your Server database
    const { name, move } = request.body;
    addOrUpdatePlayer(name, move);
    response.json({ received: request.body });
});

serverApp.post('/make-a-move', (request, response) => {
    const {name, move} = request.body;
    addOrUpdatePlayer(name, move);
    response.json({received: request.body});
    // Validate the player exists, then upate player's move
});

//---------------------------------------------- Midlewares

function addOrUpdatePlayer(name, move) {
    let playerIndex = players.findIndex(player => player.name === name);
    if (playerIndex === -1) {
        if (players.length < 2) {
            players.push({ nae: name, move: move});
        }
    } else {
        players[playerIndex].move = move;
    }
    console.log(players);
}

