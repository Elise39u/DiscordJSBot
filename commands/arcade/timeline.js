const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const { getImageByTag } = require('../helpers/bellyImageHandler');
const projectDivaPictures = require('../Assets/projectDivaPictures.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeline')
		.setDescription('🎀 My lore shortly Explained 🎀'),
	async execute(interaction) {
        
        let randomImage = getImageByTag(projectDivaPictures, "timeline");
            if (!randomImage) {
                return await interaction.reply({
                    content: `❌ No image found with tag \`timeline\`.`,
                    ephemeral: true
                 });
            }
  
        const description = `
                🩷 **The Canon Timeline**

                ✨ **Origins & Debut**
                V3 Origins *Coming soon*.
                **Vocaloid Debut Arc:** The LMS adventure in <#1364916938245148753> and what i thought was a Dream in <#1390008445410742513>.

                👗 **LMS Sekai Dresses**
                *How I joined the Sekai groups:*
                <#1328320712712126546> ➔ <#1328321706455990294> ➔ <#1328322707078516806> ➔ <#1328323629577932841> ➔ <#1328324657664884787>

                🌟 **Divine Identities**
                • **Guardian of Identity:** <#1367787489116557402>
                • **Goddess of Reproduction/Fertitlty:** <#1345430746789052496>
                • **Personal Sekai:** <#1392542648027447376> | **Elif’s Sekai:** <#1410575021868453908>

                🚀 **Brand New World Journey**
                *Testing my powers as a Guardian:*
                <#1423631831546200157> → <#1426876671075811399> → <#1419628843941232730> → <#1433102120730624051> → <#1438127201387024465> → <#1451165321170911306> → <#1447953077331300534>

                🎶 **Magical Mirai**
                The Aethernymonia legacy & Dress Lore: <#1443265649668522034>

                *Check \`/nonlore\` for non-canon info! :3*
            `;

        const embed = createEmbed(
            `A shorter version of my lore timeline with big bellies ofcourse :3`,
            description,
            randomImage,
            "🎀 The lore of Preggo Elise explained shortly 🎀"
        );

	    await interaction.reply({ embeds: [embed] });
	},
};
