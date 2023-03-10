import { NumberUpToTen_IncludingTenAndZero } from "../types/random";
import { User as DiscordUser, Client as DiscordClient } from 'discord.js';
import { Badge, GeneralBadge, LevelBadge, PartnershipBadge, RankedBadge, StaffBadge } from './Badge';
import { blacklistdata } from "../types/blacklistData";
import { Client } from "./Client";
import { RawUserData } from "discord.js/typings/rawDataTypes";
import { SavableBadgeData } from "../types/Database";
import { flatten } from "../modules/flatten/mod";

export interface UserInterface {
    staff: boolean;
    messages: number;
    staffInfo?: {power: NumberUpToTen_IncludingTenAndZero, rankName: string};
    badges: SavableBadgeData[];
    equippedBadges: SavableBadgeData[];
    blacklisted: boolean;
    blacklists: blacklistdata;
    moderations: string[]; // An id
    id: string;
    last_message: number; // Date stamp
    first_message: number; // Date stamp
}

const flatten_config = {
    staff: true,
    messages: true,
    staffInfo: true,
    badges: true,
    equippedBadges: true,
    blacklisted: true,
    blacklists: true,
    moderations: true,
    id: true,
    last_message: true,
    first_message: true
}

export class User extends DiscordUser {
	public staff: boolean;
	public messages: number;
	public staffInfo?: {power: NumberUpToTen_IncludingTenAndZero, rankName: string};
	public badges: Badge[];
    public equippedBadges: Badge[] = [];
    public blacklisted: boolean = true;
    public blacklists: blacklistdata;
    public moderations: string[] = [];
    public ready: boolean = false;
    private _c: Client;

    constructor(client: Client, User: DiscordUser) {
        super(client as DiscordClient<true>, User.toJSON() as RawUserData);

        this._c = client;
        this.staff = false;
        this.messages = 0;
        this.blacklisted = true;
        this.blacklists = {past: [], active: undefined};
        this.badges = [];
    }

    public async setup(): Promise<this> {
        if(this.ready) {
            await this.fetchData();
            return this;
        }

        await this.fetchData();
        return this;
    }

    private async fetchData(): Promise<boolean> {
        const user = await this._c.db.Users.get<UserInterface>(this.id.toString());

        this.staff = user?.staff || false;
        this.messages = user?.messages || 0;
        this.staffInfo = user?.staffInfo || {power: 0, rankName: 'User'};
        this.blacklisted = user?.blacklisted || false;
        this.blacklists = user?.blacklists || {};
        this.badges = convertBadgeJSONToBadgeClass(user?.badges || []);
        this.equippedBadges = convertBadgeJSONToBadgeClass(user?.equippedBadges || []);
        this.moderations = user?.moderations || [];

        await this.fetch().catch();
        return true;
    }

    public async reload(): Promise<this> {
        await this.fetchData();
        return this;
    }

    public async save(): Promise<boolean> {
        if(!this.ready) return false; // If the user is not loaded, do not save
        await this._c.db.Users.saveUser(this);

        return true;
    }

    public async Compact(): Promise<UserInterface | null> {
        return flatten<UserInterface>(this, flatten_config, false);
    }
}

function convertBadgeJSONToBadgeClass(json: SavableBadgeData[]): Badge[] {
    const badges = [];
    for(const b of json || []) {
        let badge;
        switch(b.type) {
            case "GENERAL":
                badge = new GeneralBadge(b.badgeCode, b.permittedSlot, b.guildOrUserBadge);
                if(badge.guildOrUserBadge !== "USER") continue;
                badges.push(badge);
                break;
            case "RANKED":
                badge = new RankedBadge(b.badgeCode, b.guildOrUserBadge, b.season, b.rank, b.level);
                badges.push(badge);
                break;
            case "LEVEL":
                badge = new LevelBadge(b.badgeCode, b.guildOrUserBadge, b.messages);
                badges.push(badge);
                break;
            case "STAFF":
                badge = new StaffBadge(b.badgeCode, b.guildOrUserBadge, b.rank);
                badges.push(badge);
                break;
            case "PARTNERSHIP":
                badge = new PartnershipBadge(b.badgeCode, b.guildOrUserBadge, b.rank);
                badges.push(badge);
                break;
        }
    }

    return badges;
}