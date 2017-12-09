const permissionRole = "BeginningGamer";
const { Command } = require('discord.js-commando');
const { Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const config = require("../../config.json");
const youtube = new YouTube(config.GOOGLE_API_KEY);



module.exports = class SkiptoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'skipto',
            group: 'music',
            memberName: 'skipto',
            description: 'Skips Now Playing',
            examples: ['/afk'],
            args: [
                {
                    key: 'number',
                    prompt: 'which one would you want to skip to? (Get the queue list in /queue)',
                    type: 'integer'
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

    async run(msg,{number}) {
      const queue = this.client.queue;
			const serverQueue = queue.get(msg.guild.id);
			if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could skip for you.');
    if(0 < number <= serverQueue.songs.length)
    {
      if(number == 1)
      {
        return msg.channel.send('You cannot skip to the currently song!');
      }
      if(number == 2)
      {
        serverQueue.connection.dispatcher.end('Skip command has been used!');
      }
      serverQueue.songs.splice(1,number-2);
      serverQueue.connection.dispatcher.end('Skip command has been used!');
    }
    else {
      return msg.channel.send('Illegal number!');
    }




    }
};
