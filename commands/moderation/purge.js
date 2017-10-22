
  const { Command } = require('discord.js-commando');
  module.exports = class PurgeCommand extends Command {
      constructor(client) {
          super(client, {
              name: 'purge',
              group: 'moderation',
              memberName: 'purge',
              description: 'Ban someone.',
              examples: ['/ban <mention> <reason>']
          });
      }

      run(message) {
        let messagecount = parseInt(20);
          message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));

      }
  };
