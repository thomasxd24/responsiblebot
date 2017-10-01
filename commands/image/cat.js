const { Command } = require('discord.js-commando');

module.exports = class CatCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cat',
            group: 'image',
            memberName: 'cat',
            description: 'Show a random image of cat.',
            examples: ['/cat']
        });
    }

// Credit : Unsplash source API. (Do not remove this comment.)
    run(message) {
      message.delete().catch(O_o=>{});
        message.channel.send({embed: {
    color: 3447003,
    title: "https://source.unsplash.com/1280x720/?pet,cat"
  }});
    }
};
