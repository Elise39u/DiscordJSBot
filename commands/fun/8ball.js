const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const { ELISE_ID } = process.env;

const projectDivaResponse = [
    "🎤 Hatsune Miku says yes!",
    "🎵 The rhythm is certain.",
    "🎶 Absolutely like Project DIVA!",
    "🎧 Yes, like a VOCALOID melody!",
    "🎹 It's as reliable as KAITO's voice.",
    "🎵 As I see it, yes, like Megurine Luka's charm.",
    "🎶 Most likely, just like MEIKO's popularity.",
    "🎧 Outlook good, like a captivating concert!",
    "🎹 Yes, like the beat of a VOCALOID song!",
    "🎤 Signs point to yes, just like Rin and Len's duet.",
    "🎵 Reply hazy, try again while playing Project DIVA.",
    "🎶 Ask again later, after listening to some VOCALOID tunes.",
    "🎧 Better not tell you now, enjoy the suspense like in a music video.",
    "🎹 Cannot predict now, like the unpredictable charm of Project DIVA.",
    "🎤 Concentrate and ask again while humming a VOCALOID melody.",
    "🎵 Don't count on it, like trying to hit extreme difficulty in Project DIVA.",
    "🎶 My reply is no, just like the absence of a certain VOCALOID.",
    "🎧 My sources say no, like a silent virtual singer.",
    "🎹 Outlook not so good, like a missed note in Project DIVA.",
    "🎤 Very doubtful, like the chance of seeing a live VOCALOID concert.",
];

const EliseResponse =  [
    "👍 It is certain, mama-to-be! 🤰",
    "🎱 It is decidedly so, a beautiful journey awaits! 🌈",
    "🔮 Without a doubt, you're glowing with joy! ✨",
    "🌟 Yes, definitely! Your journey is unique and amazing! 🌈",
    "✨ You may rely on it, mama! Trust your instincts! 🌸",
    "💫 As I see it, yes! Embrace this magical chapter! 🌙",
    "👌 Most likely, darling! You've got this! 🌺",
    "🔍 Outlook good, mama! The future looks bright! 🌞",
    "🌈 Yes, absolutely! Your baby is a precious gift! 🌷",
    "🤞 Signs point to yes, mama! Exciting times lie ahead! 🌼",
    "🙌 Reply hazy, try again later, but trust your journey! 🌈",
    "⏳ Ask again later, as this is a time of change and growth! 🌸",
    "🤔 Better not tell you now, but trust your heart! ❤️",
    "🙃 Cannot predict now, but enjoy the surprises along the way! 🌟",
    "❌ Concentrate and ask again, trust your intuition! 💫",
    "😕 Don't count on it, but stay positive and hopeful! 🌈",
    "🚫 My reply is no, but don't lose hope, miracles happen! 🌺",
    "🔒 My sources say no, but remember, love conquers all! ❤️",
    "🙅‍♀️ Outlook not so good, but your strength will carry you through! 🌟",
    "❗ Very doubtful, but believe in your resilience, mama! 🌸"
]

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask the magic 8ball a question!')
        .addStringOption(option => 
            option.setName('question')
                .setDescription('The question you want to ask the 8ball')
                .setRequired(true)),
    
    async execute(interaction) {
        const userId = interaction.user.id;
        let responses = projectDivaResponse;
        let choseResponse = "";

        if (userId === ELISE_ID) {
            choseResponse = EliseResponse[Math.floor(Math.random() * EliseResponse.length)]
            let embed = createEmbed('Elise Preggo Ball Response', choseResponse, null, "8ball Creator response");
            await interaction.reply({ embeds: [embed] });
        } else {
            choseResponse = responses[Math.floor(Math.random() * responses.length)]
            let embed = createEmbed("🎱 response", choseResponse, null, "8ball response");
            await interaction.reply({ embeds: [embed] });
        }
    }
};
