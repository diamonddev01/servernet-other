import { Client } from "../classes/Client";
import { DeveloperMode, UserStatuses } from "../config";

export async function event(client: Client): Promise<void> {
    console.log(DeveloperMode ? "[WARN] DeveloperMode enabled, please ensure you want this to be the case\n[INFO] Activating Bot" : "[INFO] Activating Bot");
    const worked = await client.registerSlashCommands();

    statusUpdater(client);
}

function statusUpdater(client: Client): void {
    let n = 0;

    updateStatus(client, n);

    setInterval(() => {
        n++;
        if (n == UserStatuses.length) n = 0;
        updateStatus(client, n);
    }, 10000)
}

function updateStatus(client: Client, n: number): void {
    client.user?.setActivity({ name: UserStatuses[n].name, type: UserStatuses[n].type });
}