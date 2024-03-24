// at the top of your file
const { EmbedBuilder } = require('discord.js');

// inside a command, event listener, etc.
const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Bot Tournoi de film')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Gladis', iconURL: 'https://production.togglestatic.com/shain/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%276376731%27&EntityType=%27Item%27&EntityId=%27382754%27&Width=368&Height=207&ResizeAction=%27fill%27&HorizontalAlignment=%27center%27&VerticalAlignment=%27top%27', url: 'https://discord.js.org' })
	.setDescription('Importez des films, lancez le bot, et votez pour votre préférence ! Le vainqueur du tournoi sera le film a visionner !')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ id :'xx', name: 'Regular field title', pseudo:'doC', genre1: 'genre1', genre2: 'genre2', genre3: 'genre3', },
        { id :'xx', name: 'Regular field title', pseudo:'doC', genre1: 'genre1', genre2: 'genre2', genre3: 'genre3', },
        { id :'xx', name: 'Regular field title', pseudo:'doC', genre1: 'genre1', genre2: 'genre2', genre3: 'genre3', },
        { id :'xx', name: 'Regular field title', pseudo:'doC', genre1: 'genre1', genre2: 'genre2', genre3: 'genre3', },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });



channel.send({ embeds: [exampleEmbed] });