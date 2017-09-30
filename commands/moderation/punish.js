
const { Command } = require('discord.js-commando');
module.exports = class PunishCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'punish',
            group: 'moderation',
            memberName: 'punish',
            description: 'Punish someone.',
            examples: ['/punish <mention> <reason>']
        });
    }

    run(message) {
      message.channel.send("git punished :wink:");
    }
};
