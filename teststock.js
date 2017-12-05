const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
  client.user.setActivity(`with responsibility`);
})
.on('error', console.error)
.on('warn', console.warn)
.on('debug', console.log);

client.on('message', async message => {
  if (message.content === 'ping') {
    message.reply('pong');
    try {
        const responses = await message.channel.awaitMessages(msg2 => msg2.author.id === message.author.id, {
            max: 1,
            time: 10000
        });
        console.log(responses.first().content)

    } catch (e) {
        console.log(e)
    }
    
    console.log("got the message")
  }
});

client.login('Mzg1NDE2NDM0MDE4Mjg3NjE3.DQBD9Q.fcfO0YXbG1ce9f-HRJ29gjcV3Yg');