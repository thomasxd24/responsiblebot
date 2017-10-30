const { Command } = require('discord.js-commando');
module.exports = class HugCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hug',
            group: 'rp',
            memberName: 'hug',
            description: 'hug someone.',
            examples: ['/hug <mention>']
        });
    }

    run(message) {
      let member = message.mentions.users.first().username;
      message.delete().catch(O_o=>{});
        message.channel.send({embed: {
    color: 3447003,
    title: "```* "+message.author.username+" hugged "+member+"...```"
  }});
    }
};
