//const Discord = require("discord.js")

/*module.exports = {
    name: "verification",
    description: "the verificationr requirments",
    run: async (message, PublicClient, command, args) => {

        user = message.mentions.users.first() || message.member
        perms = " "
        secondaryperms = ""
        GlobalChatPerms = " "

        if(user.hasPermission('MANAGE_MESSAGES')) secondaryperms = "<:DeleteMessages:831485856522174475>"
        if(user.hasPermission('KICK_MEMBERS')) perms = "<:Kick:831488843357356072>"
        if(user.hasPermission('BAN_MEMBERS')) {
            perms = "<:Ban:831488843143315527>"
            if(user.hasPermission('KICK_MEMBERS')) {
                secondaryperms = "<:Kick:831488843357356072>"
                if(user.hasPermission("MANAGE_MESSAGES")) secondaryperms = "<:Kick:831488843357356072><:DeleteMessages:831485856522174475>"
            }
            else if(user.hasPermission('MANAGE_MESSAGES')) secondaryperms = "<:DeleteMessages:831485856522174475>"
        }

        const Embed = new Discord.MessageEmbed()
        .setColor('##ff00c3')
        .setTitle('Verification & Partnership')
        .addFields(
        { name: 'Verification', value: `The <:Verified:829930264540872715> badge is given to any verified user.       \| The verification program. Here at TLUP we have a pretty laid back policy, you are either a well known user or have and have gained much respect with TLUP staff ||If you meet this requirement send a DM to Diamond Oreo#0001||`},
        { name: 'Partnership', value: `The <:PhonePartner:829926018806579220> badge is given to any Partnered user.       \| The Partnership Program, here at TLUP a partner is any server owner who has (KEY) a server that is linked to this bot, the server must consist of 150 human members to be accepted to the program, it must also have filled in an application for the bot. If you have the bot but not the member count, you will just become verified.`, inline: true },
        { name: 'Server verification', value: `150 members!`},
        { name: 'Server Partnership', value: `300 members`},
        )
        .setTimestamp()
        message.channel.send(Embed)
    }
}*/