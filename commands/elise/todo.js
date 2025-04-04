const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('todo')
		.setDescription('this command is for Elise themself. An note on what they plan to do for their content-creation.'),
	async execute(interaction) {
        const description = `
            1. Rewrite <#962632709405032458> to fit the upcoming V3 and LMS lore 
            2. Rewrite <#797792369416208386> with the same reasons as 1.
            3. Make the YUME Diva video idea in editing 
            4. Consider the idea of applying boobs size of your V3 outfit too Main V2 and V1 outfit? Mabye pateorn poll?
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
