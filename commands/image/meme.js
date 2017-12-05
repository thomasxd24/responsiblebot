const permissionRole = "BeginningGamer";
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
      const minRole = msg.guild.roles.find("name",permissionRole)
      if(minRole == null)
      {
        return false;
      }
      
      if(msg.member.highestRole.comparePositionTo(minRole) >= 0)
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
