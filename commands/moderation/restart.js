require('process');
const { Command } = require('discord.js-commando');
const permissionRole = "Mod";
module.exports = class RestartCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'restart',
            group: 'moderation',
            memberName: 'restart',
            description: 'Restart the whole process.',
            examples: ['/restart']
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
      message.channel.send("Restarting...")
      process.exit(1);
    }
};
