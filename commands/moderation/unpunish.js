const permissionRole = "Mod";
const { Command } = require('discord.js-commando');
module.exports = class UnpunishCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unpunish',
            group: 'moderation',
            memberName: 'unpunish',
            description: 'Unpunish someone.',
            examples: ['/unpunish [mention]']
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
