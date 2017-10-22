const fs = require("fs");
const Enmap = require('enmap');
const commando = require('discord.js-commando');
const path = require('path');
const oneLine = require('common-tags').oneLine;
const sqlite = require('sqlite');
const config = require("./config.json");

const client = new commando.Client({
	owner: '186824408227119104',
	commandPrefix: '/'
});

client
	.on('error', console.error)
	.on('warn', console.warn)
	.on('debug', console.log)
	.on("guildMemberAdd", (member) => {
		console.log(member.guild.roles.find("name","BeginningGamer").name);
		console.log(member.addRole(member.guild.roles.find("name","BeginningGamer")));
		member.guild.channels.find("name", "welcome").send("Welcome to our server <@"+member.id+">.\nRemember to be responsible :wink:").catch(console.log);

})
	.on('ready', () => {
    client.relationRequest = new Enmap({name: "relationRequest",persistent: true});
    client.relation = new Enmap({name: "relation",persistent: true});
    client.muted = new Enmap({name: "muted",persistent: true});
    client.offences = new Enmap({name: "offences",persistent: true});
    console.log("Loaded relationRequest");
    console.log("Loaded relation");
    console.log("Loaded muted");
    console.log("Loaded offences");
    client.user.setGame(`with responsibility -_-`);
    var anti_spam = require("./anti-spam.js");
    anti_spam(client, {
      warnBuffer: 5, //Maximum amount of messages allowed to send in the interval time before getting warned.
      maxBuffer: 8, // Maximum amount of messages allowed to send in the interval time before getting banned.
      interval: 2000, // Amount of time in ms users can send a maximum of the maxBuffer variable before getting banned.
      warningMessage: "stop spamming or you will be warned/muted.", // Warning message send to the user indicating they are going to fast.
      banMessage: "has been muted for spamming for 5 minutes, anyone else?", // Ban message, always tags the banned user in front of it.
      maxDuplicatesWarning : 3, // Maximum amount of duplicate messages a user can send in a timespan before getting warned
      maxDuplicatesBan : 5, // Maximum amount of duplicate messages a user can send in a timespan before getting banned
  });
    console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
	})
	.on('disconnect', () => { console.warn('Disconnected!'); })
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
	});

client.setProvider(
	sqlite.open(path.join(__dirname, 'database.sqlite3')).then(db => new commando.SQLiteProvider(db))
).catch(console.error);

client.registry
.registerDefaultTypes()
  .registerGroups([
      ['moderation', 'Moderation'],
      ['rp', 'RolePlay'],
			['image', 'Images'],
      ['util', 'Utility'],
      ['misc','Miscellaneous'],

  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(config.token);
