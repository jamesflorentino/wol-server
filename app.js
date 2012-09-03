var port = Number(process.env.PORT || 1337),
    io = require('socket.io').listen(port),
    api = require('./api'),
    utils = require('./utils'),
    Player = require('./player'),
    Players = require('./players'),
    Games = require('./games'),
    Game = require('./game'),
    games = new Games(),
    players = new Players();

io.sockets.on('connection', function(socket) {
    var player, connected, connectEvents, joinGame, authenticate, setPlayerName;
    joinGame = function(game) {
        game.join(player);
        player.join(game);
        socket.emit(api.MethodType.LAUNCH_GAME, game.id);
    };
    connectEvents = function() {
        connected = true;
        // create a game
        socket.on(api.EventType.CREATE_GAME, function() {
            var game;
            game = new Game();
            games.add(game);
            joinGame(game);
        });
        // join a (random) game
        socket.on(api.EventType.JOIN_GAME, function() {
            var game;
            if (game = games.getAvailable()) {
                joinGame(game);
            } else {
                socket.emit(api.MethodType.NO_GAMES_AVAILABLE, 'no games available')
            }
        })
    };
    setPlayerName = function(name) {
        // prevent user from setting name again.
        if (connected) return;
        if (name !== undefined) {
            player = new Player(name);
            connectEvents();
        } else {
            socket.emit(api.MethodType.SET_NAME_ERROR, "player name is undefined");
        }
    };
    authenticate = function(authKey) {
        if (connected) return;
        // check if the player exists already.
        if (player = players.getByAuthKey(authKey)) {
            connectEvents();
        } else {
            // set the name of the player.
            socket.on(api.EventType.SET_NAME, setPlayerName);
        }
    }
    // get the auth key of the player (mostly done by cookie)
    socket.on(api.EventType.SETUP, authenticate);
});