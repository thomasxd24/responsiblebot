const permissionRole = "BeginningGamer";
const { Command } = require('discord.js-commando');
const { Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const config = require("../../config.json");
const youtube = new YouTube(config.GOOGLE_API_KEY);

module.exports = class StopCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            group: 'misc',
            memberName: 'stop',
            description: 'Stops the bot and empty the whole queue',
            examples: ['/afk']

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

    async run(msg) {
      const queue = this.client.queue;
			const serverQueue = queue.get(msg.guild.id);
      if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
if (!serverQueue) return msg.channel.send('There is nothing playing that I could stop for you.');
serverQueue.songs = [];
serverQueue.connection.dispatcher.end('Stop command has been used!');
    }
};
