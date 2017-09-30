
const { Command } = require('discord.js-commando');
module.exports = class TempbanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tempban',
            group: 'moderation',
            memberName: 'tempban',
            description: 'Tempban someone.',
            examples: ['/tempban <mention>']
        });
    }

    run(message) {
      message.channel.send("WIP :wink:");
    }
};
