

var Discord = require('discord.js');
var bot = new Discord.Client();
var config = require('./config.json');
var request = require('request');
console.log("Starting bot...");

var commands = {
    "help": {
        process: function (msg, suffix) {
            msg.author.send([
                ":page_facing_up:  |  **Commands available:**",
				"```perl",
                "br!help #Sends this message",
                "br!join #Join to your channel",
				"br!leave #Leaves the voice channel",
				"br!play <rap/jazz/dubstep> #Play the radio",
				//"br!search #Find a radio and play",
				"br!invite #Generate an invitation link you can use to invite the bot to your server",
				"```",
				"",
				"Hi! I'm **Baba Radio**, A simple bot focused on play music. I'm developed by `perronosaurio (Waxtz)#1767`"
            ]);
            msg.channel.send(":mailbox_with_mail:  |  **Check your private messages!**");
        }
    },
    "join": {
        process: function (msg, suffix) {
			const channel = msg.member.voiceChannel;
			if (!channel) return msg.channel.send(':warning:  |  **You are not on a voice channel.**');
			if(!msg.member.voiceChannel.joinable) {
				msg.channel.send(":warning:  |  **I\'m unable to play music in this channel.**");
				return;
			}
			msg.member.voiceChannel.join();
			msg.channel.send(":loudspeaker:  |  **Successfully joined!**");
        }
    },
    "play": {
        process: function (msg, suffix) {
			const channel = msg.member.voiceChannel;
			if (!channel) return msg.channel.send(':warning:  |  **You are not on a voice channel.**');
				msg.member.voiceChannel.join().then(connection => {
					console.log(connection);
					connection.playStream(request("http://radio.truckers.fm")).on('error', (err) => {
						console.log(err)
					})
				})
				.catch(console.error);
		
		}
    },
/*	"search": {
		process: function (msg, suffix) {
			const channel = msg.member.voiceChannel;
			if (!channel) return msg.channel.send(':warning:  |  **You are not on a voice channel.**');
			if (!suffix) {
				msg.channel.send(":warning:  |  **Insert a tag to search**");
				return;
			}
			msg.member.voiceChannel.join().then(connection => {
				require('http').get("http://streaming.radionomy.com/"+suffix, (res) => {
					connection.playStream(res);
				})
			})
			msg.channel.send(":musical_note:  |  **Searching and reproducing...**");
		}
	},*/
	"leave": {
		process: function (msg, suffix) {
            const voiceChannel = msg.member.voiceChannel;
            if (voiceChannel) {
                if (msg.member.hasPermission("MANAGE_GUILD") == false) {
					msg.channel.send(":warning:  |  **You do not have sufficient permissions.**");
                    return
                }
				msg.channel.send(":loudspeaker:  |  **Successfully left!**");
                msg.member.voiceChannel.leave();
            } else {
                msg.channel.send(":warning:  |  **I am not currently in a voice channel.**");
            }
		}
	},
	"invite": {
		process: function (msg, suffix) {
			msg.channel.send(":tickets:  |  **Invite link:** `https://discordapp.com/oauth2/authorize?&client_id=321784105119514625&scope=bot&permissions=36702208`");
		}
	}
};

bot
.on('error', console.error)
.on('warn', console.warn)
.on('debug', console.log)
.on("ready", function () {
	console.log("Logged in " + bot.guilds.array().length + " servers");
	bot.user.setActivity("with me");
});



bot.on('message', function (msg) {
    if(msg.content.indexOf(config.prefix) === 0) {
		var cmdTxt = msg.content.split(" ")[0].substring(config.prefix.length);
		var cmd = commands[cmdTxt];
        var suffix = msg.content.substring(cmdTxt.length + config.prefix.length+1);
        if(cmd !== undefined) {
            cmd.process(msg, suffix);
        } else {
			cmdTxt = cmdTxt.replace('`', '');
			if (cmdTxt === ''){
				var cmdTxt = "none";
			}
            msg.channel.send(":warning:  |  **The command** `" + cmdTxt + "` **don't exist, for more help use** `" + config.prefix + "help`");
        }
    }
});

bot.login(config.token);
