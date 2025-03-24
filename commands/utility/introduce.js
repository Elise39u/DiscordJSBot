const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('introduction')
		.setDescription('Telling a bit about my self'),
	async execute(interaction) {
        const description = `
            Hi there im known as the Digital Assisant of your Preggo Demi Trans girl Elise 
            An Sort of AI help to run the Arcade alongside them. Im also a direct copy of them in the process to match the personaility 
            So yes apprently when Elise made me they were pregnant and that resulted in the same for me... Its been there ever since then they made me. I think im perma pregnant but oh well.  
            But how can this AI be of services to our new visitor? Mabye i can guide you along the forest path full of pokemon into the city that resembles tokyo 
            Also there are a lot of pokemon even in this arcade there quite some spots to play with them or your in need of a relax in our warm water pools? 
            Or your simply here to chill and have fun with our snack corner or play a arcade game or watch your preggo demi trans girl Elise?
            Mabye you want to know what i can do well in that case how. Why dont we start with (backslash)help. Do to coding i cant use the character for it 
            Also can be that your here just for a belly pat which is allowed :3. But feel free to call me when you need me <3
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
