const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const { getRandomVtuberImage, getVtuberImageByURl, getRandomVoreImage, getImageByTag } = require("../helpers/bellyImageHandler")
const vtuberPictures = require('../Assets/vtuberPictures.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('outfits')
		.setDescription('🎀 Well let this preggo explain preggos outfits too you 🎀'),
	async execute(interaction) {
        const description = `
            Hey Pixie! Interested in my closet here in the Arcade Sekai? Come on in I have all sorts of outfits for this preggo goddess to show off! :dress::sparkles:

            :star2: **Main Looks**
            • **Vocaloid Signature V2:** My iconic green crop top with the Miku-style skirt and boots.
            • **The Classics:** My original **V1 LMS Elise** look and the special outfit from when I first met Elif in his Sekai. I even let my hair down for my V2 look sometimes! :3, 
            • **Main Group** Pair that as LMS V1 Elise, Arcade Elise, Vocaloid V2 Elise and Alt look and Fairy Elise as main look group :3

            :ribbon: **Special Collections**
            • **Sekai & Mirai:** Dresses tied to my adventures across dimensions and the Magical Mirai stages.
            • **Ultimate Pregnancy Dress:** The gown from my LMS journey when I was highly pregnant with Aurora.
            • **Miku-Inspired:** Versions of *Odds and Ends*, *Monitoring*, and *Mesmerizer* all being updated to fit my current bust size! :3

            :date: **Project Elise-Mon & Beyond**
            Throughout 2026, **Project Elise-Mon** returns in <#1291045909399863306>, starting with my Normal Type look! Keep an eye out for *Cinderella*, *Dilemma*, *Gift*, and *Supreme Elise* coming soon.

            :open_file_folder: **Where to Look**
            • **All Outfits:** <#962632624587808810>
            • **Preggo Versions:** <#1113790775269015563>
            • **Quick Peek:** Use \`/preggovtuber\` to see me gloriously swollen!

            Check the image below to see a random look from my collection, darling. Ready to explore the rest of the Arcade? :pink_heart:
        `;

        let randomImage = getImageByTag(vtuberPictures, "belly_cam");

        const embed = createEmbed(
            `🎀 Elise their outfit collection hehe or a bit 🎀`,
            description,
            randomImage,
            "🎀 Elsie their outfits. {{ LAST UPDATE 9 JAN 2026 12:30 }} 🎀"
        );
	    await interaction.reply({ embeds: [embed] });
	},
};
