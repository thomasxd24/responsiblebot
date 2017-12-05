const { Command } = require('discord.js-commando');

module.exports = class DabCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dab',
            group: 'rp',
            memberName: 'dab',
            description: 'Dab.',
            examples: ['/dab']
        });
    }

    run(message) {
      message.delete().catch(O_o=>{});
        message.channel.send({embed: {
    color: 3447003,
    title: "```* "+message.author.username+" dabbed...```"
  }});
    }
};
