import { _BaseBadge, _Generalbadge, _LevelBadge, _PartnershipBadge, _RankedBadge, _StaffBadge } from "../classes/Badge";
import { ChannelTypes } from "../classes/Channel";
import { blacklistdata } from "./blacklistData";
import { NumberUpToTen_IncludingTenAndZero } from "./random";
import { RankedMap } from "./ranked";

export type SavableBadgeData = _RankedBadge | _Generalbadge | _LevelBadge | _StaffBadge | _PartnershipBadge;

export interface SavableUserData {
    staff: boolean;
    messages: number;
    ranked: Map<number, RankedMap>;
    staffInfo?: {
        power: NumberUpToTen_IncludingTenAndZero;
        rankName: string;
    };
    badges: SavableBadgeData[];
    equippedBadges: SavableBadgeData[];
    blacklisted: boolean;
    blacklists: blacklistdata;
}