const { Command } = require('discord.js-commando');
const permissionRole = "BeginningGamer";
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

// Credit : Unsplash source API. (Do not remove this comment.)
    run(message) {
      message.channel.send("https://source.unsplash.com/1280x720/?pet,dog" );
    }
};
