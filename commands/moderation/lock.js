const permissionRole = "Mod";
const { Command } = require('discord.js-commando');
module.exports = class LockCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lock',
            group: 'moderation',
            memberName: 'lock',
            description: 'Lock a channel.',
            examples: ['/lock <channel>']
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
