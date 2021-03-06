

const permissionRole = "BeginningGamer";
const { Command } = require('discord.js-commando');
const { Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const config = require("../../config.json");
const youtube = new YouTube(config.GOOGLE_API_KEY);

module.exports = class LeaveCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            group: 'music',
            memberName: 'leave',
            description: 'leave the channel',
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
      const queue = this.client.queue;
        const serverQueue = queue.get(msg.guild.id);
  if (!serverQueue)
  {
    msg.member.voiceChannel.leave();
    if(this.client.getsong)
    {
        clearInterval(this.client.getsong)
        this.client.getsong = null
        this.client.user.setActivity(`with responsibility`);
    }
    return
  } 
  serverQueue.songs = [];
  serverQueue.voiceChannel.leave();
  queue.delete(guild.id);
  return;
      

    }
};
