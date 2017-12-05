const permissionRole = "BeginningGamer";
const { Command } = require('discord.js-commando');
const { Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const queue = global.queue;
const config = require("../../config.json");
const youtube = new YouTube(config.GOOGLE_API_KEY);

module.exports = class LoopqueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'loopqueue',
            group: 'music',
            memberName: 'loopqueue',
            description: 'Loop the currently queue',
            examples: ['/loopqueue']
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
  if (!serverQueue)
  {
    return msg.guild.voiceChannel.leave();
  } 
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end('Stop command has been used!');
      }

    }
};
