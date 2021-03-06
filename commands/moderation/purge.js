const permissionRole = "Mod";
  const { Command } = require('discord.js-commando');
  module.exports = class PurgeCommand extends Command {
      constructor(client) {
          super(client, {
              name: 'purge',
              group: 'moderation',
              memberName: 'purge',
              description: 'Ban someone.',
              examples: ['/ban <mention> <reason>'],
              args: [
                  {
                      key: 'number',
                      prompt: 'How many messages would u want to delete?',
                      type: 'integer',
                      validate: number => {
                        if (number < 101 && number >2) return true;
                        return "Must provide at least 2 and at most 100 messages to delete."
                      }
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

      run(message,{ number }) {
        let messagecount = parseInt(number);
          message.channel.bulkDelete(messagecount,true);



      }
  };
