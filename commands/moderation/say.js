
const { Command } = require('discord.js-commando');
module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            group: 'moderation',
            memberName: 'say',
            description: 'Make the bot say something.',
            examples: ['/say <message>']
        });
    }

    run(message) {
    // const sayMessage = args.join(" ");
    //       message.delete().catch(O_o=>{});
    //       message.channel.send(sayMessage);
    }
};
