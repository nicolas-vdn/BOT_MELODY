const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
	.setName('info-film')
	.setDescription('Récupérer les informations d\'un film !')
	.addStringOption(option =>
		option.setName('id')
			.setDescription('ID du film')
			.setRequired(true)),
    async execute(interaction, client) {
        await interaction.deferReply();
        const id = interaction.options.getString('id');

        const filmData = (await axios.get(`https://melody-back.vercel.app/film/id/${id}`)).data;
        if (filmData.length === 0) {
            await interaction.reply('Aucun film renseigné pour cet identifiant n\'a été trouvé !');
            return;
        }

        const pseudo = (await client.users.fetch(filmData.userId)).globalName;

        let genres = `Genres : ${filmData.genre} `;

        if (filmData.genre2) {
            genres += `${filmData.genre2} `;
        }
        if (filmData.genre3) {
            genres += filmData.genre3;
        }

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Commande info-film')
            .setURL('https://discord.gg/n8f6GfxZex')
            .setAuthor({ name: 'The Watcher', iconURL: 'https://media.discordapp.net/attachments/1094172403506106418/1218502204705472562/galaxy-in-the-eye-vector.png?ex=6611201c&is=65feab1c&hm=44da9427cf11134316da92a16b7e51f453228386a7da3e49f27c34df8383d241&=&format=webp&quality=lossless&width=1014&height=676', url: 'https://discord.gg/n8f6GfxZex' })
            .setThumbnail("https://media.discordapp.net/attachments/1094172403506106418/1218502204705472562/galaxy-in-the-eye-vector.png?ex=6611201c&is=65feab1c&hm=44da9427cf11134316da92a16b7e51f453228386a7da3e49f27c34df8383d241&=&format=webp&quality=lossless&width=1014&height=676")
            .addFields({
                name: `${filmData.id} - ${filmData.nom}`,
                value: `${genres}\n\nAjouté par : ${pseudo}`
            })
            .setImage(filmData.image)
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.globalName}`, iconURL: 'https://i.imgur.com/AfFp7pu.png' });

        interaction.editReply({
            embeds:[embed]
        });
    },
    async autocomplete() {
        return true
    }
}