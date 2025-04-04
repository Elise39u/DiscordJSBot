const { SlashCommandBuilder } = require('discord.js');
const { errorHandeler } = require('../helpers/errorHandler');
const { createEmbed } = require('../helpers/embedBuilder');

// Set to track cooldowns (unauthorized users)
const cooldown = new Set();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('todo')
		.setDescription('this command is for Elise themself. An note on what they plan to do for their content-creation.'),
	async execute(interaction) {
        const eliseId = '203095887264743424';

        if (interaction.user.id !== eliseId) {
                // Handle cooldown
                if (!cooldown.has(interaction.user.id)) {
                    cooldown.add(interaction.user.id);
    
                    // Try to send a DM to Elise
                    try {
                        const eliseUser = await interaction.client.users.fetch(eliseId);

                        const guildName = interaction.guild?.name || "DMs or Unknown Server";
                        const channelMention = `<#${interaction.channel.id}>`;

                        await eliseUser.send(`⚠️ Mammy Someone tried to see your todo list :(! \n **User:** ${interaction.user.tag} (${interaction.user.id}) \n **Server:** ${guildName} \n**Channel:** #${channelMention}`);
                    } catch (err) {
                        await errorHandeler(err.message, 0xff0000, "DM_ELISE_ERR", "todo");
                    }
    
                    // Remove user from cooldown after 1 minute
                    setTimeout(() => {
                        cooldown.delete(interaction.user.id);
                    }, 60_000);
                }

            const embed = createEmbed(
                `❌ Error user id mismatch ❌`,
                "Sorry only Elise is allowed to use this command",
                null,
                "❌ Error elise their id not found ❌",
                0x992D22
            );

            return await interaction.reply( { embeds: [embed] , ephemeral: true});
        }

        const description = `
            1. Rewrite <#962632709405032458> to fit the upcoming V3 and LMS lore 
            2. Rewrite <#797792369416208386> with the same reasons as 1.
            3. Make the YUME Diva video idea in editing 
            4. Consider the idea of applying boobs size of your V3 outfit too Main V2 and V1 outfit? Mabye  poll ideas or?
            5. Edit the reference sheet section to contain all the outfits that i used before. (Can be handy used in combination with point 4)
            6. In case of if 5 and 4 are done. Consider making refernce sheets for the pregnant versions too (Learning to pose in blender?)
            7. Rewrite most of the embed stories with help of CHATGPT... left at lms eliseSocials is not needed
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
