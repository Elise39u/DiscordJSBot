const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('todo')
		.setDescription('this command is for Elise themself. An note on what they plan to do for their content-creation.'),
	async execute(interaction) {
        const description = `
            1. Update Pateron to fit the new desired changes for the server
            2. Rewrite <#962632709405032458> to fit the upcoming V3 and LMS lore 
            3. Rewrite <#797792369416208386> with the same reasons as 2
        `;

        const embed = createEmbed(
            `🎀 Elise todo list for the server. 🎀`,
            description,
            null,
            "🎀 Todo list mammy elise🎀"
        );
	    await interaction.reply({ embeds: [embed] });
	},
};
