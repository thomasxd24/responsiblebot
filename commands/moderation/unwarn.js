
const { Command } = require('discord.js-commando');
module.exports = class UnwarnCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unwarn',
            group: 'moderation',
            memberName: 'unwarn',
            description: 'Unwarn someone.',
            examples: ['/unwarn <mention>']
        });
    }

    run(message) {
      message.channel.send("WIP :wink:");
    }
};
