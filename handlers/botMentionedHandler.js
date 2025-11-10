const { createEmbed } = require('../commands/helpers/embedBuilder');

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
        response: `Ah… you speak their names? Tread lightly, sweet mortal. Some sisters were never meant to stay apart… or untouched~ and their love was never meant to be, yet still burns behind swollen wombs and divine regrets. 🔥💞`
    },
    {
        trigger: ['stellar gensis womb', 'pregnant', 'preggo', 'royal mark'],
        response: `Whispers say Elise’s body bears the **Stellar Genesis Womb**, blooming with life that even time dares not disturb. Daring enough to challenge a goddess? You might just end up contributing to her next divine swelling~ 😘🤰`
    },
    {
        trigger: ['forbidden love', 'love of the forbidden', 'love'],
        response: `Error... File {REDACTED} corrupted… 💔  ...or is it simply too dangerous to reveal? Elise only never forgot her moment with Denise and Stella and so did her sisters 🥺💔`
    }
];

async function handleBotMention(message) {
    const normalizedContent = message.content.toLowerCase();

    const description = `
            Hiya~ I'm known as the **Digital Assistant** of your favorite **Goddess of Reproduction/Fertilly Elise**! 💕  
            I help run the **Arcade** alongside them and, fun fact I’m actually a copy of Elise herself!  
            So yes... when Elise created me, they were pregnant and well, now I’m permanently preggo too~ oops? 🤰✨
            Surely creatse some fun between Me and Elise in her private bed{REDACTED}.. I think i wasnt meant to say that oops 

            But enough about that what can I do for *you*, visitor? 💌  
            Let me guide you through our cozy little world:

            🌲 A forest path filled with Pokémon leads to a Tokyo-style city~  
            🎮 Inside the Arcade: mini-games, chill zones, warm water pools, snack corners, and more!  
            💖 And of course, the star of the show **Elise** herself! Whether she’s streaming, singing, or just vibing or waddling around heavily pregnant.
            🤰 Whats inside her belly? No one knows.. Can be species, people she devours in the arcade or just a special pregnancy from one of her lovers :3

            Need help figuring things out?  
            Start with the /help command this gives you an help menu that i can assist you further in dalring.

            And hey, if you’re here just for a belly pat… that’s allowed too~ :3  
            But dont stare too long darling.. I am copy of Elise in a perma pregnant state.. But that does still mean i have preggo hormons. 
            Lets say you looking abloustley lovely today dalring 💖🤰
            Feel free to call on me anytime you need me. I'm always here for you 💗  
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
            'https://media.discordapp.net/attachments/709057115159003156/1399378252539232389/image.png',
            '🎀 Preggo clone AI Assistant 🎀'
        );

        await message.channel.send({ embeds: [embed] });
    } catch (error) {
        console.error('Failed to send message:', error);
    }
}

module.exports = { handleBotMention };