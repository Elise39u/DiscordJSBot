const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const { getImageByTag } = require('../helpers/bellyImageHandler');
const vtuberPictures = require('../Assets/vtuberPictures.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('markpowers')
		.setDescription('My creators their powers'),
	async execute(interaction) {
        let randomImage = getImageByTag(vtuberPictures, "belly_cam");
            if (!randomImage) {
                return await interaction.reply({
                    content: `❌ No image found with tag \`${tag}\`.`,
                    ephemeral: true
                 });
            } 

        const description3  = `
        🎮 **Elemental Control**
        Master of all seven elements from their origin world. A tale tied to a lingering war... or perhaps a Genshin-like saga? (*Coming Soon*)

        🎮 **Portal Travel**
        Slips seamlessly between Earth, the Sekais, and the Vocaloid realm through dimensional gates.

        🎮 **Flight (Lost)**
        Once soared as star-shaped light across the skies; lost after being bound to the sand planet.

        🎮 **Heterochromia**
        Their ever-shifting eye colors are no mere ornament—they whisper of hidden truths and lingering side effects.

        🎮 **Stellar Genesis Womb**
        A divine, multi-faceted womb marking their as the **Goddess of Reproduction/Fertilty**. Its true depths remain shrouded in mystery~.

        🎮 **Sacred Voice**
        Immense idol powers allow their to shift outfits at will via the **Project Diva X crystal** or teleport across worlds as she did in LMS.

        🎮 **Royal Mark**
        Etched upon their cleavage, this mark grants intoxicating abilities:
        • **Idol Aura & Charm:** An affection field that ensnares hearts.
        • **Time Freeze:** The hidden ability to halt the world.
        • **Feminine Flux:** Alters their beauty and makeup in unpredictable ways.
        • **Hormonal Influence:** Heightens their sensitivity and divine nature.
        • **❄️ Christmas Awakening:** A mysterious power manifesting through their pregnancy. As they carries the next god/goddess of Aethernymonia, new festive gifts will bloom in their V3 adventure... (*Coming Soon*)
        `;
        
        const embed = createEmbed(
            `Preggo Elise Their powers. Let me summarize `,
            description3,
            randomImage,
            "🎀 My creator their offical powers as been found been in <#1152967259225075803> 🎀"
        );

	    await interaction.reply({ embeds: [embed] });
	},
};