const permissionRole = "BeginningGamer";
const { Command } = require('discord.js-commando');
const { Util } = require('discord.js');
const request = require('request');
const queue = global.queue;

module.exports = class PlayRadioCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'playradio',
            group: 'music',
            memberName: 'playradio',
            description: 'play a stream in url',
            examples: ['/playurl']
        });
    }

    hasPermission(msg) {
      const minRole = msg.guild.roles.find("name",permissionRole)
      if(minRole == null)
      {
        return true;
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

    async run(msg) {
		const channel = msg.member.voiceChannel;
        if (!channel) return msg.channel.send(':warning:  |  **You are not on a voice channel.**');
            msg.member.voiceChannel.join().then(connection => {
                connection.playStream(request("https://radio.truckers.fm")).on('error', (err) => {
                    console.log(err)
                })
            })
            .catch(console.error);

    }
};