const { Command } = require('discord.js-commando');

module.exports = class KillCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'suicide',
            group: 'rp',
            memberName: 'suicide',
            description: 'Suicide yourself.',
            examples: ['kill']
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
