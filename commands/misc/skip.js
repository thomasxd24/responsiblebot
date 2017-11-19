const permissionRole = "DedicatedMember";
const { Command } = require('discord.js-commando');
const { Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const config = require("../../config.json");
const youtube = new YouTube(config.GOOGLE_API_KEY);
const queue = global.queue;


module.exports = class SkipCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            group: 'misc',
            memberName: 'skip',
            description: 'Go play.',
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
        return true;
      }
      else {
        return false;
      }
    }

    async run(msg,{link}) {
			const serverQueue = queue.get(msg.guild.id);
			if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');



    }
};
