const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

const randomPun = ["*Len and Miku talking on the phone*\nMiku: Could you do me a favour? I could really use your help.\nLen: Sure, I'll do it tomorrow.\nMiku: But Len, wouldn't you want to be....... Freely Tomorrow?\nLen: *facepalm*", 
    "*Elise and Miku are Talking in the Arcades*\nMiku: Elise you know what is so speical about Suki Kirai?\n Elise: Ehhhee Len and Rin sing it?\nMiku: Almost Elise\nElise: Miku i wouldnt have a clue about Suki Kirai or Love hate.\nMiku: Well its appears they have a case of **Two-faced-lovers**\nElise: -.-", 
    "Miku: Elise i wanna show you something about this arcade machine!\nElise: I swear to god miku if its anthor pun\nMiku: Why would it be? Otherwise it only would bring me down like a **deep sea girl**\nElise: -.- i swear", 
    "*Summer is rolling around and Elise, Miku, Rin and Luka are talking near the Pool of the arcade*\n Miku: Elise when your turning into a *summer idol*.\n Miku: Elise? Eliseeee? Where did she go\nElise: Not that song again. Not the spam", 
    "*Luka, Miku and Elise are walking through the Arcade gardens*\nMiku:Luka what ever happend to your relationship with that girl\nLuka: Oh just dindt work out. But hey it brought out the song *just be friends*\nMiku: Dont you say it killed the **Love song**\nElise and Luka: MIKUUUUUUUUUUUUU", 
    "Miku: I love you lukaaaaa.\n Luka: I love you tooo Miku but i am not sure if it will work out\n Miku: Can we at least **Just be Friends** pwease >.<\n Luka: Miku i see where you going with that pun but sure... ", 
    "Len: Im getting so much better at this game \nGUMI: Indeed you are\nLen: Do you think im a pr0 GUMI\nGUMI: No but You are KING", 
    "Miku: Ever tried a taco IA?\n IA: No i would be interested in trying Miku\nMiku: AWESOMEEEEE Maby its time to *tell your world* about it?\n IA: I get why Elise called you pun queen but maby i should. But only on Taco tuseday\n Miku: Finneeeeeee....."
]

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vocaloidpun')
        .setDescription('🎀 as if the day wasnt bad emough 🎀'),
    
    async execute(interaction) {
        const chosenPun = randomPun[Math.floor(Math.random() * randomPun.length)]
        let embed = createEmbed('Vocaloid pun', chosenPun, null, "A fun word joke");
        await interaction.reply({ embeds: [embed] });
    }
};
