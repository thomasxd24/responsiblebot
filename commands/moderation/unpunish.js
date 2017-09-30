
const { Command } = require('discord.js-commando');
module.exports = class UnpunishCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unpunish',
            group: 'moderation',
            memberName: 'unpunish',
            description: 'Unpunish someone.',
            examples: ['/unpunish [mention]']
        });
    }

    run(message) {
      message.channel.send("WIP :wink:");
    }
};
