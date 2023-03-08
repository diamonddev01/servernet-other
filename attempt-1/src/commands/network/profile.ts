import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../classes/Command";

export const command = new Command({
    name: 'profile',
    description: 'Gives information about a user',
    aliases: ["userinfo"],
    
    messageEnabled: true,
    slashEnabled: true,

    slashCommandData: new SlashCommandBuilder(),

    message(client, message, args) {
        message.reply({content: "**\\> THIS COMMAND IS UNAVAILABLE <** | PROFILE"}).catch();
    },
})