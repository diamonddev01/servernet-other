const Discord = require('discord.js');
const db = require('quick.db');
const blacklists = require('../data/blacklists.json').users;
const users = require('../dataNew/users.json');

module.exports = {
  name: 'blacklistinfo',
  description: 'The newer way to check if someone is blacklisted. It will still check the old system but will also read the new system and make sure the user isnt blacklisted at all',
  run: async (message, Client, guild, channel, args) => {
    if(args[0]) {
        if(db.get(`${args[0]}-blacklisted`) || blacklists.includes(args[0])) {
        if(db.get(`${args[0]}-blacklisted`)) system = "new";
        else system = "old";
        if(system == "new") {
          reason = db.get(`${args[0]}-blacklistreason`);
        }
        if(system == "old" || !reason) {
          message.reply('They are blacklisted (unknown reason).');
        } else if(system == "new") {
          if(users.allStaff.includes(message.author.id)) {
          	message.reply(`You are blacklisted for ${reason}`);
          } else {
            message.reply('They are blacklisted (unknown reason).');
        }
      } else {
        message.reply('They are not blacklisted.');
      }
      return;
    }
    }
    if(db.get(`${message.author.id}-blacklisted`) || blacklists.includes(message.author.id)) {
      if(db.get(`${message.author.id}-blacklisted`)) system = "new"
      else system = "old";
      if(system == "new") {
        reason = db.get(`${message.author.id}-blacklistreason`);
      }
      if(system == "old" || !reason) {
      	message.reply('You are blacklisted.');
      } else if(system == "new") {
        message.reply(`You are blacklisted for ${reason}`);
      }
    } else {
      message.reply('You are not blacklisted at this time. If you are having issues with the bot this is probably a global issue');
    };
  }
};