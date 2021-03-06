const { Command } = require('discord.js-commando');

module.exports = class WWWCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'www',
            group: 'misc',
            memberName: 'www',
            description: 'Provide the link to ExtremeCraft.',
            examples: ['/www'],
            args: [
                {
                    key: 'text',
                    prompt: 'Text? Ignore this command it does nothing',
                    type: 'string'
                }
            ]
        });
    }

    run(msg,{text}) {
         console.log(text.split(''));
    }
};
