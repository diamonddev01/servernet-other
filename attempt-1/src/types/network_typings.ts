import { MessageCreateOptions } from "discord.js";

export type NetworkSendMessagePayload = Omit<MessageCreateOptions, "tts" | "nonce" | "reply" | "stickers" | "flags" | "allowedMentions" | "components">;

export interface ScanData {
    link: boolean;
    allow_length: boolean;
    phrases: 0 | 1 | 2 | 3 | 10;
    ping: boolean;
    badLink: boolean;
}