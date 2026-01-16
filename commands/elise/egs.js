const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const { getImageByTag } = require('../helpers/bellyImageHandler');
const projectDivaPictures = require('../Assets/projectDivaPictures.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('egs')
		.setDescription('what does EGS stand for in the youtube series. '),
	async execute(interaction) {
        let randomImage = getImageByTag(projectDivaPictures, "egs");
                if (!randomImage) {
                    return await interaction.reply({
                        content: `❌ No image found with tag \`egs\`.`,
                        ephemeral: true
                    });
            }

        const description = `
                Curious about EGS? It stands for **Elise Gender Story** my journey on earth as a trans girl from another world. 🌸

                Even with godly powers, being a trans girl who can get pregnant is a journey that defies nature. I’m here to share how I navigated identity, sexuality, and the struggle of answering: *Who am I? Why am I here?*

                ✨ **What is EGS?**
                It’s a raw look at my experiences from my initial 2-year transition of when i accepted my transgender side to a recap of growth as a pregnant transgirl on earth and **Guardian of Identity**. I hope my story inspires you on your own path of self-discovery!

                🤰 **The Preggo Identity**
                I use **Preggo/They/She** pronouns. My journey explores what happend on this Transgender jounrey while of course carrying this big bump and embracing my true self.

                📖 **Explore the Story**
                • **Watch:** Click the title of this embed for the YouTube playlist!
                • **Read:** Check out <#1175925314229121074> for deep-dives (Chapters up to **EGS 31**).

                *Thanks for listening to my journey. Perhaps I can inspire yours?* 💖
            `;

            const embed = createEmbed(
            `🎀 Elise their gender story 🎀`,
            description,
            randomImage,
            "🎀 Elise Gender Story explained !! { Last Updated at 8 JAN 2026 13:55 } !!🎀"
        );

        embed.setURL("https://www.youtube.com/watch?v=GxUxIMQsYP4&list=PLNc-vlTat7viUYY1BuxU1T563gskQpvJJ")
	    await interaction.reply({ embeds: [embed] });
	},
};
