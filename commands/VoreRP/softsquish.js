const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './belly.json';
const { ELISE_ID, ELISE_ID_MENTION } = process.env;
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('softsquish')
    .setDescription('Press gently against her divine, swollen belly...'),

  async execute(interaction) {
    if (interaction.user.id === ELISE_ID) {
      return interaction.reply({
        content: `Mmm... naughty goddess~ You already know how good it feels to be this full. Let someone else worship it properly 💋`
      });
    }

    // Read current belly.json data
    let data = fs.existsSync(path)
      ? JSON.parse(fs.readFileSync(path, 'utf8'))
      : { swallowedUsers: [] };

    if(data.swallowedUsers.length === 0) {
        return interaction.reply({
            content: `Silly little snack or worshipper... My divine tummy is empty you cant squish it.. or you might want to hop in darling? I love the squirms of my snacks💋`
        });
    }   
    else {
        // Check if already inside
        const alreadyInside = data.swallowedUsers.some(u => u.id === interaction.user.id);

        if (alreadyInside) {
        return interaction.reply({
            content: `Ah~ I felt that... such a good little snack, always wriggling just right 💞 Keep squirming for mommy — every movement sends *shivers* through my divine tummy 💋`
        });
        }

        // 10% chance of devouring
        const chance = Math.random();
        if (chance <= 0.1) {
        const userData = {
            id: interaction.user.id,
            username: interaction.user.username,
            devouredAt: new Date().toISOString()
        };
        data.swallowedUsers.push(userData);
        fs.writeFileSync(path, JSON.stringify(data, null, 2));

        return interaction.reply({
            content: `You pressed against ${ELISE_ID_MENTION}’s divine belly just a *little too eagerly*... and she *wasn't amused*. Their eyes narrowed, lips curling into a wicked smile...\n\n*“If you're going to be so handsy, darling, you might as well join the rest squirming inside~”*\n\nAnd with a single gulp, you're wrapped in heat, swallowed whole — a new snack squirming in their endless, divine tummy 💋`
        });
        }

        // Normal squish response
        const embed = createEmbed(
            `💫 Squish~`,
            `You press your hands onto ${ELISE_ID_MENTION}’s divine belly... so full, so warm. It shifts beneath your touch, like a dream of gluttony and power.\n\nThey lets out a soft moan, *“Mmm~ that’s it... such gentle, worshipful hands. You really know how to make your goddess purr.”*\n\n*“But don’t get too bold now... or you might end up joining them~”*`,
            null,
            `Soft. Sacred. On the edge of sin.`
        );

            await interaction.reply({ embeds: [embed] });
        }
    }
};