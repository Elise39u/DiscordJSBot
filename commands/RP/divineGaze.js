const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './belly.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('divinegaze')
        .setDescription('Elise gazes into your soul… and your fate~'),

    async execute(interaction) {
        const user = interaction.user;
        const username = user.username;

        let data = { swallowedUsers: [] };

        if (fs.existsSync(path)) {
            data = JSON.parse(fs.readFileSync(path, 'utf8'));
        }

        const isInside = data.swallowedUsers.some(u => u.id === user.id);

        let response;

        if (isInside) {
            // User has been devoured
            const preyLines = [
                `Ahh~ Still squirming, ${username}? I *do* love how you wiggle inside~ 💋`,
                `You look so helpless in there… and I *adore* it~ Stay warm, my little morsel~ 💞`,
                `I see you~ Pressed against my belly walls~ Don’t bother begging now… You’re *mine*~ 😘`,
                `Your soul is glowing inside me, ${username}~ Tastes like surrender~ 💗`
            ];
            response = preyLines[Math.floor(Math.random() * preyLines.length)];
        } else {
            // Not devoured yet
            const gazeLines = [
                `My gaze sees *everything*, ${username}~ I know what you crave... Shall I grant it~? 😈`,
                `You stand before a goddess, trembling~ Ready to be claimed? 💋`,
                `Don’t act so shy~ I can feel your desire from here~ I could make you mine with a whisper…`,
                `Your aura is flickering~ So close to breaking~ Want me to push you over the edge~? 💞`
            ];
            response = gazeLines[Math.floor(Math.random() * gazeLines.length)];
        }

        await interaction.reply({ content: response });
    }
};