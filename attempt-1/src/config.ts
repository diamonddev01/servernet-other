import { ActivitiesArray, DefaultsInterface} from './types/config'; // Some typings

/*
To edit some files you will need to go into the config dir.
automod - /config/Automoderator.ts
moderator - /config/Moderator.ts
*/

// DO NOT EDIT
export {token} from './config/token/token';
export * as automod from './config/Automoderator';
export * as moderator from './config/Moderator';

// EDIT
// Edits the way slash commands operate. If this is not a beta bot, please set this to false.
export const DeveloperMode = true;
export const Defaults: DefaultsInterface = {
    prefix: '>'
}

export const BotName = "Servernet";

export const UserStatuses: ActivitiesArray[] = [
    {
        name: BotName + " BETA",
        type: 0
    }
]