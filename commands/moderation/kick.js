exports.run = async (client, message, args) => {

  if(!message.member.roles.some(r=>["Administrator", "Dev"].includes(r.name)) )
        return message.channel.send("Sorry, you don't have permissions to use this!");

      // Let's first check if we have a member and if we can kick them!
      // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
      let member = message.mentions.members.first();
      if(!member)
        return message.channel.send("Please mention a valid member of this server");
      if(!member.kickable)
        return message.channel.send("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

      // slice(1) removes the first part, which here should be the user mention!
      let reason = args.slice(1).join(' ');
      if(!reason)
        return message.channel.send("Please indicate a reason for the kick!");

      // Now, time for a swift kick in the nuts!
      await member.kick(reason)
        .catch(error => message.channel.send(`Sorry ${message.author} I couldn't kick because of : ${error}`));
      message.channel.send(`${member.user.username} has been kicked by ${message.author.username} because: ${reason}`);
};

exports.help = {
  name:"kick"
}
