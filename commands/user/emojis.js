const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('emojis')
		.setDescription('An easy place to find emojis to mabye put in ur username or for other use?'),
	async execute(interaction) {
		await interaction.reply("https://apps.timwhitlock.info/emoji/tables/unicode#block-1-emoticons <-- This website is a great place to find emojis to use in nicknames for example.");
	},
};
