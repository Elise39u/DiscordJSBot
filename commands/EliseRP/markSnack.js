const { SlashCommandBuilder } = require('discord.js');
const { markUser } = require('../helpers/voreHandler');
const { createEmbed } = require('../helpers/embedBuilder');
const { getRandomVoreImage } = require('../helpers/bellyImageHandler')

const MARKED_ROLE_ID = '1460774038069706900';
const { ELISE_ID } = process.env;


module.exports = {
    data: new SlashCommandBuilder()
        .setName('marksnack')
        .setDescription('Elise marks a snack in their belly for Hmmm (Elise only)')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('User to mark')
                .setRequired(true)),

    async execute(interaction) {
        if (interaction.user.id !== ELISE_ID) {
            return interaction.reply({ content: 'Only Elise can do that 💅', ephemeral: true });
        }

        const target = interaction.options.getUser('target');
        const member = await interaction.guild.members.fetch(target.id);

        const result = await markUser(member, MARKED_ROLE_ID);

        if (result.status === 'already_marked') {
            return interaction.reply({ content: 'Silly goddess if you want room in you belly. Digest them they are already marked😘.', ephemeral: true });
        }

        let description = `"Oh you silly snack 💅 You thought you could misbehave in that swollen belly of mine. Consider this a formal warning snack. 😘
        I dont take lighty on snacks that misbehave in my belly. ✨ Next time you wouldnt be nothing more then divine puddle for my breast or ass 😈.
        So be warned snack and dont dissapoint me again 😈😘"`;
        if (result.secret) description += `\n\n${result.secret}`;
        const randomImage = getRandomVoreImage();

        const embed = createEmbed(
            '✨ Marked by Elise ✨',
            description,
            randomImage,
            `Beaware next time your gonne be fule for their body`
        );

        return interaction.reply({ embeds: [embed] });
    }
};