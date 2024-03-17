import { ActivityType, Events, IntentsBitField, Routes } from "discord.js";
import * as dotenv from "dotenv";
import MyClient from "./MyClient";

dotenv.config({path: `${__dirname}/.env`});

const PREFIX = '/';
const commandes = ['add-film']

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

client.on("messageCreate", (message) => {
    if (message.channelId !== '1218565535156142091') {
        return
    }

    const command = message.content.split(' ');
    const params = command.slice(1, command.length);
    const slash = command[0][0]

    if (slash !== PREFIX || commandes.indexOf(command[0].substring(1)) === -1) {
        return
    }

    if (params.length < 4) {
        message.reply('Paramètres invalides !');
    } else {
        const name: string = params[0]
        const lien: string = params[1]
        const duree: string = params[2]
        const style: string[] = params.slice(3,)

        console.log(name, lien, duree, style);
    }
});

client.login(process.env.CLIENT_TOKEN);