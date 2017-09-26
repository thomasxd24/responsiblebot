exports.run = async (client, message, [mention, ...reason]) => {
  const m = await message.channel.send("Ping?");
  m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);

};
exports.help = {
  name:"ping",
}
