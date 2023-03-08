const Discord = require('discord.js');
const db = require('quick.db');
const users = require('../dataNew/users.json');
const logId = "829847635400589342";

module.exports = {
  name: 'blacklist',
  description: 'Allows any staff member to blacklist any none staff member',
  run: async (message, Client, guild, channel, args) => {
    if(!users.allStaff.includes(message.author.id)) {
      message.reply('You do not have permission');
      return;
    }
    if(!args[0] || !args[1]) {
      message.reply('You need both a user and a reason');
      return;
    }
    if(users.allStaff.includes(args[0])) {
      message.reply('You cant do that');
      return;
    }
    if(isNaN(args[0])) {
      message.reply('User must be an ID');
      return;
    }
    if(db.get(`${args[0]}-blacklisted`)) {
      message.reply('This user is already blacklisted.');
      return;
    }
    //if(users.partners.includes(args[0])) {
    //   if(!users.srStaff.includes(message.author.id) && !users.developers.includes(message.author.id)) {
    //  	message.reply('Only managers can blacklist partners');
    //  	return;
    //	}
  	//}
    try {
    	db.set(`${args[0]}-blacklisted`, true);
      let user = args.shift();
      db.set(`${user}-blacklistreason`, args.join(' '));
    } catch(e) {
      console.log(e);
      message.reply('something broke, please try again');
      return;
    }
    Client.channels.cache.get(logId).send(getEmbed(message.author, user, args.join(' '), Client))
                                          .catch((e) => {
      console.log(e);
    });
  }
};

async function getEmbed(moderator, target, reason, Client) {
  const Embed = new Discord.MessageEmbed()
  	.setTitle('Blacklist')
  	.addFields(
      {name: 'User', value: `<@!${target}>\nID: ${target}\nTag: soon:tm:`, inline: true},
      {name: 'Moderator', value: `<@!${moderator.id}>ID: ${moderator.id}\nTag: ${moderator.tag}`, inline: true},
      {name: 'Reason', value: reason, inline: true}
    )
  	.setTimestamp();
  return Embed;
}