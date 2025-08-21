const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const vocaloidSongs = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/vocaloidSongs.json'), 'utf8'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vocaloidsongs')
        .setDescription('🎶 Get a random Vocaloid song!')
        .addStringOption(option =>
            option.setName('character')
                .setDescription('Optionally pick your favorite Vocaloid')
                .setRequired(false)
                .addChoices(
                    { name: 'Hatsune Miku', value: 'miku' },
                    { name: 'Megurine Luka', value: 'luka' },
                    { name: 'Kagamine Rin', value: 'rin' },
                    { name: 'Kagamine Len', value: 'len' },
                    { name: 'KAITO', value: 'kaito' },
                    { name: 'MEIKO', value: 'meiko' }
                )
        ),

    async execute(interaction) {
        const character = interaction.options.getString('character');

        let song, sourceCharacter;

        if (character) {
            const songs = vocaloidSongs[character];
            if (!songs || songs.length === 0) {
                return await interaction.reply(`❌ Sorry, no songs found for ${character}.`);
            }
            song = songs[Math.floor(Math.random() * songs.length)];
            sourceCharacter = character;
        } else {
            // Aggregate all songs into a flat list with character label
            const allSongs = Object.entries(vocaloidSongs).flatMap(([char, songs]) =>
                songs.map(song => ({ song, character: char }))
            );

            if (allSongs.length === 0) {
                return await interaction.reply(`❌ No songs available at the moment.`);
            }

            const randomEntry = allSongs[Math.floor(Math.random() * allSongs.length)];
            song = randomEntry.song;
            sourceCharacter = randomEntry.character;
        }

        await interaction.reply(`🎧 Here's a **${sourceCharacter.toUpperCase()}** song for you:\n${song}`);
    }
};