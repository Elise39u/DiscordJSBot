const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = './belly.json';
const { createEmbed } = require('../helpers/embedBuilder');
const { ELISE_ID, ELISE_ID_MENTION } = process.env;
const { getRandomBellyImage, getRandomVoreImage} = require("../helpers/bellyImageHandler");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hormonsurge')
    .setDescription('Beg the hormonal, pregnant goddess for attention… if you dare~')
    .addStringOption(option =>
      option.setName('plea')
        .setDescription('What are you begging the goddess for?')
        .setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.user;
    const plea = interaction.options.getString('plea');
    const targetId = user.id;

    if (user.id === ELISE_ID) {
      return interaction.reply({
        content: `You're the one making mortals beg, not the one *doing* it 💅`,
        ephemeral: true
      });
    }

    // Embed showing the hormonal tease + user plea
    const embed = createEmbed(
      `💥 ${user.username} Begs for Your Hormonal Favor 💥`,
      `${ELISE_ID_MENTION}, ${user} is trembling in front of your swollen, hormonal glory~\n\n**Their Plea:**\n> *${plea}*`,
      null,
      `Will you indulge them... or devour them whole~?`
    );

    // Create response buttons
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`devour_${targetId}`)
        .setLabel('Devour Them')
        .setStyle(ButtonStyle.Danger),

      new ButtonBuilder()
        .setCustomId(`reject_${targetId}`)
        .setLabel('Reject')
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId(`let_${targetId}`)
        .setLabel('Let Them Speak')
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId(`impreg_${targetId}`)
        .setLabel('Impregnate Me~')
        .setStyle(ButtonStyle.Success)
    );

    await interaction.reply({
      content: `${ELISE_ID_MENTION}, you've got a little worshipper...`,
      embeds: [embed],
      components: [row]
    });
  },

  async handleButton(interaction) {
    const [action, targetId] = interaction.customId.split('_');

    const member = await interaction.guild.members.fetch(targetId);
    if (!member) {
      return interaction.reply({ content: 'They’re already gone~', ephemeral: true });
    }

    switch (action) {
          case 'devour': {
            let data = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, 'utf8')) : { swallowedUsers: [] };
            const alreadyInBelly = data.swallowedUsers.find(u => u.id === targetId);
    
            if (!alreadyInBelly) {
              data.swallowedUsers.push({
                id: targetId,
                username: member.user.username,
                devouredAt: new Date().toISOString()
              });
              fs.writeFileSync(path, JSON.stringify(data, null, 2));
            }
    
            const voreEmbed = createEmbed(
              `💖 Devoured by the Fertile Goddess 💖`,
              `*Mmmph~* You begged, you whined... *Gulp* and now you’re curled up in my belly like the meal you are~\n\nYou’ll squirm there until I decide you're padding, plaything~ ${member}`,
              getRandomVoreImage(),
              `So round… So divine~`
            );
    
            await interaction.update({
              content: `A decision has been made~`,
              embeds: [voreEmbed],
              components: []
            });
            break;
          }
    
          case 'reject': {
            await interaction.update({
              content: `Rejected~ 😏`,
              embeds: [{
                title: '🙄 Denied by Your Goddess 🙄',
                description: `Please~ That little plea barely stirred my mood-swollen belly.\nTry again when you're actually *enticing*, ${member}.`,
                color: 0xFF69B4
              }],
              components: []
            });
            break;
          }
    
          case 'let': {
            await interaction.update({
              content: `Permission granted~`,
              embeds: [{
                title: '🗣️ You May Speak, Toy~',
                description: `My mood is tender... for now. Go ahead and beg, ${member}—but don’t bore me.\nOne wrong word and you’ll be *inside* me next~ 😈`,
                color: 0xFFC0CB
              }],
              components: []
            });
            break;
          }
    
          case 'impreg': {
            const embed = createEmbed(
              `💦 You earned the honor of impregnantion or an attempt at it 💦`,
              `Mmm~ You were *just* useful enough to earn a place in my womb or try to toy. Within a whole new way~\nNow look at this belly... could your gift swell its this big?~\nMaybe you’ll give me a bigger one... or maybe I'll make you rub it while you watch me swell bigger\n Well you and me have some fun dont be afraid darling. Sex is not that scarry~`,
              getRandomBellyImage(),
              `✨ You made Mommy even rounder~ ✨`
            );
    
            await interaction.update({
              content: `A fertile fate has been chosen~`,
              embeds: [embed],
              components: []
            });
            break;
          }
        }
  }
};