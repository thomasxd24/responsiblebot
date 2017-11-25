const permissionRole = "DedicatedMember";
const { Command } = require('discord.js-commando');
const { Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const queue = global.queue;
const config = require("../../config.json");
const youtube = new YouTube(config.GOOGLE_API_KEY);

module.exports = class PauseCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            group: 'music',
            memberName: 'pause',
            description: 'Pause the music',
            examples: ['/afk']
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
        if(msg.author.id == '363910251793219585') return false;
        if(msg.channel.name == "music") return true;
        return false;
      }
      else {
        return false;
      }
    }

    async run(msg) {
			const serverQueue = queue.get(msg.guild.id);
      if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('⏸ Paused the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
    }
};
