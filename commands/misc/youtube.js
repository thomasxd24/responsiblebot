const { Command } = require('discord.js-commando');

module.exports = class YoutubeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'youtube',
            group: 'misc',
            memberName: 'youtube',
            description: 'Provide the subscribe link to ResponsibleGamer.',
            examples: ['/youtube']
        });
    }

    run(msg) {
        msg.delete().catch(O_o=>{});
          msg.channel.send({embed: {
      color: 3447003,
      title: "https://www.youtube.com/channel/UCaDwPGJq1auhAWrJ4ImV5eg?sub_confirmation=1"
    }});
    }
};
