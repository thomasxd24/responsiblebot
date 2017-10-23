
const { Command } = require('discord.js-commando');
module.exports = class KickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            group: 'moderation',
            memberName: 'mute',
            description: 'Mute someone.',
            examples: ['/mute <mention> <reason>']
        });
    }

    run(message) {
      if(message.author.id == "186824408227119104" || message.author.id == "325644122063110156")
      {
        let role1 = message.guild.roles.find("name", "Muted");
        let role2 = message.guild.roles.find("name", "Subscriber");


  // Let's pretend you mentioned the user you want to add a role to (!addrole @user Role Name):
  let member = message.mentions.members.first();

  // or the person who made the command: let member = message.member;

  // Add the role!
  member.addRole(role1).catch(console.error);
    message.channel.send("You're muted.");

  // Remove a role!
      }
      else {
        msg.channel.send("No permission nub");
      }
    }
};
