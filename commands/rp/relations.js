

exports.run = async (bot, message, args) => {

  function oppositeRelation(originalRelation) {
    switch (originalRelation) {
      case "cat":
        return "Cat Owner";
        break;
      case "dog":
        return "Dog Owner";
        break;
      case "dad":
        return "Mum";
        break;
      case "mom": // fall through
      case "mum":
        return "Dad";
        break;
      default:

    }
  }


  console.log(args[2]);
  switch (args[0]) {
    case "request":
    member = `<@${message.mentions.users.first().id}>`;
    memberargs = args[1].replace('@!','@');
   console.log(member);
    console.log(args[1]);
      if(memberargs == member) {
        if(typeof args[2] !== 'undefined'){

          let requestList = bot.relationRequest.get(message.author.id);
          if (requestList === undefined){
            requestList = [];
          }
          let request = {requestedUserid : message.mentions.users.first().id, requestedUserName: message.mentions.users.first().username, relation : args.slice(2).join(' ')};
          console.log(requestList);
          requestList.push(request);
          console.log(requestList);
          bot.relationRequest.set(message.author.id,requestList);
          message.mentions.users.first().send(`Hai my friend ${message.author.username} want to be ${args.slice(2).join(' ')} with you, do: \`\`\`/relation accept @${message.author.tag} ${args.slice(2).join(' ')}\`\`\` to accept his request`)
          message.channel.send("There, I sent to that nub");
        }
        else {
          message.channel.send("No Relation");
        }

      }
      else {
        message.channel.send("Bad Boi");
      }

      break;

    case undefined:
      message.channel.send("No Commands");
      break

    case "pending":
    let requestList = bot.relationRequest.get(message.author.id)
    if (requestList === undefined){
      requestList = [];
    }
    console.log(requestList);
    requestList.forEach(
      function (item,index) {
        message.channel.send(item['requestedUserName']+"'s "+item['relation']);
      }
    )
      break;
    case "accept":
    membermention = `<@${message.mentions.users.first().id}>`;
    memberargs = args[1].replace('@!','@');
    console.log(membermention);
    console.log(args[1]);
      if(memberargs == membermention) {
        if(typeof args[2] !== 'undefined'){
          let requestList = bot.relationRequest.get(message.mentions.users.first().id)
          if (requestList === undefined){
            message.channel.send("No Request found.");
            break;
          }
          requestList.forEach(
            function (item,index) {
              if(item['requestedUserid'] === message.author.id && item['relation'] === args.slice(2).join(' '))
              {


                let relationList = bot.relation.get(message.mentions.users.first().id)
                if (relationList === undefined){
                  relationList = [];
                }
                let relation = {relationUserid : message.author.id, relationUserName: message.author.username, relation : args.slice(2).join(' ')};
                relationList.push(relation);
                bot.relation.set(message.mentions.users.first().id,relationList);



                relationList = bot.relation.get(message.author.id)
                if (relationList === undefined){
                  relationList = [];
                }
                relation = {relationUserid : message.mentions.users.first().id, relationUserName: message.mentions.users.first().username, relation : oppositeRelation(args.slice(2).join(' ').toLowerCase())};
                relationList.push(relation);
                bot.relation.set(message.author.id,relationList);



                newRequestList=bot.relationRequest.get(message.mentions.users.first().id).filter(function( obj ) {
                    return obj.requestedUserid != message.author.id;
                });
                bot.relationRequest.set(message.mentions.users.first().id,newRequestList);
                message.channel.send("There, relation accepted, Have fun!");
              }
              else{
                message.channel.send("No Request found.");
              }

            });


        }
        else {
          message.channel.send("No Relation");
        }

      }
      else {
        message.channel.send("Bad Boi");
      }

      break;

    case "list":
    let relationList = bot.relation.get(message.author.id)
    if (relationList === undefined){
      relationList = [];
    }
    else {
      console.log(relationList);
      relationList.forEach(
        function (item,index) {
          message.channel.send(item['relationUserName']+"'s "+item['relation']);
    }
  )

      }
      break;

    default:
      message.channel.send("Guess what, it didnt work...");
  }
};

exports.help = {
  name:"relation"
}
