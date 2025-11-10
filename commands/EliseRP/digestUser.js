const { SlashCommandBuilder } = require('discord.js');
const { digestUser } = require('../helpers/voreHandler');
const { createEmbed } = require('../helpers/embedBuilder');
const { getRandomBellyImage } = require('../helpers/bellyImageHandler')

const MARKED_ROLE_ID = '1374755144503136277';
const DIGESTED_ROLE_ID = '1374755276510728302';
const { ELISE_ID } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('digestuser')
        .setDescription('Digest a marked mortal (Elise only)')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('User to digest')
                .setRequired(true)),

    async execute(interaction) {
        if (interaction.user.id !== ELISE_ID) {
            return interaction.reply({ content: 'Only Elise can do that 💅', ephemeral: true });
        }

        const target = interaction.options.getUser('target');
        const member = await interaction.guild.members.fetch(target.id);

        const result = await digestUser(member, MARKED_ROLE_ID, DIGESTED_ROLE_ID);

        if (result.status === 'not_marked') {
            return interaction.reply({ content: 'That user is not marked for digestion.', ephemeral: true });
        }

        let description = `"Another snack reduced to divine pudge... You’re part of my now.. You were delicous but it seems my bellys keep strechting.. \n
        Did you do something nauthgy while in there mortal? It doesnt really matter your fuel on my hips now or breast so enojoy 😘😘"`;
        if (result.secret) description += `\n\n${result.secret}`;
        const randomImage = getRandomBellyImage();

        const embed = createEmbed(
            '✨ Digested by Elise ✨',
            description,
            randomImage,
            `Part of the divine body Elise now mortal :3`
        );

        return interaction.reply({ embeds: [embed] });
    }
};