import { TextChannel as DiscordChannel } from "discord.js";
import { RawChannelData } from "discord.js/typings/rawDataTypes";
import { Client } from "./Client";
import { flatten } from "../modules/flatten/mod";

// TO-REDO & Remove
export enum ChannelTypes {
    NORMAL = "channel.normal",
    LOG = "channel.log",
    PROMOTIONS = "channel.promotion",
    REPORT = "channel.report"
}

export interface ChannelInterface {
    id: string;
    guildId: string;

    servernet_type: ChannelTypes;
    level: number;
    webhook_config: null | webhook_config;
}

const flatten_config = {
    id: true,
    guildId: true,

    servernet_type: true,
    level: true,
    webhook_config: true
}

interface webhook_config {
    webhook_uri: string;
}

export class Channel extends DiscordChannel {
    public servernet_type: ChannelTypes;
    public level: number;
    public webhook_config: null | webhook_config;

    public ready: boolean = false;

    constructor(channel: DiscordChannel, private _c: Client) {
        super(channel.guild, channel.toJSON() as RawChannelData);

        // Arb types
        this.level = 0;
        this.servernet_type = ChannelTypes.NORMAL;
        this.webhook_config = null;
    }

    public async setup(): Promise<this> {
        // Get the channel config from the database
        const ChannelConfig = await this._c.db.Channels.get<ChannelInterface>(this.id);

        this.servernet_type = ChannelConfig?.servernet_type || ChannelTypes.NORMAL;
        this.level = ChannelConfig?.level || 0;
        this.webhook_config = ChannelConfig?.webhook_config || null;

        return this;
    }

    public async Compact(): Promise<ChannelInterface | null> {
        return flatten<ChannelInterface>(this, flatten_config, false);
    }
}