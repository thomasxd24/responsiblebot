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
      message.channel.sendMessage("https://source.unsplash.com/1280x720/?pet,cat");
    }
};
