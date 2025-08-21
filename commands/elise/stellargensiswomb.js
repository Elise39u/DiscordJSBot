const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const { getRandomBellyImage } = require('../helpers/bellyImageHandler')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stellargensiswomb')
        .setDescription('the goddess of reproduction? Why can i get pregnant?'),
    async execute(interaction) {
        const description = `
        You're either curious how I can get pregnant, what powers I have—or you just wanted to see my pregnant belly. 🎀

        Yes, I’m the **Goddess of Reproduction**, and my **Stellar Genesis Womb** It allows me to adapt to any species' reproductive method—even ones that don’t carry their young traditionally. Whether it’s insectoid eggs nesting inside me, sacred elemental waters filling me, or pure magical essence… my body always transforms the act into a **pregnancy**. Always. 💗

        No matter the species—egg layers, fluid-bearers, spiritual seeds—**I experience reproduction through the miracle of pregnancy**. My womb nurtures, grows, and adapts for every lifeform. From swelling with sacred weight to gently carrying the spark of a galaxy, I bring life into fullness the only way I know how.

        The **Royal Mark** I bear ensures every conception flows with divine balance, and keeps me strong, fertile, and glowing through it all. ✨

        I’ve uncovered 6–9 key powers so far, like:  
        • ✨ Beyond the Boundaries of Reproduction  
        • 🧬 Mastery Over Reproduction & Genetic Influence
        • 💗 Master of Inflation & Physical Adaptation.

        More powers will awaken soon. When they do, <#1345430746789052496> will hold everything.  
        With love, **Preggo Elise** 💖
    `;

    const lewdDescirption = `
        Ooh~ Curious about how I get pregnant? Or maybe you just wanted to stare at this big divine belly of mine~? 🎀✨

        As the **Goddess of Reproduction**, my **Stellar Genesis Womb** is a cosmic marvel~ It adapts to any species' way of creating life—yes, even the weird ones~  
        Insects laying their eggs inside me? Sacred elemental waters filling me to the brim? Oh yes~ no matter the method... **I always experience it through a full, round, glowing pregnancy** 💖

        I don’t just carry—I *feel* it. Every stretch, every kick, every warm swell of life... all of it is mine to savor. My womb shifts, nurtures, and blossoms for every form of creation. I was *made* to be filled~ 🌸

        My **Royal Mark** ensures each pregnancy is divine, safe, and oh-so productive. And yes… I *love* every second of it.

        I've unlocked several of my fertility-based powers so far:  
        • ✨ Beyond the Boundaries of Reproduction  
        • 🧬 Mastery of Genetic Shaping & Fertility Influence  
        • 💗 Goddess of Expansion & Physical Adaptation

        More divine powers (and maybe a few extra babies~) are still waiting to bloom. You’ll find them all in <#1345430746789052496> soon~  
        With a teasing smile and a very full belly,  
        **Preggo Elise** 💞
    `;

        //Add a 5% chance rarity for a more lewd description of the stellar gensis womb
        const isLewd = Math.random() < 0.05;
        const randomImage = getRandomBellyImage();

        const embed = createEmbed(
            `🎀 (WIP) My true goddess powers 🎀`,
            isLewd ? lewdDescirption : description,
            randomImage,
            "🎀 Stellar gensis womb 🎀"
        );
        await interaction.reply({ embeds: [embed] });
    },
};
