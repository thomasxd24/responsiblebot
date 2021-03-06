const permissionRole = "Helper";
const { Command } = require('discord.js-commando');
module.exports = class KickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'moderation',
            memberName: 'kick',
            description: 'Kick someone.',
            examples: ['/kick <mention> <reason>'],
            args: [
                {
                    key: 'user',
                    prompt: 'Who are you kicking?',
                    type: 'member'
                },
                {
                    key: 'reason',
                    prompt: 'Why are you kicking him?',
                    type: 'string'
                }
            ]
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

    async run(message,{user,reason}) {
      await user.kick(reason)
    .catch(error => message.channel.send(`Sorry ${message.author} I couldn't kick because of : ${error}`));
  message.channel.send(`The kick hammer (lol) has spoken for ${user.username || user.id || user}'s responsibility for reason "${reason}" issued by ${message.member.displayName} \n https://i.imgur.com/O3DHIA5.gif`);
    }
};
