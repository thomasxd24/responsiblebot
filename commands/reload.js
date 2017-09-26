const fs = require("fs");
const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
  bot.commands = new Discord.Collection();
  fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop()=="js");
    if(jsfiles.length <= 0) {
      console.log("No commands to lad!");
      return;
    }
    message.channel.send(`Loading ${jsfiles.length} commands.`)
    jsfiles.forEach((f, i) => {
      let props = require(`../commands/${f}`);
      console.log(`${i+1} : ${f} Loaded`);
      bot.commands.set(props.help.name, props);


    });
    message.channel.send("Reloaded all the commands.");
    console.log(bot.commands);
  });

};

exports.help = {
  name:"reload"
}
