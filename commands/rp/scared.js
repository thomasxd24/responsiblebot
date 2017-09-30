const { Command } = require('discord.js-commando');

module.exports = class ScaredCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'scared',
            group: 'rp',
            memberName: 'scared',
            description: 'Feel Scared.',
            examples: ['scared']
        });
    }

    run(message) {
      message.delete().catch(O_o=>{});
        message.channel.send({embed: {
    color: 3447003,
    title: "```* "+message.author.username+" is scared...```"
  }});
    }
};
