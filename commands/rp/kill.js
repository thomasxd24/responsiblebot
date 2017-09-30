const { Command } = require('discord.js-commando');

module.exports = class KillCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kill',
            group: 'rp',
            memberName: 'kill',
            description: 'Kill someone.',
            examples: ['kill']
        });
    }

    run(message) {
      let member = message.mentions.users.first().username;
      message.delete().catch(O_o=>{});
        message.channel.send({embed: {
    color: 3447003,
    title: "```* "+message.author.username+" killed "+member+"...```"
  }});
    }
};
