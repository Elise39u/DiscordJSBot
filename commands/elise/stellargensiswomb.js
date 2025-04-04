const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stellargensiswomb')
        .setDescription('the goddess of reproduction? Why can i get pregnant?'),
    async execute(interaction) {
        const description = `
        You're either curious how I can get pregnant, what powers I have—or you just wanted to see my pregnant belly. 🎀

        Yes, I’m the **Goddess of Reproduction**, and my **Stellar Genesis Womb** lets me adapt to any species—even ones that don’t normally carry. From insects laying eggs inside me, to being filled with sacred elemental waters… my womb adjusts, nurtures, and thrives.

        It adapts for each lifeform: eggs can safely hatch, magical fluids support growth, and my Royal Mark ensures I remain divine through it all.

        I’ve uncovered 6–9 key powers so far, like:  
        • ✨ Beyond the Boundaries of Reproduction  
        • 🧬 Mastery Over Reproduction & Genetic Influence
        • 💗 Master of Inflation & Physical Adaptation.

        More powers will awaken soon. When they do, <#1345430746789052496> will hold everything.  
        With love, **Preggo Elise** 💖
`;

        const embed = createEmbed(
            `🎀 (WIP) My true powers goddess powers 🎀`,
            description,
            'https://cdn.discordapp.com/attachments/1093876399657451530/1357737328541700157/Snapchat-2027329662.jpg?ex=67f14aec&is=67eff96c&hm=18f7172d75d2fd3ceb47ad3eb7fdb5b5fde9fe86efea12aa4d64f9eb9df317b7&',
            "🎀 Stellar gensis womb 🎀"
        );
        await interaction.reply({ embeds: [embed] });
    },
};
