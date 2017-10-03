
const { Command } = require('discord.js-commando');
module.exports = class KickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'moderation',
            memberName: 'kick',
            description: 'Kick someone.',
            examples: ['/kick <mention> <reason>']
        });
    }

    run(message) {
      message.channel.send("git kicked -_-");
    }
};
