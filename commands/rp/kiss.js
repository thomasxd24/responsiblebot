exports.run = async (client, message, args) => {

    let member = message.mentions.users.first().username;
    message.delete().catch(O_o=>{});
      message.channel.send({embed: {
  color: 3447003,
  title: "```* "+message.author.username+" kissed "+member+"...```"
}})
};

exports.help = {
  name:"kiss"
}
