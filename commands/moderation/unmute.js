const permissionRole = "Helper";
const { Command } = require('discord.js-commando');
module.exports = class UnmuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unmute',
            group: 'moderation',
            memberName: 'unmute',
            description: 'Unmute someone.',
            examples: ['/unmute [mention]'],
            args: [
              {
                  key: 'member',
                  prompt: 'Who are you unmuting?',
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

    run(message) {
      member.removeRole(message.guild.roles.find("name", "Muted")).catch(console.error);
      message.channel.send("You're unmuted.");
    }
};
