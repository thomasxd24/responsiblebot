
const { Command } = require('discord.js-commando');
module.exports = class KickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            group: 'moderation',
            memberName: 'mute',
            description: 'Mute someone.',
            examples: ['/mute <mention> <reason>']
        });
    }

    run(message) {
      if(message.author.id == "186824408227119104" || message.author.id == "325644122063110156")
      {
          member.addRole(message.guild.roles.find("name", "Muted")).catch(console.error);
          message.channel.send("You're muted.");
      }
      else {
        msg.channel.send(`<@${msg.author.id}>, you lack the responsibility to use this command`);
      }
    }
};
