import { Client } from '../classes/Client';
import { permitted_channel_type } from '../config/sys/permitted_channel_types';
import { NetworkSendMessagePayload } from '../types/network_typings';

export async function sendNetMessage(client: Client, paylaod: NetworkSendMessagePayload) {
    const channels = await client.db.Channels.getAllMapped(); // gets all channels and configs

    for(const stored_channel of channels) {
        const channel_id = stored_channel[0];
        const channel_config = stored_channel[1];

        // Get the channel itself.
        const channel = client.channels.cache.get(channel_id) || await client.channels.fetch(channel_id).catch();
        if(!channel) continue;

        // Check the channel_type is allowed for servernet (only allows type 0)
        if(channel.type !== permitted_channel_type) continue;

        // TODO: webhook parsing goes here
        channel.send(paylaod);
    }
}