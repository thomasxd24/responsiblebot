
const { Command } = require('discord.js-commando');
module.exports = class OffeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'offe',
            group: 'moderation',
            memberName: 'offe',
            description: 'Check the offence of a member.',
            examples: ['/offe <mention>']
        });
    }

    run(message) {
      message.channel.send("WIP :wink:");
    }
};
