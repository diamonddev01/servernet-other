import { Message } from "discord.js";
import { ScanData } from "../../types/network_typings";
import { define_link } from '../../config/Automoderator';
import { createInterface } from "readline";
import { createReadStream } from "fs";
import badPhrases from './banned_phrases.lock/content.json';

export function scan(message: Message): Promise<ScanData> {
    return new Promise<ScanData>(async (resolve) => {
        const content = message.content.toLowerCase().replace('\\', '');
        const v = content.search(define_link);
        let link = false;
        if(v > 0) link = true;

        const ping = message.mentions.users.size > 0 || message.mentions.roles.size > 0 || message.mentions.everyone || message.content.toLowerCase().includes("@here") || message.content.toLowerCase().includes("@everyone");
        const badLink = await filterContent(message.content);

        let data = {
            link,
            ping,
            badLink,
            phrases: scan_t(message.content),
            allow_length: true
        }

        resolve(data);
    })
}

function scan_t(content: string): 0 | 1 | 2 | 3 | 10 {
    content = content.toLowerCase();
    if (badPhrases.disallow.some(v => content.includes(v))) return 0;
    if (badPhrases.nsfw.some(v => content.includes(v))) return 1;
    if (badPhrases.minor.some(v => content.includes(v))) return 2;
    if (badPhrases.mid.some(v => content.includes(v))) return 3;

    return 10;
}

async function filterContent(content: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
        const filestream = createReadStream('./banned_phrases.lock/banned_links.txt');
        const rl = createInterface({
            input: filestream,
            crlfDelay: Infinity
        })

        for await (const line of rl) {
            if(content.toLowerCase().includes(line.toLowerCase())) {
                resolve(true);
            }
        }

        resolve(false);
    })
}