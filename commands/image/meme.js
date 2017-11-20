const permissionRole = "DedicatedMember";
const { Command } = require('discord.js-commando');

const config = require("../../config.json");

module.exports = class MemeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'meme',
            group: 'image',
            memberName: 'meme',
            description: 'See the top new memes on imgur!',
            examples: ['/meme']
        });
    }

    hasPermission(msg) {
      const userMaxPermission = msg.member.roles.sort((r1, r2) => r2.calculatedPosition - r1.calculatedPosition).first().calculatedPosition;
      if(msg.guild.roles.find("name",permissionRole) == null)
      {
        return false;
      }
      const cmdPermission = msg.guild.roles.find("name",permissionRole).calculatedPosition;
      if(userMaxPermission >= cmdPermission)
      {
        return true;
      }
      else {
        return false;
      }
    }

// Credit : Unsplash source API. (Do not remove this comment.)
    run(message) {
      var request = require('superagent');
      request.get(`https://api.imgur.com/3/g/memes/viral/${Math.floor((Math.random() * 8) + 1)}`) // 20 Memes per page, 160 Memes
    .set('Authorization', 'Client-ID ' + config.api_key_imgur)
    .end(function (err, result) {
      if (!err && !result.body.data.error) {
        message.channel.send(result.body.data[Math.floor((Math.random() * 20) + 1)].link)
      } else {
        console.log(result.body.data.error);
        console.log(config.api_key_imgur);
      }
    })

  // message.channel.createMessage({ embed: {
  //   title: post.data.title,
  //   url: post.data.url,
  //   image: { url: post.data.preview.images[0].source.url },
  //   description: post.data.url,
  //   footer: { text: `posted by ${post.data.author}` }
  // }})
    }
};
