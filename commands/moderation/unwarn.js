const permissionRole = "Helper";
const { Command } = require('discord.js-commando');
module.exports = class UnwarnCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unwarn',
            group: 'moderation',
            memberName: 'unwarn',
            description: 'Unwarn someone.',
            examples: ['/unwarn [mention]']
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
