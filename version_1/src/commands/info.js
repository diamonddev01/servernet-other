const config = require('../config.json')
const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'info',
    run: async (message, Client, guild, channel, args) => {
        guilds = Client.guilds.cache.size;
        channels = Client.channels.cache.size
        connectedChannels = config.channels.length
        ping = await Client.ws.ping

        const Embed = new Discord.MessageEmbed()
            .setTitle('Bot info')
            .addFields(
                {name: 'Guilds', value: `I am in \`${guilds}\` guilds`, inline:true},
                {name: 'Channels', value: `I have \`${channels}\` channels`, inline:true},
                {name: 'Connected Channels', value: `There are \`${connectedChannels}\` channels connected to the network`, inline:true},
                {name: 'Ping', value: `My ping is \`${ping}ms\``, inline:true},
                {name: 'messages', value: `There have been \`${db.get(`global_msg_all`)}\` messages`, inline:true},
                {name: 'members', value: `The bot hosts \`${Client.guilds.cache.reduce((a, b)=> a+b.memberCount, 0).toString()}\` users`, inline:true},
                {name: 'First?', value: `My first message was sent by Parallax, at this date <t:1617816450>, I was first rebranded from TLUP to ServerNet <t:1617922890> which was just **2 DAYS** after my initial release.`}
            )
        message.channel.send(Embed)
    }
}