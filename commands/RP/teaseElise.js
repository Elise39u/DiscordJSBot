const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './belly.json';
const { ELISE_ID_MENTION, ELISE_ID } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('teasethegoddess')
        .setDescription('Try teasing Elise to plump her divine belly... but risk becoming part of it~'),
    async execute(interaction) {
        const user = interaction.user;

        if(user.id === ELISE_ID) {
            return await interaction.reply({
                content: '😤 You can’t tease yourself, silly~ Let someone else tease you instead. If your hungry just devour someone :3'
            });
        }

        let data = { swallowedUsers: [], bellySize: 0 };
        if (fs.existsSync(path)) {
            data = JSON.parse(fs.readFileSync(path, 'utf8'));
        }

        const roll = Math.random();
        const voreChance = Math.random();
        const success = roll < 0.1;
        const voreThem = voreChance < 0.15;

        if (success) {
            data.bellySize = (data.bellySize || 0) + 1;
            fs.writeFileSync(path, JSON.stringify(data, null, 4));

            return interaction.reply({
                content: `💖 Ooooh~ Naughty thing... You *do* know how to please your Goddess ${ELISE_ID_MENTION}~ My belly just grew a little rounder thanks to you~ Keep teasing, and maybe I’ll let you rub it before I make you part of it 😘`,
            });
        } else {
            if (data.swallowedUsers.find(u => u.id === user.id)) {
                return interaction.reply({ content: 'You’re already inside, darling~ My belly’s enjoying you 💕. Squirm a bit harder please darling', ephemeral: true });
            }

            if (voreThem) {
                data.swallowedUsers = data.swallowedUsers || [];
                data.swallowedUsers.push({
                    id: user.id,
                    username: user.username,
                    swallowedAt: new Date().toISOString(),
                    type: 'real'
                });

                fs.writeFileSync(path, JSON.stringify(data, null, 4));

                return interaction.reply({
                    content: `💋 Oh baby, you *really* thought that was enough to tease me?~ Pathetic. I got bored… so now you’re *mine*~ ${ELISE_ID_MENTION} just swallowed you whole 😈 Inside you go, squirm nicely for Mommy, won’t you?~`,
                });
            } else {
                return interaction.reply({
                    content: `😏 Pfft~ That tickle of a tease barely registered. You want to plump my belly, tease ${ELISE_ID_MENTION} properly next time~ Or I’ll just turn *you* into padding anyway~`
                });
            }
        }
    }
};