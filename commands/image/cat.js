const { Command } = require('discord.js-commando');
const permissionRole = "BeginningGamer";
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
      message.channel.sendMessage("https://source.unsplash.com/1280x720/?pet,cat");
    }
};
