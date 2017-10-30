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

    run(message) {
      message.channel.send("WIP :wink:");
    }
};
