
const { Command } = require('discord.js-commando');
module.exports = class KickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            group: 'moderation',
            memberName: 'mute',
            description: 'Mute someone.',
            examples: ['/mute <mention> <reason>']
        });
    }

    run(message) {
      message.channel.send("WIP :wink:");
    }
};
