
const { Command } = require('discord.js-commando');
module.exports = class BanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'moderation',
            memberName: 'ban',
            description: 'Ban someone.',
            examples: ['/ban <mention> <reason>']
        });
    }

    run(message) {
      message.channel.send("git banned :wink:");
    }
};
