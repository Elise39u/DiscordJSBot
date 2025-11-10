const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vidintroduction')
		.setDescription('Dont wanna read elise introduction command. Here is their video introduction of their yt channel'),
	async execute(interaction) {
		await interaction.reply("https://youtu.be/LyYKqPdzz-k?si=SoejQbMVqv_m3KUa. Dont wanna read my introduction. Here is my YT channel which should give you an idea on who i am and what i do with my content :3.");
	},
};
