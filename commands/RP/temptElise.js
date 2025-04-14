const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './belly.json';
const { ELISE_ID } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('temptgoddess')
        .setDescription('Try to tempt Elise… but beware, she might devour you~'),

    async execute(interaction) {
        const user = interaction.user;
        const username = user.username;
        let data = { swallowedUsers: [], isTooFullOrPregnant: false };

        if(user.id === ELISE_ID) {
            return await interaction.reply({
                content: '😤 You can’t tempt yourself, silly~ Let someone else tempt you instead. If your hungry just devour someone :3'
            });
        }
        
        if (fs.existsSync(path)) {
            data = JSON.parse(fs.readFileSync(path, 'utf8'));
        }

        const flirtLines = [
            `Mmm~ That’s cute, ${username}~ But do you really think a *goddess* is so easily tempted? 💋`,
            `Oh my~ Look at you, squirming for my attention~ Shall I toy with you a bit more~? 😈`,
            `You’re practically begging for it, ${username}… But I like to play with my food first~ 💫`,
            `Tsk~ You’re lucky I’m in a *teasing* mood, not a hungry one... yet~ 😏`,
        ];

        const voreChance = Math.random();
        let response = flirtLines[Math.floor(Math.random() * flirtLines.length)];

        const alreadySwallowed = data.swallowedUsers.some(u => u.id === user.id);

        if (voreChance < 0.05 && !alreadySwallowed) {
            const voreLine = `*Too tempting to resist...* 💗 I swallowed you whole, ${username}~ Now you’re mine... squirming inside my divine tummy~ Glorp~ 💞`;
            const newEntry = {
                id: user.id,
                username,
                type: 'real',
                swallowedAt: new Date().toISOString()
            };
            data.swallowedUsers.push(newEntry);
            fs.writeFileSync(path, JSON.stringify(data, null, 4));
            response = voreLine;
        }

        await interaction.reply({ content: response });
    }
};