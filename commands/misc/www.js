const { Command } = require('discord.js-commando');

module.exports = class WWWCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'www',
            group: 'misc',
            memberName: 'www',
            description: 'Provide the link to ExtremeCraft.',
            examples: ['/www']
        });
    }

    run(msg) {
        msg.delete().catch(O_o=>{});
          msg.channel.send({embed: {
      color: 3447003,
      title: "https://www.extremecraft.net/"
    }});
    }
};
