const { SlashCommandBuilder } = require("discord.js");

const genres = [
    { name: 'Action', value: 'Action' },
    { name: 'Comédie', value: 'Comédie' },
    { name: 'Drame', value: 'Drame' },
    { name: 'Horreur', value: 'Horreur' },
    { name: 'Policier', value: 'Policier' },
    { name: 'Amour', value: 'Amour' },
    { name: 'Aventure', value: 'Aventure' },
    { name: 'Criminel', value: 'Criminel' },
    { name: 'Dystopie', value: 'Dystopie' },
    { name: 'Fantasy', value: 'Fantasy' },
    { name: 'Péplum', value: 'Péplum' },
    { name: 'Science-Fiction', value: 'Science-Fiction' },
    { name: 'Thriller', value: 'Thriller' },
    { name: 'Western', value: 'Western' },
    { name: 'Anticipation', value: 'Anticipation' },
    { name: 'Casse', value: 'Casse' },
    { name: 'Catastrophe', value: 'Catastrophe' },
    { name: 'Cape et d\'épée', value: 'Cape et d\'épée' },
    { name: 'Fantastique', value: 'Fantastique' },
    { name: 'Biopic', value: 'Biopic' },
    { name: 'X', value: 'X' },
    { name: 'Animation', value: 'Animation' }
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
    async execute(interaction) {
        await interaction.reply('Commande reçue !');
    },
    async autocomplete() {
        return true
    }
}