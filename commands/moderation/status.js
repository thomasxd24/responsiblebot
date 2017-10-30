
const { Command } = require('discord.js-commando');
module.exports = class StatusCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'status',
            group: 'moderation',
            memberName: 'status',
            description: 'Show the status of the bot.',
            examples: ['/status']
        });
    }

    hasPermission(msg) {
      const userMaxPermission = msg.member.roles.sort((r1, r2) => r2.calculatedPosition - r1.calculatedPosition).first().calculatedPosition;
      console.log(msg.guild.roles.find("name",permissionRole));
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
