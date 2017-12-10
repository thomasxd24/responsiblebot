const permissionRole = "Helper";
var moment = require('moment');
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
      message.channel.send(moment("1900-01-01 00:00:00").add(process.uptime(), 'seconds').format("HH:mm:ss"));
      
    }
};
