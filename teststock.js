const discord = require('discord.js');
global.queue = new discord.Collection();
queue = global.queue;
queue.set('123',{
    songs: [],
    loopqueue : []
})
queue.get('123').songs = ["1","2"]
 queue.get('123').loopqueue = Object.assign([], queue.get('123').songs);
queue.get('123').songs.shift()
console.log(queue.get('123').loopqueue)
console.log(queue.get('123').songs)
