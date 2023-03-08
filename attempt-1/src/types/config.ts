export interface DefaultsInterface {
    prefix: string;
}

export interface ActivitiesArray {
    type: number;
    name: string;
}

export type Warn_Escalation_Clear_Warns_Formula = (warn_number: number) => number;