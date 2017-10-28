const { Command } = require('discord.js-commando');

module.exports = class KillCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kill',
            group: 'rp',
            memberName: 'kill',
            description: 'Kill someone.',
            examples: ['/kill']
        });
    }

    run(message) {
      let member = message.mentions.members.first().displayName;
      let messagearrary = ["```* "+message.member.displayName+" was brutally slaughtered by "+member+"...```", `\`\`\`* ${message.mentions.members.first().displayName} took a necessity from ${message.member.displayName} and they died of poverty. They had food, water, clothing and shelter but no **responsibility**\`\`\``, `\`\`\`* ${message.mentions.members.first().displayName} was spared but alas died shortly after for the **responsibility** of life was too torturous\`\`\``];
      message.delete().catch(O_o=>{});
        message.channel.send({embed: {
    color: 3447003,
    title: messagearrary[Math.floor(Math.random() * messagearrary.length)]
  }});
    }
};
