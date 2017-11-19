const permissionRole = "DedicatedMember";
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
      const userMaxPermission = msg.member.roles.sort((r1, r2) => r2.calculatedPosition - r1.calculatedPosition).first().calculatedPosition;
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
        msg.channel.send(`<@${msg.author.id}> is currently afk for : ${reason.toString()}`);
      }



    }
};
