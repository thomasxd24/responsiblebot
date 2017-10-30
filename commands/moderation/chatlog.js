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
