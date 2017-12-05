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
        const minRole = msg.guild.roles.find("name",permissionRole)
        if(minRole == null)
        {
          return false;
        }
        
        if(msg.member.highestRole.comparePositionTo(minRole) >= 0)
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
