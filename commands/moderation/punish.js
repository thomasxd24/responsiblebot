const { Command } = require('discord.js-commando');
const permissionRole = "Helper";
const path = require('path');
var moment = require('moment');
var sqlite3 = require('sqlite3').verbose();
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

    async run(message, { user, reason }) {
      var db = new sqlite3.Database(path.join(__dirname, '/../../offence.sqlite3'));
      db.get(`SELECT COUNT(punishedUserid) FROM offences where reasonid = 2 and punishedUserid = ${user.id} and punishTime > ${moment().subtract(7, 'days').format("X")}`, function(err, row) {
          message.channel.send(`He had ${row['COUNT(punishedUserid)']} offences of the same reason`)
      });
  db.run(`INSERT INTO offences VALUES (null,'${user.id}','${message.author.id}',2,'warn','5d','${reason}',${moment().add(5, 'days').format("X")},${moment().format("X")})`);
  db.get("SELECT * FROM offences", function(err, row) {
      console.log(row);
  });
  message.channel.send(`The user <@!${user.id}> has been ${'warned'} for \`${reason}\` by <@!${message.author.id}> for ${'100 year (kidding)'}. `)
  db.close()

    }
};
