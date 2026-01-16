const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const { getRandomVtuberImage, getVtuberImageByURl, getRandomVoreImage, getImageByTag } = require("../helpers/bellyImageHandler")
const vtuberPictures = require('../Assets/vtuberPictures.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('referencesheets')
		.setDescription('Want to see a reference sheet for a look?'),
	async execute(interaction) {
        //TODO: update to fits new style of the bot 
        let randomImage = getImageByTag(vtuberPictures, "reference_sheet");

        const description = `
        Oh Pixie, let’s keep this short and simple no Goddess teasing or hungry jokes for now! Just a quick guide on where to find my outfits and how I look while heavily pregnant. :ribbon:

        :small_blue_diamond: <#962632624587808810> — **Non-Pregnant Versions** This channel holds all my looks updated with my V3 bust size. (More being added soon!)
        :small_blue_diamond: <#1113790775269015563> — **Pregnant Versions** Here you can find my looks with a lovely, swollen pregnant belly. :pregnant_woman::sparkles:
        :small_blue_diamond: <#1291045909399863306> — **Project Elise-Mon** Everything related to my Pokémon-inspired outfits! All 18 base types and the Stellar type are coming soon.

        :warning: **Important Notes:**
        :one: **Updates:** Preggo Elise reference sheets are currently being updated to match my V3 proportions. You can use \`/preggovtuber\` to see a few already :3
        :two: **Elise-Mon:** These outfits will also receive dedicated pregnant reference sheets soon!

        If you saw a look in a video or stream and want to see the full reference, feel free to ask here in the server or dm me ! Updates will continue throughout 2026 and beyond. :cherry_blossom:

        Much love from your pregnant trans girl,
        **Elise**
        `;

        const embed = createEmbed(
            `🎀 Elise their reference sheets and swollen looks :3 🎀`,
            description,
            randomImage,
            "🎀 Wonderd how i look swollen. Or just see a ref sheet? {{ LAST UPDATE 12 JAN 2026 13:10 }} 🎀"
        );
	    await interaction.reply({ embeds: [embed] });
	},
};
