import { QuickDB } from "quick.db";
import {Client} from '../classes/Client';
import { User, UserInterface } from "../classes/User";
import { ChannelInterface as ChannelConfig } from "../classes/Channel";
import { moderation } from "../types/moderations";

/*
TODO

Rename references to ChannelConfig to ChannelInterface
*/

const filePath = "../database/db.sqlite";

export class Database extends QuickDB {
    private Client: Client;
    public Users: UserDatabase;
    public Channels: ChannelDatabase;
    public Moderations: ModerationDatabase;

    constructor(client: Client) {
        super({
            filePath,
            table: "generic"
        })

        this.Client = client;
        this.Users = new UserDatabase(client, this);
        this.Channels = new ChannelDatabase(client, this);
        this.Moderations = new ModerationDatabase(client, this);
    }
}

class UserDatabase extends QuickDB {
    constructor(
        private client: Client,
        private Generic: Database
    ) {
        super({
            filePath,
            table: "users"
        })
    }
    // Get returns Promise<UserInterface | null>

    async getUser(user_id: string): Promise<User | null>{
        const discord_user = await this.client.users.fetch(user_id).catch();
        if(!discord_user) return null;
        const user = new User(this.client, discord_user);

        await user.setup();

        return user;
    }

    saveUser(user_data: User): Promise<UserInterface> {
        return this.set<UserInterface>(user_data.id, user_data.Compact());
    }
}

class ChannelDatabase extends QuickDB {
    constructor(
        private client: Client,
        private Generic: Database
    ) {
        super({
            filePath,
            table: "channels"
        })
    }

    public async getAllMapped(): Promise<Map<string, ChannelConfig>> {
        // Get all channels added to network and map them
        const all_channels = await this.all();
        const map = new Map<string, ChannelConfig>();
        if(!all_channels) return map; 
        for(const element of all_channels) {
            map.set(element.id, element.value);
        }
        return map;
    }

    public async get_all_array(): Promise<string[]> {
        const all_channels = await this.all();
        const channels: string[] = [];
        for (const {id} of all_channels) {
            channels.push(id);
        }

        return channels;
    }
}

class ModerationDatabase extends QuickDB {
    constructor(
        private client: Client,
        private Generic: Database
    ) {
        super({
            filePath,
            table: "moderations"
        })
    }

    public async saveModeration(moderation: moderation): Promise<moderation> {
        return this.set<moderation>(moderation.id, moderation);
    }

    public async getModeration(mod_id: string): Promise<moderation | null> {
        return this.get<moderation>(mod_id);
    }
}
