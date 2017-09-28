const { Command } = require('discord.js-commando');

module.exports = class SuicideCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'suicide',
            group: 'rp',
            memberName: 'suicide',
            description: 'Suicide yourself.',
            examples: ['suicide']
        });
    }

    run(msg) {
        msg.delete().catch(O_o=>{});
          msg.channel.send({embed: {
      color: 3447003,
      title: "```* "+msg.author.username+" took his own life...```"
    }});
    }
};
