import { BaseGuild as DiscordGuild } from "discord.js"; // Guild class uses a private constructor

export enum GuildTypes {
    CONNECTED = "guild.connected",
    DISCONNECTED = "channel.disconnected",
    VERIFIED = "channel.verified",
    REPORT = "channel.report"
}

export interface GuildInterface {
    id: string;
    channelID: string;
}

export class Guild extends DiscordGuild {
    //
}