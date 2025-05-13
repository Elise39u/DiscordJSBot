const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './belly.json';
const { createEmbed } = require('../helpers/embedBuilder');
const { ELISE_ID } = process.env;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('confess')
    .setDescription('Confess your desire to your divine goddess. She might tease you... or devour you~')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('What would you like to confess to your goddess?')
        .setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.user;
    const confession = interaction.options.getString('message');

    if (user.id === ELISE_ID) {
      return interaction.reply({
        content: "You already *are* the divine. No need to confess to yourself, love~ 💅",
        ephemeral: true,
      });
    }

    const embedToGoddess = {
      content: `<@${ELISE_ID}> 👀 Someone dares to confess to your divine glory~`,
      embeds: [
        createEmbed(
          '💌 A Mortal’s Confession 💌',
          `**From:** ${user.username} (${user.id})\n**Confession:**\n*${confession}*`,
          null,
          'Will you tease them, devour them, or deny their pitiful little wish? 💋'
        )
      ]
    };

    await interaction.client.users.send(ELISE_ID, embedToGoddess);

    await interaction.reply({
      content: `Your words have been offered to the divine womb of Elise... May she respond soon~ ✨`
    });
  }
};