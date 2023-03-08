const Discord = require('discord.js');
const db = require('quick.db');
const users = require('../dataNew/users.json');
const logId = "829847635400589342";
module.exports = {
  name: 'unblacklist',
  description: 'unblacklists a user',
  run: async (message, Client, guild, channel, args) => {
    if(!users.allStaff.includes(message.author.id)) {
      message.reply('You do not have permission');
      return;
    }
    if(!args[0]) {
      message.reply('You need to provide a user');
      return;
    }
    if(isNaN(args[0])) {
      message.reply('User must be an ID');
      return;
    }
    if(!db.get(`${args[0]}-blacklisted`)) {
      message.reply('This user isnt blacklisted.');
      return;
    }
    
    try {
      db.delete(`${args[0]}-blacklisted`);
      db.delete(`${args[0]}-blacklistreason`);
    } catch(e) {
      console.log(e);
      message.reply('Something broke, please try again');
      return;
    }
    Client.channels.cache.get(logId).send(getEmbed(message.author, args[0], Client))
                                          .catch((e) => {
      console.log(e);
    });
  }
};

async function getEmbed(moderator, target, Client) {
  const Embed = new Discord.MessageEmbed()
  	.setTitle('Un-blacklist')
  	.addFields(
      {name: 'User', value: `<@!${target}>\nID: ${target}\nTag: soon:tm:`, inline: true},
      {name: 'Moderator', value: `<@!${moderator.id}>ID: ${moderator.id}\nTag: ${moderator.tag}`, inline: true}
    )
  	.setTimestamp();
  return Embed;
}
