import { ActivityType, Events, IntentsBitField } from "discord.js";
import * as dotenv from "dotenv";
import MyClient from "./MyClient";

dotenv.config({path: `${__dirname}/.env`});

const client = new MyClient({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildIntegrations],
});

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isChatInputCommand() || interaction.isAutocomplete()) {
        const command = client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        if (interaction.isChatInputCommand()) {
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                await command.autocomplete(interaction);
            } catch (error) {
                console.error(error);
            }
        }
    }
});

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