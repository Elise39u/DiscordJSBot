const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

const bellyPictures = [
    'https://cdn.discordapp.com/attachments/1093876399657451530/1358746267018203136/Snapchat-1994583211.jpg?ex=67f4f692&is=67f3a512&hm=c514eb1cdc6c24d8feb7c7fadedaf8a650c442a2396f321d83d69ff3fd3cc0d9&',
    'https://cdn.discordapp.com/attachments/1093876399657451530/1358746267618115717/Snapchat-1713200016.jpg?ex=67f4f692&is=67f3a512&hm=be9ad8bd4bae83ce42035cecfd7ee1454a4b34a72621bb4002d6f3080666ae60&',
    'https://cdn.discordapp.com/attachments/1093876399657451530/1357737328541700157/Snapchat-2027329662.jpg?ex=67f496ac&is=67f3452c&hm=c054de694f17c303374df4ee53f29f4f09e4fbc5db88daea390aaf34e15d5d5c&',
    'https://cdn.discordapp.com/attachments/1093876399657451530/1358746266716340416/Snapchat-1110008326.jpg?ex=67f4f692&is=67f3a512&hm=4bdf64c3f16b600c21da59b601d3672feaf9b9ed9dc3a208eb44c3e5b81a365e&',
    'https://cdn.discordapp.com/attachments/1093876399657451530/1358746267324252241/Snapchat-1304575324.jpg?ex=67f4f692&is=67f3a512&hm=bace4afeb3ae054f6126fc27c96f3f1f4ec707f6f66a3459640693429908d2f0&',
    'https://cdn.discordapp.com/attachments/1093876399657451530/1366349610507046962/Snapchat-2139031327.jpg?ex=68109fbc&is=680f4e3c&hm=30cff518d97c202eb2f4de7007e8dcbdfdef6c2602cba809ed06ec68320daaf8&',
    'https://media.discordapp.net/attachments/1093876399657451530/1370001782574682142/Snapchat-687414354.jpg?ex=681de916&is=681c9796&hm=78ee6feb7ff5ae2cce198d8dd09fb8fa68a646589f7179174da96bdb0b1a00ba&=&format=webp&width=1463&height=823'
]

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
        const randomImage = bellyPictures[Math.floor(Math.random() * bellyPictures.length)];

        const embed = createEmbed(
            `🎀 (WIP) My true goddess powers 🎀`,
            isLewd ? lewdDescirption : description,
            randomImage,
            "🎀 Stellar gensis womb 🎀"
        );
        await interaction.reply({ embeds: [embed] });
    },
};
