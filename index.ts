import { ActivityType, Client, GuildMember } from "discord.js";
import * as dotenv from "dotenv"

dotenv.config({path: `${__dirname}/.env`});

const client = new Client({
    intents: ["Guilds", "GuildMessages", "MessageContent"],
});

if (!client) {
    throw new Error('Error loading client !')
}

client.on("ready", () => {
    client.user?.setPresence({
        activities: [
        {
            name: 'test Kald et Alexis',
            type: ActivityType.Playing,
        },
        ],
        status: 'online'
    });
    console.log(`BOT activé !`);
});

client.login(process.env.CLIENT_TOKEN);