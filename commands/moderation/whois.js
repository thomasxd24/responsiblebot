
const { Command } = require('discord.js-commando');
module.exports = class WhoisCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'whois',
            group: 'moderation',
            memberName: 'whois',
            description: 'Whois someone.',
            examples: ['/whois <mention>']
        });
    }

    run(message) {
      message.channel.send("WIP :wink:");
    }
};
