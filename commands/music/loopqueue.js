const permissionRole = "DedicatedMember";
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
      const userMaxPermission = msg.member.roles.sort((r1, r2) => r2.calculatedPosition - r1.calculatedPosition).first().calculatedPosition;
      if(msg.guild.roles.find("name",permissionRole) == null)
      {
        return false;
      }
      const cmdPermission = msg.guild.roles.find("name",permissionRole).calculatedPosition;
      if(userMaxPermission >= cmdPermission)
      {
        if(msg.channel.name == "music") return true;
        return false;
      }
      else {
        return false;
      }
    }

    async run(msg,{link}) {
			const serverQueue = queue.get(msg.guild.id);
			if (!serverQueue) return msg.channel.send('There is nothing playing.');
      if(serverQueue.loopqueue == '')
      {
        serverQueue.loopqueue = Object.assign([], serverQueue.songs);
        msg.channel.send(`Loop Queue Enabled!`);
      }
      else {
        serverQueue.loopqueue = [];
        msg.channel.send(`Loop Queue Disabled!`);
      }

    }
};
