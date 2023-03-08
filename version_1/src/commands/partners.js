const Discord = require("discord.js")

module.exports = {
    name: "partners",
    description: "the partners of the bot",
    run: async (message, PublicClient, command, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle("Partners")
        .setDescription("Our partners")
        .addFeilds(
            { name: "The Eternal Kingdom [TEK]", value: "[Tek](https://discord.gg/3ZPDuvvKxs), one of the first people to use the bot!! [Join them here](https://discord.gg/3ZPDuvvKxs)"},
        )

        message.channel.send(embed)

    }
}
