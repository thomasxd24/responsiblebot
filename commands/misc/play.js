const permissionRole = "DedicatedMember";
const { Command } = require('discord.js-commando');
const { Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
var queue = global.queue;
const config = require("../../config.json");
const youtube = new YouTube(config.GOOGLE_API_KEY);


module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            group: 'misc',
            memberName: 'play',
            description: 'Go play.',
            examples: ['/afk'],
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
      const url = link;
      const voiceChannel = msg.member.voiceChannel;
    		if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
    		const permissions = voiceChannel.permissionsFor(msg.client.user);
    		if (!permissions.has('CONNECT')) {
    			return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
    		}
    		if (!permissions.has('SPEAK')) {
    			return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
    		}

    		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
    			const playlist = await youtube.getPlaylist(url);
    			const videos = await playlist.getVideos();
    			for (const video of Object.values(videos)) {
            if (queue.get(msg.guild.id)) {
              if(queue.get(msg.guild.id).songs.length == 10)
              {
                return msg.reply(`✅ Playlist: **${playlist.title}** has been added to the queue! You cannot exceed song queue limit (10) because of <@!325644122063110156>`);
              }
            }

    				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
    				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
    			}
    			return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
    		} else {
    			try {
    				var video = await youtube.getVideo(url);
    			} catch (error) {
    				try {
    					var videos = await youtube.searchVideos(url, 10);
    					let index = 0;
    					msg.channel.send(`
    __**Song selection:**__ \n${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
    Please provide a value to select one of the search results ranging from 1-10. You have 10 seconds to choose.
    					`);
    					// eslint-disable-next-line max-depth
    					try {
    						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
    							maxMatches: 1,
    							time: 10000,
    							errors: ['time']
    						});
    					} catch (err) {
    						console.error(err);
    						return msg.channel.send('No or invalid value entered, cancelling video selection.');
    					}
    					const videoIndex = parseInt(response.first().content);
    					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
    				} catch (err) {
    					console.error(err);
    					return msg.channel.send('🆘 I could not obtain any search results.');
    				}
    			}
    			return handleVideo(video, msg, voiceChannel);
    		}
    }
};



async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
    if(queue.get(msg.guild.id).songs.length == 10)
    {
      return msg.reply(`You cannot exceed song queue limit (10) because of <@!325644122063110156>`);
    }
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Now playing: **${song.title}**`);
}
