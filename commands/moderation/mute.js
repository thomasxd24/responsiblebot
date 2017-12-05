const permissionRole = "Helper";
const { Command } = require('discord.js-commando');
module.exports = class KickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            group: 'moderation',
            memberName: 'mute',
            description: 'Mute someone.',
            examples: ['/mute <mention> <reason>'],
            args: [
                {
                    key: 'member',
                    prompt: 'Who are you muting?',
                    type: 'member'
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

    run(message,{member}) {
          member.addRole(message.guild.roles.find("name", "Muted")).catch(console.error);
          message.channel.send("You're muted.");
    }
};
