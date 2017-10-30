const permissionRole = "Mod";
const { Command } = require('discord.js-commando');
module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            group: 'moderation',
            memberName: 'say',
            description: 'Make the bot say something.',
            examples: ['/say <message>'],
            args: [
                {
                    key: 'content',
                    prompt: 'What do you want the bot to say?',
                    type: 'string'
                }

            ]
        });
    }

    hasPermission(msg) {
      const userMaxPermission = msg.member.roles.sort((r1, r2) => r2.calculatedPosition - r1.calculatedPosition).first().calculatedPosition;
      if(msg.guild.roles.find("name",permissionRole) == null)
      {
        return false;
      }
      const cmdPermission = msg.guild.roles.find("name",permissionRole).calculatedPosition;
      if(userMaxPermission >= cmdPermission)
      {
        return true;
      }
      else {
        return false;
      }
    }

    run(message,{content}) {
          message.delete().catch(O_o=>{});
          message.channel.send(content);
    }
};
