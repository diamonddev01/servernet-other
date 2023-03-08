import { NumberUpToTen_IncludingTen } from "./random";

export type Ranks = "Bronze" | "Silver" | "Gold" | "Diamond" | "Master" | "GrandMaster";

export type RankedMap = RankedUnderMaster | RankedMaster | RankedGrandMaster;

export interface BaseRankedId {
    rank: Ranks;
    level: number;
    points: number;
}

export interface RankedUnderMaster extends BaseRankedId {
    rank: "Bronze" | "Silver" | "Gold" | "Diamond";
    level: 1 | 2 | 3;
}

export interface RankedMaster extends BaseRankedId {
    rank: "Master";
}

export interface RankedGrandMaster extends BaseRankedId {
    rank: "GrandMaster";
    level: NumberUpToTen_IncludingTen;
}