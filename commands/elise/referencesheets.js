const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('referencesheets')
		.setDescription('Want to see a reference sheet for a look?'),
	async execute(interaction) {
        const description = `
        I want to keep this one short and sweet to make it cleaer. As stated every look of my has a pregnant and non pregnant version.
        But not every look has a reference sheet or mabye only a pregnant reference sheet version or the other way around.
        <#962632624587808810> Contains referencesheet for my non pregnant versions.
        <#1113790775269015563> Contains reference sheets for my pregnant versions.
        <#1291045909399863306> Everything related to Project elise mon including reference sheets for all 18 type outfits. 2 small reminders
        Project Elise mon doesnt have pregnant reference sheets and as said not all my looks are visable in the reference sheets.
        Simply i have too many looks to show off in the reference sheets section. So see a outfit you like in a stream or videos and want a reference of it,.
        Feel free to dm me for this or tag me in the server. (I might change the section to include all my outfits. Mabye in groups but not sure)
        `;

        const embed = createEmbed(
            `🎀 Elise reference sheets 🎀`,
            description,
            'https://media.discordapp.net/attachments/962632624587808810/1273964453125165086/EliseMainLooks_-_Copy.png?ex=67f0691a&is=67ef179a&hm=412fff592cccaf86a7d1aaeaaf5e216fe8d8319e93baed699f2b11280c3d5e28&=&format=webp&quality=lossless&width=688&height=386',
            "🎀 Wanted a reference of your favourite outfit? 🎀"
        );
	    await interaction.reply({ embeds: [embed] });
	},
};
