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

      run(message,{ number }) {
        let messagecount = parseInt(parseInt(number));
          message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));



      }
  };