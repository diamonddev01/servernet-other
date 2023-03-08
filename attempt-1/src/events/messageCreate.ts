import { Client } from "../classes/Client";
import { Message } from "discord.js";
import { servernet_message } from "../network/servernet_message";

export const prefix = '>'; // TODO map prefix.

// TODO refactor

export async function event(client: Client, message: Message): Promise<void> {
    let snetChannel = false;
    // Read if the message event is in a channel covered by servernet.
    if(message.type == 0) { // Saves extra db reads
        // get all channels
        const channels = await client.db.Channels.get_all_array();
        if(channels.includes(message.channelId)) snetChannel = true;
    }
    
    const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();

    if (!command) {
        if(snetChannel) {
            servernet_message(message, client);
        }

        return;
    }

    // Check command exists
    const cmd = client.commands.get(command) || client.commands.find(c => c.aliases && c.aliases.includes(command)); // Ignore issues
    if (cmd) {
        if(!cmd.messageEnabled) {
            message.reply({content: "Command does not have a message accessor"}).catch();
            return;
        }

        if(!snetChannel) cmd.MessageEvent(client, message, args);
        else message.channel.send({content: "Commands cannot be run in a servernet channel"}).catch();

        return;
    }

    if(snetChannel) servernet_message(message, client);
}