

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
                    type: 'member'
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
      var previousoffences = 0;
      db.get(`SELECT COUNT(punishedUserid) FROM offences where reasonid = 2 and punishedUserid = ${user.id} and punishTime > ${moment().subtract(7, 'days').format("X")}`, function(err, row) {
          previousoffences = parseInt(row['COUNT(punishedUserid)'])
          switch (previousoffences) {
            case 0:
                db.run(`INSERT INTO offences VALUES (null,'${user.id}','${message.author.id}',2,'warn',null,'${reason}',null,${moment().format("X")})`);
                message.channel.send(`The user <@!${user.id}> has been ${'warned'} for \`${reason}\` by <@!${message.author.id}>`)
                db.close()
                
                break;
    
            case 1:
                db.run(`INSERT INTO offences VALUES (null,'${user.id}','${message.author.id}',2,'mute','15m','${reason}',${moment().add(15,'minute').format("X")},${moment().format("X")})`);
                user.addRole(message.guild.roles.find("name", "Muted")).catch(console.error);
                message.channel.send(`The user <@!${user.id}> has been ${'muted'} for \`${reason}\` by <@!${message.author.id}> for \`15 minutes\``)
                db.close()
                setTimeout(() => {
                    user.removeRole(message.guild.roles.find("name", "Muted")).catch(console.error);
                }, 3000);
                break;
    
            case 2:
                db.run(`INSERT INTO offences VALUES (null,'${user.id}','${message.author.id}',2,'mute','1h','${reason}',${moment().add(1,'hours').format("X")},${moment().format("X")})`);
                user.addRole(message.guild.roles.find("name", "Muted")).catch(console.error);
                message.channel.send(`The user <@!${user.id}> has been ${'muted'} for \`${reason}\` by <@!${message.author.id}> for \`1 hours\``)
                db.close()
                setTimeout(() => {
                    user.removeRole(message.guild.roles.find("name", "Muted")).catch(console.error);
                }, 3600000);
                break;
            case 3:
                db.run(`INSERT INTO offences VALUES (null,'${user.id}','${message.author.id}',2,'mute','6h','${reason}',${moment().add(6,'hours').format("X")},${moment().format("X")})`);
                user.addRole(message.guild.roles.find("name", "Muted")).catch(console.error);
                message.channel.send(`The user <@!${user.id}> has been ${'muted'} for \`${reason}\` by <@!${message.author.id}> for \`6 hours\``)
                db.close()
                setTimeout(() => {
                    user.removeRole(message.guild.roles.find("name", "Muted")).catch(console.error);
                }, 21600000);
                break;
            case 4:
                db.run(`INSERT INTO offences VALUES (null,'${user.id}','${message.author.id}',2,'mute','12h','${reason}',${moment().add(12,'hours').format("X")},${moment().format("X")})`);
                user.addRole(message.guild.roles.find("name", "Muted")).catch(console.error);
                message.channel.send(`The user <@!${user.id}> has been ${'muted'} for \`${reason}\` by <@!${message.author.id}> for \`12 hours\``)
                db.close()
                setTimeout(() => {
                    user.removeRole(message.guild.roles.find("name", "Muted")).catch(console.error);
                }, 43200000);
                break;        
            case 5:
                db.run(`INSERT INTO offences VALUES (null,'${user.id}','${message.author.id}',2,'mute','24h','${reason}',${moment().add(24,'hours').format("X")},${moment().format("X")})`);
                user.addRole(message.guild.roles.find("name", "Muted")).catch(console.error);
                message.channel.send(`The user <@!${user.id}> has been ${'muted'} for \`${reason}\` by <@!${message.author.id}> for \`24 hours\``)
                db.close()
                setTimeout(() => {
                    user.removeRole(message.guild.roles.find("name", "Muted")).catch(console.error);
                }, 86400000);
                break;
    
        
            default:
                db.run(`INSERT INTO offences VALUES (null,'${user.id}','${message.author.id}',2,'mute','24h','${reason}',${moment().add(24,'hours').format("X")},${moment().format("X")})`);
                user.addRole(message.guild.roles.find("name", "Muted")).catch(console.error);
                message.channel.send(`The user <@!${user.id}> has been ${'muted'} for \`${reason}\` by <@!${message.author.id}> for \`24 hours\``)
                db.close()
                setTimeout(() => {
                    member.removeRole(message.guild.roles.find("name", "Muted")).catch(console.error);
                }, 86400000);
                break;
        }
      });
    //   need to be improve this but gonna do it this way
    
      

    }
};
