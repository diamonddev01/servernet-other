const diamondNet = require("./DiamondNet/os")
const diamondNetChannels = require("./DiamondNet/channels.json")

module.exports = {
    name: "customNetworkManager",
    description: "Runs all custom networks",
    run: async (PublicClient, message) => {
        if (diamondNetChannels.channels.includes(message.channel.id)) {
            diamondNet.run(PublicClient, message, args)
        }
    }
}