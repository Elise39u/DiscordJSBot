const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scorattack')
		.setDescription('A guide for better scores in project diva.'),
	async execute(interaction) {
		await interaction.reply("Ever wanna learn what score attacks are while: https://www.youtube.com/watch?v=zKo9cLpyfHE This helded a godfile with terms that the community used. Only that one is not accisseble anymore.. :(");
	},
};
