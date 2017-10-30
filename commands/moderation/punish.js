const { Command } = require('discord.js-commando');
const permissionRole = "Helper";
module.exports = class PunishCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'punish',
            group: 'moderation',
            memberName: 'punish',
            description: 'Punish someone.',
            examples: ['/punish <mention> <reason>'],
            args: [
                {
                    key: 'user',
                    prompt: 'Which user do you want to punish',
                    type: 'user'
                },
                {
                    key: 'reason',
                    prompt: 'Why would you want to punish him?',
                    type: 'string'
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

    run(message, { user, content }) {
      sqlite.each(`SELECT * FROM offences WHERE userid = "${message.author.id}" and `).then(row => {


}).catch(() => {

});
    }
};
