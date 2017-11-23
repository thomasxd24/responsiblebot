const fs = require("fs");
const commando = require('discord.js-commando');
const discord = require('discord.js');
const path = require('path');
const oneLine = require('common-tags').oneLine;
const sqlite = require('sqlite');
const config = require("./config.json");
const punishreason = new discord.Collection();
const punishlevel = new discord.Collection();
const express = require('express');
const app = express();
const http = require('http');
global.queue = new discord.Collection();
// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 5000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the `public` directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', (request, response) => {
    // ejs render automatically looks in the views folder
    response.render('index');
});

app.listen(port, () => {
    // will echo 'Our app is running on http://localhost:5000 when run locally'
    console.log('Our app is running on http://localhost:' + port);
});
setInterval(() => {
  http.get('http://littlebrother-discord.herokuapp.com');
}, 900000);
global.stockfish = require("stockfish");
console.log(global.stockfish);
global.afk = new discord.Collection();
const client = new commando.Client({
	owner: ['186824408227119104','325644122063110156'],
	commandPrefix: '/'
});

client
	.on('error', console.error)
	.on('warn', console.warn)
	.on('debug', console.log)
	.on("guildMemberAdd", (member) => {
		console.log(member.addRole(member.guild.roles.find("name","BeginningGamer")));
		member.guild.channels.find("name", "welcome").send("Welcome to our server <@"+member.id+">.\nRemember to be responsible :wink:").catch(console.log);

})
	.on('ready', () => {




		// let punishlevel = {punishtype : , punishduration: };
    client.user.setGame(`with responsibility`);
    // var anti_spam = require("./anti-spam.js");
  //   anti_spam(client, {
  //     warnBuffer: 5, //Maximum amount of messages allowed to send in the interval time before getting warned.
  //     maxBuffer: 8, // Maximum amount of messages allowed to send in the interval time before getting banned.
  //     interval: 1000, // Amount of time in ms users can send a maximum of the maxBuffer variable before getting banned.
  //     warningMessage: "refrain from spamming or you shall be punished accordingly.", // Warning message send to the user indicating they are going to fast.
  //     banMessage: "has been muted for spamming for 5 minutes, anyone else?", // Ban message, always tags the banned user in front of it.
  //     maxDuplicatesWarning : 3, // Maximum amount of duplicate messages a user can send in a timespan before getting warned
  //     maxDuplicatesBan : 5, // Maximum amount of duplicate messages a user can send in a timespan before getting banned
  // });
    console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
	})
	.on('disconnect', () => { console.warn('Disconnected!'); })
	.on('guildMemberRemove', (member) => { member.guild.channels.find("name", "logs").send(`<@${member.id}> Left the server`).catch(console.log); })
	.on('reconnecting', () => { console.warn('Reconnecting...'); })
	.on('commandError', (cmd, err) => {
		if(err instanceof commando.FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on('commandBlocked', (msg, reason) => {
		console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
	})
	.on('commandPrefixChange', (guild, prefix) => {
		console.log(oneLine`
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		console.log(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on("message", async message => {
	  if(message.member.roles.some(r=>["Muted"].includes(r.name)) )
	     return message.delete().catch(O_o=>{});

		if(message.guild.name == "ResponsibleRevolution" && !message.author.bot && message.channel.name == "suggestions" && !message.content.startsWith("Suggestion:"))
		{

					 message.delete().catch(O_o=>{});
					 message.author.send("Please use the correct format. (Suggestion:) in #suggestion")


	  }
		if(!message.author.bot)
		{
			if(global.afk.get(message.author.id))
			{
				global.afk.delete(message.author.id);
				message.channel.send(`<@${message.author.id}> is no longer afk.`)
			}
			if(global.afk.get(message.mentions.users.first()))
			{
				if(global.afk.get(message.mentions.users.first().id)['afkmsg'] != "")
        {
          message.reply(`<@${message.mentions.users.first().id}> is currently afk for: ${global.afk.get(message.mentions.users.first().id)['afkmsg']}.`)
        }
        else {
          message.reply(`<@${message.mentions.users.first().id}> is currently afk.`)
        }
      }


		}



	});



client.setProvider(
	sqlite.open(path.join(__dirname, 'database.sqlite3')).then(db => new commando.SQLiteProvider(db))
).catch(console.error);
// console.log(sqlite.all('SELECT * FROM punishreason').then(rows => function(x){
// 	consolve.log(x);
// 	x.forEach(function (row) {
// 		console.log(row.reasonid.toString());
// 	})
// })
// );

client.registry
.registerDefaultTypes()
  .registerGroups([
      ['moderation', 'Moderation'],
      ['rp', 'RolePlay'],
			['image', 'Images'],
      ['util', 'Utility'],
      ['music', 'Music (Only Works at #music)'],
      ['misc','Miscellaneous'],

  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(config.token);
