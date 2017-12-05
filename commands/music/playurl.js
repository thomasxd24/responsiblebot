const permissionRole = "BeginningGamer";
const { Command } = require('discord.js-commando');
const { Util } = require('discord.js');
const request = require('request');
const queue = global.queue;

module.exports = class PlayURLCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'playurl',
            group: 'music',
            memberName: 'playurl',
            description: 'play a stream in url',
            examples: ['/playurl'],
            args: [
                {
                    key: 'link',
                    prompt: 'What are u trying to play?',
                    type: 'string'
                }
            ]
        });
    }

    hasPermission(msg) {
      const minRole = msg.guild.roles.find("name",permissionRole)
      if(minRole == null)
      {
        return false;
      }
      
      if(msg.member.highestRole.comparePositionTo(minRole) >= 0)
      {
        if(msg.channel.name == "music") return true;
        return "You have to run the command #music in order to play music";
      }
      else {
        return false;
      }
  
    }

    async run(msg,{link}) {
		const channel = msg.member.voiceChannel;
        if (!channel) return msg.channel.send(':warning:  |  **You are not on a voice channel.**');
            msg.member.voiceChannel.join().then(connection => {
                connection.playStream(request(link)).on('error', (err) => {
                    console.log(err)
                })
            })
            .catch(console.error);

    }
};
