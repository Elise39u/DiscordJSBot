const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './harem.json';
const { ELISE_ID } = process.env;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('markpet')
    .setDescription('Claim someone as your loyal pet~')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The one you wish to claim as your pet')
        .setRequired(true)
    ),

  async execute(interaction) {
    if (interaction.user.id !== ELISE_ID) {
      return interaction.reply({
        content: `Only the divine goddess herself can decide who joins her harem~ 💅`,
        ephemeral: true
      });
    }

    const target = interaction.options.getUser('target');

    if (target.id === ELISE_ID) {
      return interaction.reply({
        content: `Trying to mark yourself? Silly goddess~ You already own *everyone*. 😈`,
        ephemeral: true
      });
    }

    let data = fs.existsSync(path)
      ? JSON.parse(fs.readFileSync(path, 'utf8'))
      : { harem: [], mates: [] };

    if (data.harem.includes(target.id)) {
      return interaction.reply({
        content: `*Tch~* <@${target.id}> is **already** marked as your pet, remember? Once mine, always mine~ 💋`,
        allowedMentions: { users: [] }
      });
    }

    data.harem.push(target.id);
    fs.writeFileSync(path, JSON.stringify(data, null, 2));

    await interaction.reply({
      content: `Come here, <@${target.id}>... 🐾\n\n*“Good pet.”* she purrs, fingers curling under your chin as she marks you with a soft, glowing sigil.\n\n*“You’re mine now. Crawl if you must — but never wander. My scent will linger on your soul~”* 😈`,
      allowedMentions: { users: [target.id] }
    });
  }
};