const Discord = require("discord.js")
const guildconfig = require("./dataNew/guilds.json")
const userconfig = require("./dataNew/users.json")
const blacklists = require("./data/blacklists.json")
const config = require("./config.json")
const channels = config.channels
const db = require("quick.db")
const eventB = require("./dataNew/eventbadges.json")
const errorinfo = require("./resources/errorcodes.json")

module.exports = {
    name: "csneetmsg",
    description: "sends a custom message in the SNET protocol",
    run: async (content, PublicClient) => {
    for (var i = 0; i < channels.length; i++) {
        try {
            PublicClient.channels.cache.get(channels[i]).send(content)
            } catch(e) {
                console.log(e)
            }
   }
    }
}