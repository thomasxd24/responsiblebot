const { Command } = require('discord.js-commando');
const permissionRole = "BeginningGamer";
module.exports = class ShipCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ship',
            group: 'misc',
            memberName: 'ship',
            description: 'Ship someone.',
            examples: ['/ship']
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

    run(msg) {
      msg.channel.send("I ship "+msg.guild.members.random().user.username+" and "+msg.guild.members.random().user.username)
    }
};
