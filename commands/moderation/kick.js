const permissionRole = "Helper";
const { Command } = require('discord.js-commando');
module.exports = class KickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'moderation',
            memberName: 'kick',
            description: 'Kick someone.',
            examples: ['/kick <mention> <reason>']
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
      message.channel.send("git kicked -_-");
    }
};
