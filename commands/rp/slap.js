const { Command } = require('discord.js-commando');
module.exports = class SlapCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'slap',
            group: 'rp',
            memberName: 'slap',
            description: 'Slap someone.',
            examples: ['/slap <mention>']
        });
    }

    run(message) {
      let member = message.mentions.users.first().username;
      message.delete().catch(O_o=>{});
        message.channel.send({embed: {
    color: 3447003,
    title: "```* "+message.author.username+" slapped "+member+"...```"
  }});
    }
};
