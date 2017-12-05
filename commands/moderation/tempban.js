const permissionRole = "Mod";
const { Command } = require('discord.js-commando');
module.exports = class TempbanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tempban',
            group: 'moderation',
            memberName: 'tempban',
            description: 'Tempban someone.',
            examples: ['/tempban <mention>']
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
      message.channel.send("WIP :wink:");
    }
};
