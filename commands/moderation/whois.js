const permissionRole = "Mod";
const { Command } = require('discord.js-commando');
module.exports = class WhoisCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'whois',
            group: 'moderation',
            memberName: 'whois',
            description: 'Whois someone.',
            examples: ['/whois <mention>']
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
