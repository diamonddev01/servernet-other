const Discord = require("discord.js")

module.exports = {
    name: "blurple",
    description: "blurplehandler",
    run: async (message, PublicClient, command, args) => {
        user = message.mentions.member.first().id || args[2] || message.author.id
        type = args[1].shift().toLowerCase() || "undefined"
        if (type == "info") {
            usertype = 0
            attendance = 0
            if(user == "632541244035301376") {
                usertype = 1
            }
            if(usertype = 1) {
                attendance = "<:BLURPLE6th:840972631753752607> // Attended 1 year"
            }
            const Embed = new Discord.messageEmbed()
            .setTitle("BURPLE INFO")
            .addFeilds(
                { name: "Your attendance:", value: `${attendance}`}
            )
        } else if(type == "submit") {
            PublicClient.channels.cache.get("835968692356907060").send(message.member.avatarURL)
        }
    }
}
