
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

    async run(message,{user,reason}) {
      await user.ban(reason)
    .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
  message.channel.send(`The ban hammer has spoken for ${user.username || user.id || user}'s responsibility for reason "${reason}" issued by ${message.member.displayName} \n https://i.imgur.com/O3DHIA5.gif`);
    }
};
