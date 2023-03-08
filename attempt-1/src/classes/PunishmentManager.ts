import { Client } from './Client';

export class PunishmentManager {
    constructor(
            private client: Client
    ) {}

    async getUserPunishments(): string[] {
        // Get the punishments from db
        
    }
}