const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
	.setName('list-films')
	.setDescription('Lister les films déjà ajoutés par la communauté !')
	.addStringOption(option =>
		option.setName('page')
			.setDescription('Page à consulter')
			.setRequired(true)),
    async execute(interaction, client) {
        await interaction.deferReply()
        const page = interaction.options.getString('page');
        
        try {
            const films = (await axios.get('https://melody-back.vercel.app/film')).data;
            
            if (page*5 > films.length) {
                await interaction.editReply('La page renseignée est incorrecte.');
            } else {            
                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Bot Tournoi de film')
                    .setURL('https://discord.gg/n8f6GfxZex')
                    .setAuthor({ name: 'Gladis', iconURL: 'https://production.togglestatic.com/shain/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%276376731%27&EntityType=%27Item%27&EntityId=%27382754%27&Width=368&Height=207&ResizeAction=%27fill%27&HorizontalAlignment=%27center%27&VerticalAlignment=%27top%27', url: 'https://discord.gg/n8f6GfxZex' })
                    .setDescription('Importez des films, lancez le bot, et votez pour votre préférence ! Le vainqueur du tournoi sera le film a visionner !')
                    .setThumbnail('https://production.togglestatic.com/shain/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%276376731%27&EntityType=%27Item%27&EntityId=%27382754%27&Width=368&Height=207&ResizeAction=%27fill%27&HorizontalAlignment=%27center%27&VerticalAlignment=%27top%27')
                    .setTimestamp()
                    .setFooter({ text: `Demandé par ${interaction.user.globalName} - Page ${page}/${Math.round(films.length/5)}`, iconURL: 'https://i.imgur.com/AfFp7pu.png' });

                for (i = 1*page-1; i < Math.min(1*page+4, films.length); i++) {
                    const pseudo = (await client.users.fetch(films[i].userId)).globalName;

                    let genre = `\nGenre 1 : ${films[i].genre}`;
                    if (films[i].genre2) {
                        genre+=`\nGenre 2 : ${films[i].genre2}`;
                        if (films[i].genre3) {
                            genre+=`\nGenre 3 : ${films[i].genre3}`;
                        }
                    } else if (films[i].genre3) {
                        genre+=`\nGenre 2 : ${films[i].genre3}`;
                    }
    
                    embed.addFields({
                        name: `${films[i].id} - ${films[i].nom}`,
                        value: `\`\`\`Pseudo : ${pseudo}${genre}\`\`\``
                    });
                }

                interaction.editReply({
                    embeds:[embed]
                });
            }

        } catch (error) {
            console.log(error);
            await interaction.editReply('Une erreur est survenue veuillez contacter les boss du game');
        }
    }
}