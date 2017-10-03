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



    run(msg) {
      var chance = Math.random();
      if (chance > 0.95) {
        msg.delete().catch(O_o=>{});
          msg.channel.send({embed: {
      color: 3447003,
      title: "```* OMG HELLO!!!```"
    }});
      } else {
        msg.channel.send(msg.author.username+", Unknown command. Use `/help` or `@LittleBrother#3486 help` to view the list of all commands.");
      }

    }
};
