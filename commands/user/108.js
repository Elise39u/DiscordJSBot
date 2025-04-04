const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('108')
		.setDescription('A guide to some project diva secrets and better scoring tactis.'),
	async execute(interaction) {
		await interaction.reply("https://108memo.jp/en/#m. So you want the secrets to project diva? Well here you go :3");
	},
};
