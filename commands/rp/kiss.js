const { Command } = require('discord.js-commando');
module.exports = class KissCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kiss',
            group: 'rp',
            memberName: 'kiss',
            description: 'Kiss someone.',
            examples: ['/kiss <mention>']
        });
    }

    run(message) {
      let member = message.mentions.users.first().username;
      message.delete().catch(O_o=>{});
        message.channel.send({embed: {
    color: 3447003,
    title: "```* "+message.author.username+" kissed "+member+"...```"
  }});
    }
};
