const { Command } = require('discord.js-commando');

module.exports = class FlipTableCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'fliptable',
            group: 'rp',
            memberName: 'fliptable',
            description: 'Flip the table with rage.',
            examples: ['/fliptable']
        });
    }

    run(msg) {
        msg.delete().catch(O_o=>{});
          msg.channel.send({embed: {
      color: 3447003,
      title: "```* "+msg.author.username+" (╯°□°)╯︵ ┻━┻ -ed...```"
    }});
    }
};
