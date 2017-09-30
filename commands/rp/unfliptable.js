const { Command } = require('discord.js-commando');

module.exports = class UnFlipTableCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unfliptable',
            group: 'rp',
            memberName: 'unfliptable',
            description: 'Put the flipped table back.',
            examples: ['unfliptable']
        });
    }

    run(msg) {
        msg.delete().catch(O_o=>{});
          msg.channel.send({embed: {
      color: 3447003,
      title: "```* "+msg.author.username+" ┬─┬ ﻿ノ( ゜-゜ノ) -ed...```"
    }});
    }
};
