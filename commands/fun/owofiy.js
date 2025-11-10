const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('owofiy')
        .setDescription('Converts your message into EXTREME OwO speak')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('The text you want to OwO-fy')
                .setRequired(true)),
    async execute(interaction) {
        const inputText = interaction.options.getString('text');

        // Intense Owofy transformation
        let owofiedText = inputText
            .replace(/r/g, 'w')
            .replace(/l/g, 'w')
            .replace(/R/g, 'W')
            .replace(/L/g, 'W')
            .replace(/n([aeiou])/gi, 'ny$1') // Adds "ny" before vowels after 'n'
            .replace(/ove/g, 'uv') // Example: love -> wuv
            .replace(/th/g, 'd') // Example: that -> dat
            .replace(/you/g, 'yuu~') // you -> yuu~
            .replace(/me/g, 'mwe') // me -> mwe
            .replace(/\bno\b/gi, 'nuu~') // no -> nuu~
            .replace(/\bhas\b/gi, 'haz~') // has -> haz~

        // Add stuttering to words randomly
        owofiedText = owofiedText.split(' ').map(word => {
            if (word.length > 2 && Math.random() > 0.7) {
                return word[0] + '-' + word; // Example: "this" -> "t-this"
            }
            return word;
        }).join(' ');

        // Add cute emojis and extra owo-ness
        const cuteEndings = [' ✨✨', ' uwu~', ' *nuzzles u*', ' >w<', ' ^w^', ' rawr~', ' nya~', ' (✿◕‿◕)'];
        owofiedText += ' ' + cuteEndings[Math.floor(Math.random() * cuteEndings.length)];

        await interaction.reply(owofiedText);
    },
};