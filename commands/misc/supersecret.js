const { Command } = require('discord.js-commando');

module.exports = class SuperSecretCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'supersecret',
            group: 'misc',
            memberName: 'supersecret',
            description: 'A super secret command.',
            examples: ['/supersecret']
        });
    }

    var chance = Math.random();
    var message;
    if (chance > 0.95) {
      message = "```* OMG HELLO!!!```"
    } else {
      message = msg.author.username+", Unknown command. Use `/help` or `@LittleBrother#3486 help` to view the list of all commands."
    }

    run(msg) {
        msg.delete().catch(O_o=>{});
          msg.channel.send({embed: {
      color: 3447003,
      title: message
    }});
    }
};
