const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    name: 'rank',
    description: 'check your rank',
    run: async (message, Client, guild, channel, args) => {
        //const { channel } = message
        var user = message.mentions.users.first() || message.author;
        if(args[0] && user.id == message.author.id) {
            try {
                member = await message.guild.members.fetch(args[0]);
            } catch(e) {
                console.log(e);
                message.reply('Invalid ID, ensure this user is on this server ext.');
                return;
            }
            user = member.user
        }
        //var lvl = db.fetch(`global_lvl_${user.id}`) || 1
        //var xp = db.fetch(`global_xp_${user.id}`) || 0
        //var TNA = lvl * 50
        var ttl = db.fetch(`global_msg_${user.id}`)
        var linksAllowed = allowLinks(message, user)
        var txt = ""
        if (!linksAllowed) {
            txt = " Get to the 100 messages achievement"
        }
        var lvl = Math.floor(ttl/100)
        console.log(lvl)
        recent = lvl
        if(recent === 0) msg = "Use a command"
        else msg = `${lvl*100} messages!`
        const embed = new Discord.MessageEmbed()
        .setTitle(`${user.username}'s Message achievements`)
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .addFields(
            { name: "Recently Completed", value: msg},
            //{ name: "Current Progress", value: `${(TNA / 100) * xp}%`},
            { name: "Next achievement", value: `${lvl * 100 + 100} Messages!`},
            { name: "Total messages sent", value: `${ttl}`},
            { name: "Allow Links?", value: `${linksAllowed}${txt}`}
        )
        channel.send(embed)
    }
}

function allowLinks(message, user) {
    var msgs = db.fetch(`global_msg_${user.id}`) || 0;
    if (msgs < 100) {
        return false;
    } if (msgs >= 100) {
        return true;
    }
}