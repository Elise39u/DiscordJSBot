const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = './belly.json';
const { ELISE_ID_MENTION } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('escape')
        .setDescription('Try to escape from Elise’s divine belly~ Roll the dice of fate! 🎲'),

    async execute(interaction) {
        const userId = interaction.user.id;
        const username = interaction.user.username;

        // Load data
        if (!fs.existsSync(path)) {
            return interaction.reply({ content: 'Nobody is inside her belly yet~ 🍑', ephemeral: true });
        }

        const bellyData = JSON.parse(fs.readFileSync(path, 'utf8'));

        // Check if user is inside
        const index = bellyData.swallowedUsers.findIndex(u => u.id === userId);
        if (index === -1) {
            return interaction.reply({ content: 'Darling~ you’re not even inside my divine womb~ Trying to sneak out early? 💞', ephemeral: true });
        }

        // Roll the dice 🎲
        const userRoll = Math.floor(Math.random() * 150) + 1;
        const eliseRoll = Math.floor(Math.random() * 150) + 5;

        let outcomeText = '';
        let flavor = '';

        // Win = escape
        if (userRoll > eliseRoll) {
            bellyData.swallowedUsers.splice(index, 1);
            fs.writeFileSync(path, JSON.stringify(bellyData, null, 2));

            flavor = [
                "Tch~ You actually slipped out of me, huh? Fine… run along, little mortal~ but don’t forget how I felt around you~ 💋",
                "Hah~ Seems fate smiled upon you this time, darling~ Don’t think you’ll escape so easily next time~ 💞",
                "Oh? You really managed to squirm your way out? Guess even a goddess has to loosen her hold *sometimes*~ 💫",
                "Mmm~ You fought hard for that freedom~ I’ll be waiting for you to crawl back inside eventually~ 💖"
            ];
            outcomeText = `🎲 **${username} rolled ${userRoll}**, Elise rolled ${eliseRoll}.\n\n✨ Against all odds, you managed to escape from her divine warmth! 🌸`;
        }
        else {
            flavor = [
                "Aww~ nice try, pet~ but my womb doesn’t release its toys that easily~ 💞",
                "Heh~ rolled a bit too low, did we? Guess you’ll keep squirming inside for now~ 😘",
                "Mmm~ I felt you pushing… struggling… delicious~ but you’re mine till I decide otherwise~ 🔥",
                "Oh dear~ even fate wants you to stay inside me a little longer~ such a good prey~ 💋"
            ];
            outcomeText = `🎲 **${username} rolled ${userRoll}**, Elise rolled ${eliseRoll}.\n\n💦 Looks like her divine embrace keeps you trapped a little longer...`;
        }

        const selectedFlavor = flavor[Math.floor(Math.random() * flavor.length)];

        const embed = new EmbedBuilder()
            .setTitle('🎲 Fate of the Divine Belly 🎲')
            .setDescription(`${outcomeText}\n\n*${selectedFlavor}*`)
            .setColor(userRoll > eliseRoll ? '#f9a8d4' : '#d16ba5')
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }));

        await interaction.reply({
            content: `${ELISE_ID_MENTION} — a mortal dares to challenge your divine hold! 💫`,
            embeds: [embed]
        });
    }
};