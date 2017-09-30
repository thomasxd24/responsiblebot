
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
      message.channel.send("WIP :wink:");
      //const sayMessage = args.join(" ");
          // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
        //  message.delete().catch(O_o=>{});
          // And we get the bot to say the thing:
          //message.channel.send(sayMessage);
    }
};
