const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
const Enmap = require('enmap');
const config = require("./config.json");
const prefix = config.prefix;
bot.commands = new Discord.Collection();


// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  let jsfiles = files.filter(f => f.split(".").pop()=="js");
  if(jsfiles.length <= 0) {
    console.log("No commands to load!");
    return;
  }

  console.log(`Loading ${jsfiles.length} commands.`)
  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${i+1} : ${f} Loaded`);
    bot.commands.set(props.help.name, props);

  });
});


bot.on('ready',()=>{
  console.log('Bot is ready!');
  console.log(bot.commands);
  bot.relationRequest = new Enmap({name: "relationRequest",persistent: true});
  bot.relation = new Enmap({name: "relation",persistent: true});
  console.log("Loaded relationRequest");
  console.log("Loaded relation");
  bot.user.setGame(`with BigBrother.`);
  var anti_spam = require("./anti-spam.js");
  anti_spam(bot, {
    warnBuffer: 3, //Maximum amount of messages allowed to send in the interval time before getting warned.
    maxBuffer: 5, // Maximum amount of messages allowed to send in the interval time before getting banned.
    interval: 4000, // Amount of time in ms users can send a maximum of the maxBuffer variable before getting banned.
    warningMessage: "stop spamming or you will be warned/muted.", // Warning message send to the user indicating they are going to fast.
    banMessage: "has been muted for spamming for 5 minutes, anyone else?", // Ban message, always tags the banned user in front of it.
    maxDuplicatesWarning : 3, // Maximum amount of duplicate messages a user can send in a timespan before getting warned
    maxDuplicatesBan : 5, // Maximum amount of duplicate messages a user can send in a timespan before getting banned
});
})

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") message.channel.send("LOL");
  if(message.member.roles.some(r=>["Muted"].includes(r.name)) )
     return message.delete().catch(O_o=>{});
  let messageArrary = message.content.split(/\s+/g);
  let command = messageArrary[0];
  let args = messageArrary.slice(1);
  if(!command.startsWith(prefix))  return;
  let cmd = bot.commands.get(command.slice(prefix.length));
  if(cmd) cmd.run(bot, message ,args);


});



bot.login(config.token);
