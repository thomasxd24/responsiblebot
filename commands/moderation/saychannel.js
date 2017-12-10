const permissionRole = "Mod";
const { Command } = require('discord.js-commando');
module.exports = class SayChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'saychannel',
            group: 'moderation',
            memberName: 'saychannel',
            description: 'Make the bot say something.',
            examples: ['/say <message>'],
            args: [
                {
                    key: 'channel',
                    prompt: 'Where do u want the bot to say?',
                    type: 'channel'
                },
                {
                    key: 'content',
                    prompt: 'What do you want the bot to say?',
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

    run(message,{content,channel}) {
          message.delete().catch(O_o=>{});
          channel.send(content);
    }
};
