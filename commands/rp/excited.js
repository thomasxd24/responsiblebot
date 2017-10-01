const { Command } = require('discord.js-commando');

module.exports = class ExcitedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'excited',
            group: 'rp',
            memberName: 'excited',
            description: 'Get excited.',
            examples: ['/excited']
        });
    }

    run(message) {
      message.delete().catch(O_o=>{});
        message.channel.send({embed: {
    color: 3447003,
    title: "```* "+message.author.username+" is excited...```"
  }});
    }
};
