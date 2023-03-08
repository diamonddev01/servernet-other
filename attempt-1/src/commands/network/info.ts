import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../classes/Command";
import {command as botInfoCommand} from './botinfo';
import {command as profileCommand} from './profile';
import {command as rankCommand} from './rank';

export const command = new Command({
    name: 'info',
    description: 'Displays info on an item, def: bot',
    
    messageEnabled: true,
    slashEnabled: false,

    message(client, message, args) {
        console.log(args[0]);
        if(args[0] == undefined || args[0] == null) {
            botInfoCommand.MessageEvent(client, message, args);
            return;
        }

        const a1: string = args.shift() as string;

        switch(a1.toLowerCase()) {
            case "user": 
                args.shift();
                return profileCommand.MessageEvent(client, message, args);
                break;
            case "rank":
                args.shift();
                return rankCommand.MessageEvent(client, message, args);
                break;
        }

        botInfoCommand.MessageEvent(client, message, args);
    },
})