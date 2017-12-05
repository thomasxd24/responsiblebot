const permissionRole = "BeginningGamer";
const { Command } = require('discord.js-commando');
const { Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const queue = global.queue;
const config = require("../../config.json");
const youtube = new YouTube(config.GOOGLE_API_KEY);

module.exports = class LoopCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'loop',
            group: 'music',
            memberName: 'loop',
            description: 'Loop the currently',
            examples: ['/loop']
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
			const serverQueue = queue.get(msg.guild.id);
			if (!serverQueue) return msg.channel.send('There is nothing playing.');
      if(serverQueue.loop)
      {
        serverQueue.loop = false;
        msg.channel.send(`:repeat_one: Disabled!`);
      }
      else {
        serverQueue.loop = true;
        msg.channel.send(`:repeat_one: Enabled!`);
      }

    }
};
