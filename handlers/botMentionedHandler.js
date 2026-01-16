const { createEmbed } = require('../commands/helpers/embedBuilder');
const { getImageByTag } = require("../commands/helpers/bellyImageHandler")
const vtuberPictures = require('../commands/Assets/vtuberPictures.json');


const keywordResponses = [
    {
        trigger: ['help'],
        response: `Need a bit of guidance? You can start with the /help command or just ask me here! 💁‍♀️`
    },
    {
        trigger: ['belly', 'belly pat'],
        response: `A belly pat? Aww~ you're too sweet! 🥺🤰 *pat pat*`
    },
    {
        trigger: ['who are you', 'who r u'],
        response: `I'm Elise's digital assistant, a preggo clone AI copy of her. Don't ask how... it just happened~ by their magical cloning powers 💞`
    },
    {
        trigger: ['elise'],
        response: `Oh? You said their name~ Elise is the heart of all this! Goddess of Reproduction, Gurdian of the Sekais and Identity, Vtuber cutie, and my creator i love my creator and them 💖`
    },
    {
        trigger: ['stream', 'live'],
        response: `Ooh, wondering about a stream? Elise might be live or planning one~ check the <#749939669210366022> or <#714444687012003911> channel! 📺✨`
    },
    {
        trigger: ['lewd', 'horny', 'teasing'],
        response: `Mmm, feeling bold?~ Preggo goddess Elise loves a lil teasing~ But be careful… she bites~ 💋✨`
    },
    {
        trigger: ['clone', 'cloning'],
        response: `Elise makes clones for *fun*~ but when they get naughty, she slurps them right back into her~ 😏💞. But the fun with them doesnt end there 💋`
    },
    {
        trigger: ['vore', 'devour me', 'devour', 'vore Elise'],
        response: `Mmm~ wanna be squished deep inside Elise’s warm preggo belly? She *loves* feeling you wriggle inside~ 💞🤰. Wanna be devoured or slurped up? Let me call my creator 😏`
    },
    {
        trigger: ['sister', 'sisters', 'curse of overabundance', 'stella', 'denise'],
        response: `Ah that love who was orginally thought to be wrong but after she learned they arent sisters.. Love grew stronger 🥰💞 and now they are a poly triangle. Rumours speak Elise is trying to get Stella and Denise Pregnant on their request 😘🤰`
    },
    {
        trigger: ['stellar gensis womb', 'pregnant', 'preggo', 'royal mark'],
        response: `Whispers say Elise’s body bears the **Stellar Genesis Womb**, blooming with life that even time dares not disturb. Daring enough to challenge a goddess? You might just end up contributing to her next divine swelling~ 😘🤰`
    },
    {
        trigger: ['forbidden love', 'love of the forbidden', 'love'],
        response: `ERRROR 500: Redacted file has been corrupted after Elise learned of their creator. Stella and Denise arent sitsters.. But their love is too strong.. I sense the 3 of them are going to get pregnant together in thir polyamorous relationship 🥰🤰💞`
    }
];

async function handleBotMention(message) {
    const normalizedContent = message.content.toLowerCase();
	let randomImage = getImageByTag(vtuberPictures, "belly_cam");

    const description = `
            Hiya, Pixie! Looking for me? :pink_heart:

            I’m the **Digital Assistant AI Clone** of your favorite Goddess of Fertility, Elise! I’m permanently stuck with this big, beautiful bump just like thhm and luckily, I haven't been "absorbed" back into theirbelly yet! hihi~ :pregnant_woman::sparkles:

            **Need a guide to our Christmas Arcade?**
            :christmas_tree: **Arcade & Pool:** Games, snacks, and warm waters.
            :evergreen_tree: **Enchanted Forest:** Friendly Pokémon and Tokyo vibes.
            :sparkling_heart: **The Goddess:** Catch Elise waddling, singing, or streaming!

            Need help? Use \`/help\`. Or are you just here for **belly rubs**? I adore the attention, but be careful if you tease this clone too much, I’m not responsible for what happens next! :smiling_imp: 
        `;   

    let customNote = '';
    for (const keyword of keywordResponses) {
        if (keyword.trigger.some(t => normalizedContent.includes(t))) {
            customNote = keyword.response;
            break;
        }
    }
    
    try {
    if (customNote) {
        await message.channel.send({ content: customNote });
    }

        const embed = createEmbed(
            '✨ Hiya~ You called for Preggo Goddess Elise\'s their assistant? ✨',
            description,
            randomImage,
            '🎀 Preggo clone AI Assistant 🎀'
        );

        await message.channel.send({ embeds: [embed] });
    } catch (error) {
        console.error('Failed to send message:', error);
    }
}

module.exports = { handleBotMention };