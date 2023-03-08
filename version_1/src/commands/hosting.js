const Discord = require("discord.js")

module.exports = {
    name: "hosting",
    description: "Sends our hosting service",
    run: async (message, PublicClient, guild, channel, args) => {
        const Embed = new Discord.MessageEmbed()
        .setColor('##ff00c3')
        .setTitle('Our hosting service')
        .addFields(
        { name: 'Cost', value: `We pay $3/mo`},
        { name: 'Website', value: `[Press](https://pebblehost.com)`, inline: true },
        )
        .setTimestamp()
        message.channel.send(Embed);
    }
}