
const { Command } = require('discord.js-commando');
module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            group: 'moderation',
            memberName: 'say',
            description: 'Make the bot say something.',
            examples: ['/say <message>'],
            args: [
                {
                    key: 'content',
                    prompt: 'What do you want the bot to say?',
                    type: 'string'
                }

            ]
        });
    }

    run(message,{content}) {
          message.delete().catch(O_o=>{});
          message.channel.send(content);
    }
};
