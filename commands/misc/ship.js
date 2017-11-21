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

    run(msg) {
      msg.channel.send("I ship "+msg.guild.members.random().user.username+" and "+msg.guild.members.random().user.username)
    }
};
