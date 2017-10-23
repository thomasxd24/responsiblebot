
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
                      type: 'string'
                  }
              ]
          });
      }

      run(message,{ number }) {
        let messagecount = parseInt(parseInt(number));
          message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));

      }
  };
