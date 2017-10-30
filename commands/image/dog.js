const { Command } = require('discord.js-commando');
const permissionRole = "DedicatedMember";
module.exports = class DogCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dog',
            group: 'image',
            memberName: 'dog',
            description: 'Show a random image of dog.',
            examples: ['/dog']
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

// Credit : Unsplash source API. (Do not remove this comment.)
    run(message) {
      message.channel.send("https://source.unsplash.com/1280x720/?pet,dog" );
    }
};
