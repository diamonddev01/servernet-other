const users = require('../dataNew/users.json');
const db = require('quick.db');

module.exports = {
    name: 'changelock',
    run: async (message, Client, guild, channel, args) => {
        if(!users.allStaff.includes(message.author.id)) {
            message.reply('I dont think you have permission to do that.');
            return;
        }
        
                
    }
}