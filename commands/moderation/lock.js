
const { Command } = require('discord.js-commando');
module.exports = class LockCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lock',
            group: 'moderation',
            memberName: 'lock',
            description: 'Lock a channel.',
            examples: ['/lock <channel>']
        });
    }

    run(message) {
      message.channel.send("WIP :wink:");
    }
};
