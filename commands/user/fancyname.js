const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fancyname')
		.setDescription('ever wanna know where people get their fancy fonts from for their names?'),
	async execute(interaction) {
		await interaction.reply("https://lingojam.com/DiscordFonts <-- Is a cool  website where you can change your discord name to a unqiue font. I used it for the category names :3");
	},
};
