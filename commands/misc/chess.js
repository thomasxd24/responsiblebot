const { Command } = require('discord.js-commando');
var Chess = require('chess.js').Chess;
var chesses = {};
var stockfishes = {};
var chessmsg = {};
var thinking = {};
var MOVETIME = 300;
var lastmsg = {};

var SIDENAMES = {w:'Black', b:'White'};



            module.exports = class ChessCommand extends Command {
                constructor(client) {
                    super(client, {
                        name: 'chess',
                        group: 'misc',
                        memberName: 'chess',
                        description: 'chess vs ai.',
                        examples: ['/chess'],
                        args: [
                            {
                                key: 'move',
                                prompt: 'What moves are you making?',
                                type: 'string'
                            }
                        ]
                    });
                }

                run(message,{move}) {
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
                          message.reply('Game over: ' + winner );
                      }
                      console.log('Chess game end: ', chessmsg[id].author.name, chessmsg[id].guild.name);
                      delete chesses[id];
                      delete stockfishes[id];
                      delete thinking[id];
                  }

                  function get_fen_img(id) {
                      return 'http://www.fen-to-image.com/image/20/single/coords/' + chesses[id].fen().split(' ')[0] + '.png';
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
                  var id = message.author.id + '!?#';
        chessmsg[id] = message;
        if(chesses[id] === undefined) {
            chesses[id] = new Chess();
            console.log('Chess game: ', message.author.username + ' vs ResponsibleBot');
            thinking[id] = false;
            stockfishes[id] = global.stockfish();
            stockfishes[id].postMessage('setoption name Contempt value 30');
            stockfishes[id].postMessage('setoption name Skill Level value 0');
            stockfishes[id].postMessage('ucinewgame');
            stockfishes[id].postMessage('isready');
            stockfishes[id].onmessage = function(event) {
                var line;
                if(event && typeof event === 'object') {
                    line = event.data;
                } else {
                    line = event;
                }
                var match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
                if(match) {
                    var m = chesses[id].move({from: match[1], to: match[2], promotion: match[3]});
                    if (lastmsg[id]) {
                      console.log(lastmsg[id]);
                      lastmsg[id].delete().catch(O_o=>{});
                    }

                    message.reply("Your Turn!", {
                      file: get_fen_img(id) }).then(function(message) {
        lastmsg[id] = message});
                    thinking[id] = false;
                    if(chesses[id].game_over()) {
                        end_game(id, false, false);
                    }
                }
            }
        }
        if(move === 'resign') {
            end_game(id, true, false);
            return;
        }
        if(thinking[id] === true) {
            message.reply(chessmsg[id], "I'm still thinking...");
            return;
        }
        if(move !== 'skip' && chesses[id].move(move, {sloppy: true}) === null) {
          console.log(chesses[id].moves().join(', '));
            message.reply('Illegal move. Valid moves are: ' + chesses[id].moves().join(', '), {
file: get_fen_img(id) });
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
