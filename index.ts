import { ActivityType, EmbedBuilder, Events, IntentsBitField, messageLink } from "discord.js";
import * as dotenv from "dotenv";
import MyClient from "./MyClient";

dotenv.config({path: `${__dirname}/.env`});

const client = new MyClient({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildIntegrations],
});
client.on(Events.MessageCreate, async message => {
    if(message.channelId === '1218565535156142091'){
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Bot Tournoi de film')
            .setURL('https://discord.js.org/')
            .setAuthor({ name: 'Gladis', iconURL: 'https://production.togglestatic.com/shain/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%276376731%27&EntityType=%27Item%27&EntityId=%27382754%27&Width=368&Height=207&ResizeAction=%27fill%27&HorizontalAlignment=%27center%27&VerticalAlignment=%27top%27', url: 'https://discord.js.org' })
            .setDescription('Importez des films, lancez le bot, et votez pour votre préférence ! Le vainqueur du tournoi sera le film a visionner !')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            // .addFields(
            //     { id :'xx', name: 'Regular field title', pseudo:'doC', genre1: 'genre1', genre2: 'genre2', genre3: 'genre3', },
            //     { id :'xx', name: 'Regular field title', pseudo:'doC', genre1: 'genre1', genre2: 'genre2', genre3: 'genre3', },
            //     { id :'xx', name: 'Regular field title', pseudo:'doC', genre1: 'genre1', genre2: 'genre2', genre3: 'genre3', },
            //     { id :'xx', name: 'Regular field title', pseudo:'doC', genre1: 'genre1', genre2: 'genre2', genre3: 'genre3', },
            //     { name: '\u200B', value: '\u200B' },
            //     { name: 'Inline field title', value: 'Some value here', inline: true },
            //     { name: 'Inline field title', value: 'Some value here', inline: true },
            // )
            // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
            .setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
        message.channel.send({
            embeds:[exampleEmbed]
        })
    }
})

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
                name: 'CC nicolas',
                type: ActivityType.Listening,
            },
        ],
        status: 'online'
    });
    console.log(`BOT activé !`);
});

client.login(process.env.CLIENT_TOKEN);