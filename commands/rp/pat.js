const { Command } = require('discord.js-commando');
module.exports = class PatCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pat',
            group: 'rp',
            memberName: 'pat',
            description: 'pat someone.',
            examples: ['/pat <mention>']
        });
    }

    run(message) {
      let member = message.mentions.users.first().username;
      message.delete().catch(O_o=>{});
        message.channel.send({embed: {
    color: 3447003,
    title: "```* "+message.author.username+" patted "+member+"...```"
  }});
    }
};
