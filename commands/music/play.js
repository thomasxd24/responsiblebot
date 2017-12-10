const permissionRole = "BeginningGamer";
const { Command } = require('discord.js-commando');
const { Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const config = require("../../config.json");
const youtube = new YouTube(config.GOOGLE_API_KEY);


module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'Play a youtube link or playlist or search in youtube',
            examples: ['/play'],
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
		const minRole = msg.guild.roles.find("name",permissionRole)
		if(minRole == null)
		{
		  return false;
		}
		
		if(msg.member.highestRole.comparePositionTo(minRole) >= 0)
		{
		  if(msg.channel.name == "music") return true;
		  return "You have to run the command in #music in order to play music";
		}
		else {
		  return false;
		}

    }

    async run(msg,{link}) {
	var queue = this.client.queue;
	var serverQueue = queue.get(msg.guild.id);
		
			var itag = 18;
      const url = link;
      const voiceChannel = msg.member.voiceChannel;
    		if (!voiceChannel) return msg.channel.send('You are requred to be in a voice channel in order for music to commence!');
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
              if(queue.get(msg.guild.id).songs.length == 100)
              {
                return msg.reply(`✅ Playlist: **${playlist.title}** has been added to the queue! You cannot exceed song queue limit (100)`);
              }
            }

						const video2 = await youtube.getVideoByID(video.id);
						if(video.durationSeconds == 0)
						{
							itag = 94
						} // eslint-disable-line no-await-in-loop
						
    				await handleVideo(queue, video2, msg, voiceChannel, true,itag); // eslint-disable-line no-await-in-loop
    			}
    			return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
    		} else {
    			try {
						var video = await youtube.getVideo(url);
						if(video.durationSeconds == 0)
						{
							itag = 94
						}
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
    							max:1,
    							time: 10000,
    							errors: ['time']
							}
						);
							console.time('voice')
							
    					} catch (err) {
    						console.error(err);
    						return msg.channel.send('No or invalid value entered, cancelling video selection.');
    					}
    					const videoIndex = parseInt(response.first().content);
							var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
							if(video.durationSeconds == 0)
							{
								itag = 94
							}
    				} catch (err) {
    					console.error(err);
    					return msg.channel.send('🆘 I could not obtain any search results.');
    				}
					}
					console.timeEnd('voice')
					return handleVideo(queue,video, msg, voiceChannel,false,itag);
    			
    		}
	}
	

	
};



async function handleVideo(queue, video, msg, voiceChannel, playlist = false, itag = 18) {
	
	
	var serverQueue = queue.get(msg.guild.id);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`,
		itag: itag
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
			loop: false,
			loopqueue : []
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			
			play(queue,msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
    if(queue.get(msg.guild.id).songs.length == 100)
    {
      return msg.reply(`You cannot exceed song queue limit (100)`);
    }
		serverQueue.songs.push(song);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
	}
	return undefined;
}

async function play(queue,guild, song , skipto = undefined) {
	var serverQueue = queue.get(guild.id);
	console.log(serverQueue)
	if (!song) {
		if(serverQueue.loopqueue != '')
		{
			serverQueue.songs = Object.assign([], serverQueue.loopqueue);
			song = serverQueue.songs[0]
			
		}
		else
		{
			serverQueue.voiceChannel.leave();
			queue.delete(guild.id);
			return;
		}
			

		
	}
	
	const dispatcher = serverQueue.connection.playStream(ytdl(song.url,{audioonly: true,quality:song.itag}),{bitrate:96000,passes:1})
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
      if (!serverQueue.loop)
      {

        serverQueue.songs.shift();
	  }
	  play(queue,guild, serverQueue.songs[0])
               	     
		})
		.on('error', error => console.error(error+"error:"));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Now playing: **${song.title}**`);
}
