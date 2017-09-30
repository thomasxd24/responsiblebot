
const { Command } = require('discord.js-commando');
module.exports = class ChatlogCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'chatlog',
            group: 'moderation',
            memberName: 'chatlog',
            description: 'Check the chat log with 100 messages.',
            examples: ['/chatlog <mention>']
        });
    }

    run(message) {
      message.channel.send("WIP :wink:");
    }
};
