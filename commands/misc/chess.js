const { Command } = require('discord.js-commando');

var Chess = require('chess.js').Chess;
var chesses = {};
var stockfishes = {};
var chessmsg = {};
var thinking = {};
var CHESS = '!n chess';
var MOVETIME = 300;

var SIDENAMES = {w:'Black', b:'White'};

function strip(s) {
    return s.replace(/^\s+|\s+$/g, '');
}

function end_game(id, resign, quiet) {
    if(chesses[id] === undefined) return;
    if(!quiet) {
        var winner;
        if(resign) {
            winner = SIDENAMES[chesses[id].turn()] + ' wins by resignation!';
        } else if(chesses[id].in_checkmate()) {
            winner = SIDENAMES[chesses[id].turn()] + ' wins by checkmate!';
        } else if(chesses[id].in_stalemate()) {
            winner = 'Draw by stalemate!';
        } else if(chesses[id].in_threefold_repetition()) {
            winner = 'Draw by threefold repetition!';
        } else if(chesses[id].insufficient_material()) {
            winner = 'Draw by insufficient material!';
        } else if(chesses[id].in_draw()) {
            winner = 'Draw!';
        }
        message.reply(chessmsg[id], 'https://i.imgur.com/qEvY7Tm.png Game over: ' + winner +
                '\n' + chesses[id].pgn({newline_char: '\n'}));
    }
    console.log('Chess game end: ', chessmsg[id].author.name, chessmsg[id].server.name);
    delete chesses[id];
    delete stockfishes[id];
    delete thinking[id];
}

function get_fen_img(id) {
    return 'http://www.fen-to-image.com/image/20/single/coords/' + chesses[id].fen().split(' ')[0];
/*
 * Discord's font is not truly monospace, so chess characters are wider.
    var s = chesses[id].ascii();
    var chess_characters = {
        r: '♜', n: '♞', b: '♝', q: '♛', k: '♚', p: '♟', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔', P: '♙'
        };
    for(var c in chess_characters) {
        var re = new RegExp(c, 'g');
        s = s.replace(re, chess_characters[c]);
    }
    s = s.replace(/^/g,'`');
    s = s.replace(/$/g,'`');
    return s;
*/
}
            module.exports = class ChessCommand extends Command {
                constructor(client) {
                    super(client, {
                        name: 'chess',
                        group: 'misc',
                        memberName: 'chess',
                        description: 'chess vs ai.',
                        examples: ['/chess']
                    });
                }

                run(message) {
                  var id = message.author.id + '!?#';
        chessmsg[id] = message;
        if(chesses[id] === undefined) {
          var stockfish = require("stockfish");
            chesses[id] = new Chess();
            console.log('Chess game: ', message.author.username + ' vs NeuroChess');
            thinking[id] = false;
            stockfishes[id] = STOCKFISH();
            stockfishes[id].postMessage('setoption name Contempt value 30');
            stockfishes[id].postMessage('setoption name Skill Level value 20');
            stockfishes[id].postMessage('ucinewgame');
            stockfishes[id].postMessage('isready');
            stockfishes[id].onmessage = function(event) {
                //console.log(event);
                var line;
                if(event && typeof event === 'object') {
                    line = event.data;
                } else {
                    line = event;
                }
                var match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
                if(match) {
                    var m = chesses[id].move({from: match[1], to: match[2], promotion: match[3]});
                    message.reply(chessmsg[id], m.san + '\n' + get_fen_img(id));
                    thinking[id] = false;
                    if(chesses[id].game_over()) {
                        end_game(id, false, false);
                    }
                }
            }
        }
        var move = strip(message.content.substring(CHESS.length + 1));
        if(move === 'resign') {
            end_game(id, true, false);
            return;
        }
        if(thinking[id] === true) {
            message.reply(chessmsg[id], "I'm still thinking...");
            return;
        }
        if(move !== 'skip' && chesses[id].move(move, {sloppy: true}) === null) {
            message.reply(chessmsg[id], 'Illegal move. Valid moves are: ' + chesses[id].moves().join(', ') +
                    '\n' + get_fen_img(id));
            return;
        }
        thinking[id] = true;
        stockfishes[id].postMessage('position fen ' + chesses[id].fen());
        stockfishes[id].postMessage('go movetime ' + MOVETIME);
        if(chesses[id].game_over()) {
            end_game(id, false, false);
        }
                }
            };
