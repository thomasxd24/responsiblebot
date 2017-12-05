const permissionRole = "Helper";
const { Command } = require('discord.js-commando');
module.exports = class ChatlogCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'chatlog',
            group: 'moderation',
            memberName: 'chatlog',
            description: 'Check the chat log with 100 messages.',
            examples: ['/chatlog <mention>']
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

    run(message) {
      message.channel.send("WIP :wink:");
    }
};
