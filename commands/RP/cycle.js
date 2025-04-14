const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const fs = require('fs');
const path = './belly.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cycle')
        .setDescription('Check Elise’s divine mood, fertility, and hunger~'),
    async execute(interaction) {
        if (!fs.existsSync(path)) {
            return interaction.reply('No cycle has been set yet~');
        }

        const data = JSON.parse(fs.readFileSync(path, 'utf8'));
        const fertility = data.fertilityCycle || 'unknown';
        const mood = data.moodCycle || 'unknown';
        const voreMood = data.voreMood || 'unknown';

        // Flavor message mappings
        const fertilityMessages = {
            ovulating: "🔥 The air is thick with desire… Elise’s womb pulses with divine heat, practically begging to be filled~",
            fertile: "🌸 The goddess is ripe and receptive — a single touch might be all it takes to be claimed by her~",
            breedingheat: "💦 She's burning in full breeding heat… Approach with caution unless you *want* to be made hers~",
            infertile: "❄️ The garden lies dormant... but don't be fooled, she still has ways of making you squirm~",
            resting: "😴 Elise lounges in serenity, her divine womb calm… for now~"
        };

        const moodMessages = {
            dominant: "👑 Her aura demands obedience. Every glance, every word — dripping in control. Submit or be claimed~",
            teasing: "😏 A coy smile plays on her lips… every word a dance of seduction. She *knows* you want her to play with you~",
            moody: "🌩️ Her mood shifts like a storm — thrilling, unpredictable. You might get a kiss... or swallowed whole~",
            lustful: "💋 Her eyes burn with need. The kind of need that doesn’t ask — it *takes*~",
            hungry: "👅 She licks her lips and stares you down. You’re not a guest — you’re a snack waiting for digestion~",
            serene: "🌙 Calm and soft like moonlight — but still divine. Even in peace, she reigns~",
            neutral: "🔮 She’s simply watching… waiting. But every goddess has her moment~"
        };

        const voreMoodMessages = {
            starving: "😈 Her belly growls audibly... You better run. Or don’t. She loves it when you squirm~",
            playful: "🎲 She circles you slowly, grinning. 'Wanna play a game? The loser goes in~'",
            possessive: "💞 She wants you *inside*, safe and claimed. Once you’re hers, there’s no escape~",
            stuffed: "🍽️ So full… yet she eyes you like dessert. There's always room for just *one* more~",
            digesting: "🔥 Gurgles echo from her belly… She smirks. 'They’re being broken down nicely~ Want a preview?'",
            gentle: "🌷 You’ll be swallowed in warmth, cuddled by her insides. Loving, tender... and oh-so-final~"
        };

        const embed = createEmbed(
            `🌙 Elise’s Divine Cycle 🌙`,
            `**Fertility:** \`${fertility}\`\n${fertilityMessages[fertility] || 'Her divine state is unreadable...'}\n\n` +
            `**Mood:** \`${mood}\`\n${moodMessages[mood] || 'Her divine mind is a mystery~'}\n\n` +
            `**Vore Mood:** \`${voreMood}\`\n${voreMoodMessages[voreMood] || '...Silence. But that might be more dangerous~'}`,
            null,
            'Worship wisely… or risk getting much, much closer~ 💋',
            '#FF69B4'
        );
        await interaction.reply({ embeds: [embed] });
    }
};