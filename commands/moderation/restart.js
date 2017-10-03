require('process');
const { Command } = require('discord.js-commando');
module.exports = class RestartCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'restart',
            group: 'moderation',
            memberName: 'restart',
            description: 'Restart the whole process.',
            examples: ['/restart']
        });
    }

    run(message) {
      process.exit(1);
    }
};
