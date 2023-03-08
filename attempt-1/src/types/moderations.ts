// DOCUMENTED FILE

export type moderation = warning;
export type moderationType = "warning" | "mute" | "ban";
export type banTypes = "permanant" | "temporary";
export type moderatorAccounts = "AUTO" | string;

interface mod {
    id: string;
    type: moderationType;
    moderator: moderatorAccounts;
    target: string;
    reason: string;
    createdAt: number;
    automated: boolean;
}

export interface warning extends mod {
    type: "warning";   
}

export interface mute extends mod {
    type: "mute";
    duration: number;
    endedAt: number;
}

export interface baseBan extends mod {
    type: "ban";
    isPermanant: boolean;
    endedAt?: number;
    duration: number;
}