
const { Command } = require('discord.js-commando');
module.exports = class UnmuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unmute',
            group: 'moderation',
            memberName: 'unmute',
            description: 'Unmute someone.',
            examples: ['/unmute <mention>']
        });
    }

    run(message) {
      message.channel.send("WIP :wink:");
    }
};
