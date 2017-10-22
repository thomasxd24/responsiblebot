const { Command } = require('discord.js-commando');

module.exports = class NoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'no',
            group: 'image',
            memberName: 'no',
            description: 'Show a random image of no.',
            examples: ['/no']
        });
    }

// Credit : Unsplash source API. (Do not remove this comment.)
    run(message) {
      message.channel.send("Testing message", {
    files: [
      "https://source.unsplash.com/1280x720/?pet,cat"
    ]
  });
};
//       var request = require('request');
// var r = request.get("https://source.unsplash.com/1280x720/?pet,cat", function (err, res, body) {
//   console.log(r.uri.href);
//   console.log(res.request.uri.href);
//
//   // Mikael doesn't mention getting the uri using 'this' so maybe it's best to avoid it
//   // please add a comment if you know why this might be bad
//   console.log(this.uri.href);
// });

};
