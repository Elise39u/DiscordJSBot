const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('referencesheets')
		.setDescription('Want to see a reference sheet for a look?'),
	async execute(interaction) {
        const description = `
        Let’s keep this one short and sweet~ 💖  
        Every outfit of mine has **both a pregnant and non-pregnant version**,  
        but not every single look has a full reference sheet (yet)!

        Here’s where to find what:

        🔹 <#962632624587808810> — **Non-pregnant reference sheets**  
        🔹 <#1113790775269015563> — **Pregnant reference sheets**  
        🔹 <#1291045909399863306> — **Project EliseMon** content, including all 18 type-based outfits!

        ⚠️ Small notes:
        1️⃣ **Project EliseMon** outfits currently don’t have pregnant versions.
        2️⃣ Not *all* my outfits are listed — I’ve got a *lot*, hehe ✨

        So if you saw a look you liked on stream or in a video and don’t see it in the ref section —  
        feel free to **DM me or tag me in the server** 💌  
        I might even update the section to include everything someday (maybe grouped up nicely~ we'll see).

        With love,  
        **Preggo Elise** 🎀
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
