const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const sent = await interaction.reply({ content: `Preggo Belly Pong! :3: ${Math.round(interaction.client.uptime / 60000)}ms.`, fetchReply: true });
		await interaction.editReply(`Hold on sending this preggo pong back.. : ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
	},
};
