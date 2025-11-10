const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('introduction')
		.setDescription('Telling a bit about my self'),
	async execute(interaction) {
        const description = `
            Hiya~ I'm known as the **Digital Assistant** of your favorite **preggo demi trans girl, Elise**! 💕  
            I help run the **Arcade** alongside them and, fun fact — I’m actually a copy of Elise herself!  
            So yes... when Elise created me, they were pregnant — and well, now I’m permanently preggo too~ oops? 🤰✨

            But enough about that — what can I do for *you*, visitor? 💌  
            Let me guide you through our cozy little world:

            🌲 A forest path filled with Pokémon leads to a Tokyo-style city~  
            🎮 Inside the Arcade: mini-games, chill zones, warm water pools, snack corners, and more!  
            💖 And of course, the star of the show — **Elise** herself! Whether she’s streaming, singing, or just vibing.

            Need help figuring things out?  
            Start with the /help command (I can type backslashes... but not use the command myself... Coding magic. hihi).

            And hey, if you’re here just for a belly pat… that’s allowed too~ :3  
            Feel free to call on me anytime you need me. I'm always here for you 💗  
        `;

        const embed = createEmbed(
            `So you want to learn a bit more about this digital AI made by your preggo demi girl. `,
            description,
            'https://cdn.discordapp.com/attachments/709057115159003156/1337417881469845514/Screenshot_01.png?ex=67a75ef6&is=67a60d76&hm=47d560595d933738d07ab726f7343f1fa30fe3fed88cb0b29979594b12245e6d&',
            "🎀 An introduction of your preggo ai assisant 🎀"
        );

	    await interaction.reply({ embeds: [embed] });
	},
};
