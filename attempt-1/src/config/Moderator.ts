import { Warn_Escalation_Clear_Warns_Formula } from "../types/config";
export * as ErrorTerms from './ErrorTerms';

export const warn_escalation_enabled = true;
export const warn_escalation_timeout = 86400000; // 1 day
export const warn_escalation_threshold = 3;
export const warn_escalation_clear_warns_on_timeout = true; // Removes the warnings from being logged to further bans. Documentation at the bottom of file under WEC_WOT
export const warn_escalation_clear_warns_formula: Warn_Escalation_Clear_Warns_Formula = (warn_count) => {return warn_count - 1;}; // Documentation at the bottom of the file under WEC_WF || TODO
export const warn_timeout = 2629800000; // 1 Months. This determins howlong a warn is active for before it gets deleted.


export const slowmode_enabled = true; // Discord slowmode but on the bot.
export const slowmode_time = 3000; // 3 Seconds.


/* ############################
DOCUMENTATION

WEC_WOT
If enabled, when someone passes the threshold for being timed out, warn_escalation_threshold, the user will have some x number of warns removed.
The x number of warns removed is defined in the warn_escalation_clear_warns_formula. This formula then saves the data.

WEC_WF
warn_escalation_clear_warns_formula. If the warn_escalation_clear_warns_on_timeout is active, this formula will be called.
This is a function, so please define all arguments as shown. The shown formula removes one warning each mute. (shown being the default one.)
Must return a positive number that is lower or equal to the starting number.
*/