const { Command } = require('discord.js-commando');

module.exports = class subscriberCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'subscriber',
            group: 'misc',
            memberName: 'subscriber',
            description: 'Give the ranks nesscary for subscriber to a user.',
            examples: ['/subscriber']
        });
    }

    run(msg) {
      if(msg.author.id == "186824408227119104" or msg.author.id == "325644122063110156")
      {
        let role1 = msg.guild.roles.find("name", "DedicatedMember");
        let role2 = msg.guild.roles.find("name", "Subscriber");


  // Let's pretend you mentioned the user you want to add a role to (!addrole @user Role Name):
  let member = msg.mentions.members.first();

  // or the person who made the command: let member = message.member;

  // Add the role!
  member.addRole(role1).catch(console.error);

  // Remove a role!
  member.addRole(role2).catch(console.error);
      }
      else {
        msg.channel.send("No permission nub");
      }

    }
};
