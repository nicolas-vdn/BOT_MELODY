const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

const genres = [
    { name: 'Action', value: 'Action' },
    { name: 'Animation', value: 'Animation' },
    { name: 'Anticipation', value: 'Anticipation' },
    { name: 'Amour', value: 'Amour' },
    { name: 'Aventure', value: 'Aventure' },
    { name: 'Biopic', value: 'Biopic' },
    { name: 'Cape et d\'épée', value: 'Cape et d\'épée' },
    { name: 'Casse', value: 'Casse' },
    { name: 'Catastrophe', value: 'Catastrophe' },
    { name: 'Comédie', value: 'Comédie' },
    { name: 'Criminel', value: 'Criminel' },
    { name: 'Drame', value: 'Drame' },
    { name: 'Dystopie', value: 'Dystopie' },
    { name: 'Fantastique', value: 'Fantastique' },
    { name: 'Fantasy', value: 'Fantasy' },
    { name: 'Horreur', value: 'Horreur' },
    { name: 'Policier', value: 'Policier' },
    { name: 'Péplum', value: 'Péplum' },
    { name: 'Science-Fiction', value: 'Science-Fiction' },
    { name: 'Thriller', value: 'Thriller' },
    { name: 'Western', value: 'Western' },
    { name: 'X', value: 'X' },
]

module.exports = {
    data: new SlashCommandBuilder()
	.setName('add-film')
	.setDescription('Ajouter un film à la liste !')
	.addStringOption(option =>
		option.setName('nom')
			.setDescription('Nom du film')
			.setRequired(true))
    .addStringOption(option =>
        option.setName('image')
            .setDescription('Lien de l\'image')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('genre')
            .setDescription('Genre du film')
            .setRequired(true)
            .addChoices(
                ...genres
            ))
    .addStringOption(option =>
        option.setName('genre2')
            .setDescription('Genre du film (optionnel)')
            .addChoices(
                ...genres
            ))
    .addStringOption(option =>
        option.setName('genre3')
            .setDescription('Genre du film (optionnel)')
            .addChoices(
                ...genres
            )),
    async execute(interaction, client) {
        await interaction.deferReply();
        const nom = interaction.options.getString('nom');
        const image = interaction.options.getString('image');
        const genre = interaction.options.getString('genre');
        const genre2 = interaction.options.getString('genre2');
        const genre3 = interaction.options.getString('genre3');
        const userId = interaction.user.id;

        const userFilms = await axios.get(`https://melody-back.vercel.app/film/${userId}`);
        if (userFilms.data.length === 10) {
            await interaction.reply('Vous avez atteint la limite de films à ajouter !');
            return;
        }

        if (!nom || !image || !genre){
            await interaction.reply('Paramètres invalides !')
        return
        }

        try {
            const response = await axios.post('https://melody-back.vercel.app/film', {
                nom: nom,
                image: image,
                genre: genre,
                genre2: genre2,
                genre3: genre3,
                userId: userId,
                }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await interaction.editReply(`Le film "${response.data.nom}" d'ID ${response.data.id} a bien été ajouté !`);
        } catch (error) {
            await interaction.editReply('Une erreur est survenue veuillez contacter les boss du game');
        }
    },
    async autocomplete() {
        return true
    }
}