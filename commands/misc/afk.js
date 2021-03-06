const permissionRole = "BeginningGamer";
const { Command } = require('discord.js-commando');

module.exports = class AFKCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'afk',
            group: 'misc',
            memberName: 'afk',
            description: 'Go afk.',
            examples: ['/afk'],
            args: [
                {
                    key: 'reason',
                    prompt: 'Why are you afking?',
                    type: 'string',
                    default: ''
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

    run(msg,{reason}) {
      if (reason == '') {
        let afkList = global.afk.get(msg.author.id);

        if(afkList)
        {
          global.afk.delete(msg.author.id);
          msg.channel.send(`<@${msg.author.id}> is no longer afk.`);
        }
        else {
          let afk = {afk : true , afkmsg : "" };
          global.afk.set(msg.author.id,afk);
          msg.channel.send(`<@${msg.author.id}> is currently afk.`);
        }

      } else {
        let afk = {afk : true , afkmsg : reason.toString() };
        console.log(global.afk.set(msg.author.id,afk));
        msg.channel.send(`<@${msg.author.id}> is currently afk for: ${reason.toString()}`);
      }



    }
};
