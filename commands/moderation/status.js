
const { Command } = require('discord.js-commando');
module.exports = class StatusCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'status',
            group: 'moderation',
            memberName: 'status',
            description: 'Show the status of the bot.',
            examples: ['/status']
        });
    }

    run(message) {
      message.channel.send("WIP :wink:");
    }
};
