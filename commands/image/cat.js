const { Command } = require('discord.js-commando');
const permissionRole = "DedicatedMember";
module.exports = class CatCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cat',
            group: 'image',
            memberName: 'cat',
            description: 'Show a random image of cat.',
            examples: ['/cat']
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

// Credit : Unsplash source API. (Do not remove this comment.)
    run(message) {
      message.channel.sendMessage("https://source.unsplash.com/1280x720/?pet,cat");
    }
};
