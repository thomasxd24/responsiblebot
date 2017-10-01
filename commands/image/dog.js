const { Command } = require('discord.js-commando');

module.exports = class DogCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dog',
            group: 'image',
            memberName: 'dog',
            description: 'Show a random image of dog.',
            examples: ['/dog']
        });
    }

// Credit : Unsplash source API. (Do not remove this comment.)
    run(message) {
      message.delete().catch(O_o=>{});
        message.channel.send({embed: {
    color: 3447003,
    title: "https://source.unsplash.com/1280x720/?pet,dog"
  }});
    }
};
