const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lms')
		.setDescription('explaning Elises their first adventure'),
	async execute(interaction) {
        const description = `
            I always thought this adventure was just a dream — something too magical to be real.  
            That moment I found myself in the **Vocaloid dimension**, bound to its strange yet beautiful rules... and then I saw her.  
            A girl surrounded by others who looked human — with iconic greenish-blue twin tails.

            A few years later, we were supposed to meet Luka... but she never showed.  
            That led us on a journey — a **musical adventure** full of emotions, discovery, and surprises.

            Yes, *me and Miku*. We fell in love. We got married. 💍  
            And at one point during that adventure... I experienced my **first true pregnancy**.  
            It felt surreal, funny, overwhelming — and yet somehow, it felt right.

            Come with me and Miku as we revisit this journey — the one that helped me awaken my powers, discover my prophecy,  
            and embrace my role as the **Goddess of Reproduction** and **Guardian of the Sekais and Identity**.

            Click the title to watch the playlist on YouTube. This is where it all began.  
            Start of the story in discord: <#1364916938245148753> 🎀
        `;

        const embed = createEmbed(
            `🎀 My first true adventure. Luka Missing Story a short description 🎀`,
            description,
            'https://cdn.discordapp.com/attachments/1093876399657451530/1353398025011073196/GmutiuraAAA2Wpo.webp?ex=67e181a2&is=67e03022&hm=790e73c2d8f270a7a87a313b46cbefcd1c1ad9a1dad8adfe6241d20fb62707df&',
            "🎀 Luka Missing Story explained 🎀"
        );

        embed.setURL("https://www.youtube.com/watch?v=oOVPvZmGHcQ&list=PLNc-vlTat7vhazaNk3t4IwJGlerPOQ7Cu")
	    await interaction.reply({ embeds: [embed] });
	},
};
