import { Message } from "discord.js";
import { sendNetMessage } from "./send_message";
import { Client } from "../classes/Client";
import { permitted_channel_type } from "../config/sys/permitted_channel_types";
import { User } from "../classes/User";
import { icons } from "../config/ErrorTerms";
import { prefix } from "../events/messageCreate";
import { scan } from "./functions/mod";

export async function servernet_message(message: Message, client: Client): Promise<void> {
    if (message.author.bot) return;
    if (message.channel.type !== permitted_channel_type) return; // Prevents the message channel.... not being a message channel...

    const user = await new User(client, message.author).setup();

    // Stops a banned user talking.
    if(user.blacklisted) {
        message.channel.send({content: `${icons.banned} You are blacklisted from servernet. Please use \`${prefix}baninfo\` to view why`}).catch();
        return;
    }

    // Scans the content for rule breaking content
    // Time scan(content)
    const badContent = await scan(message);

    if(badContent.phrases == 0) {
        // Ban the message
        message.channel.send({content: 'You cannot send that message here'}).catch();

        // add a short ban

        return;
    }
}