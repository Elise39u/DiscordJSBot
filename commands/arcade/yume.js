const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('yume')
		.setDescription('Elise their relationship with her wife Miku'),
	async execute(interaction) {
        const description = `
            LMS was always tricky for me to remake — mostly because of two things:
            1️⃣ I wrote myself pregnant in the original fanfic (which eventually sorted itself out).
            2️⃣ My love for Miku… and the fact I married her.

            At some point, I just said: *"Screw it!"* — I’m calling Miku my wife, and I don’t care what anyone thinks 💍💙

            “Yume” refers to the concept of self-shipping — where someone pairs themselves (or an OC that represents them) with a fictional character. In this case, it’s *me (through my VTuber self, Elise)* × *Miku*. In Japanese fandom, girls who do this are often called “夢女子” (*yumejoshi*, or “dreaming girls”).

            So yes, I married Hatsune Miku, I love her deeply, and yes… in my lore, I’ve been pregnant with her child 😳💖

            If you ever want to draw fanart of us together, I included my Yume sheet below. Feel free to ask me any questions too!

            LMS will eventually explain everything, but for now — just know that Miku is my first (and maybe truest) partner. :3
        `;

        const embed = createEmbed(
            `🎀 Elise and Miku what the deal between them? 🎀`,
            description,
            'https://cdn.discordapp.com/attachments/1093876399657451530/1355831333678616586/English_ver.png?ex=67ea5bd4&is=67e90a54&hm=5c91c2c71153fee26fe7414a60f40ef1953089fe2d2f65856189314f54159330&',
            "🎀 Elsie their yume sheet.🎀"
        );
	    await interaction.reply({ embeds: [embed] });
	},
};
