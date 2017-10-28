const { Command } = require('discord.js-commando');
module.exports = class PunishCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'punish',
            group: 'moderation',
            memberName: 'punish',
            description: 'Punish someone.',
            examples: ['/punish <mention> <reason>'],
            args: [
                {
                    key: 'user',
                    prompt: 'Which user do you want to punish',
                    type: 'user'
                },
                {
                    key: 'reason',
                    prompt: 'Why would you want to punish him?',
                    type: 'string'
                }
            ]
        });
    }

    run(message, { user, content }) {
      sqlite.each(`SELECT * FROM offences WHERE userid = "${message.author.id}" and `).then(row => {


}).catch(() => {

});
    }
};
