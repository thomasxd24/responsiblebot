exports.run = async (client, message, args) => {

    message.delete().catch(O_o=>{});
      message.channel.send({embed: {
  color: 3447003,
  title: "```* "+message.author.username+" is scared...```"
}})
};

exports.help = {
  name:"scared"
}
