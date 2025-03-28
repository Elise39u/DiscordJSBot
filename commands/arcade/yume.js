const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('yume')
		.setDescription('Elise their relationship with her wife Miku'),
	async execute(interaction) {
        const description = `
            LMS was always a huh huh for me to remake. That partily to two things in the story.
            1st thing is i wrote myself pregnannt in that fanfic story which sorted it self out. 2nd thing was my love to miku and well me marrying her.
            SO i thought at a point fuck it and lets do it. Yes im calling miku my wife and i dont care what people think anymore.
            Yume is basically a temr for shipping yourself with a fictonal character and often is a oc or chartacter that repsentres you X finctional character.
            So in this case me my vtuber who represtens me in ways who i want to be X Miku. In Japanese fandom, the term "夢女子" (yumejoshi, "dreaming girl") is used by female self-shippers.
            In case you ever wanted to make fanart of me and Miku together then here below is my  yume sheet. Also if you have questions feel free to ask them.
            So yes LMS will explain a lot but in short. Yes im married to Hatsune Miku and love her but also have been pregnant of her. 
            Who knows might happend again in the future. Hope it lights thing a bit up on my first and mabye true partner :3
        `;

        const embed = createEmbed(
            `🎀 Elise and Miku what the deal between them? 🎀`,
            description,
            'https://cdn.discordapp.com/attachments/1093876399657451530/1355154015914295408/English_ver.png?ex=67e7e506&is=67e69386&hm=7bc14d22354eb02f4e6af9e342c53a3da3391c3d286ede25cca740926b99e6a4&',
            "🎀 Elsie their yume sheet.🎀"
        );
	    await interaction.reply({ embeds: [embed] });
	},
};
