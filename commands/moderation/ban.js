
const permissionRole = "Mod";
const { Command } = require('discord.js-commando');
module.exports = class BanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'moderation',
            memberName: 'ban',
            description: 'Ban someone.',
            examples: ['/ban <mention> <reason>'],
            args: [
                {
                    key: 'user',
                    prompt: 'Who are you banning?',
                    type: 'member'
                },
                {
                    key: 'reason',
                    prompt: 'Why are you banning him?',
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
      await user.ban(reason)
    .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
  message.channel.send(`The ban hammer has spoken for ${user.username}'s responsibility for reason "${reason}" issued by ${message.member.displayName} \n https://i.imgur.com/O3DHIA5.gif`);
    }
};
