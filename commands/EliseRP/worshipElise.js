const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder} = require('discord.js');
const fs = require('fs');
const path = './belly.json';
const { ELISE_ID, ELISE_ID_MENTION } = process.env;
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('worshipbelly')
    .setDescription('Fall to your knees and worship Elise’s divine belly'),

  async execute(interaction) {
    if (interaction.user.id === ELISE_ID) {
      return interaction.reply({
        content: `You can’t worship your *own* divine belly, silly goddess 😏 Let them squirm and serve properly.`
      });
    }

    const embed = createEmbed(
      `👑 Worship the Goddess`,
      `You lower yourself in reverence before ${ELISE_ID_MENTION}’s towering, fertile form. They loom on to you, looking with a rasied eye as they pet their empty belly.\n\nThey giggles, *“Aint i just divine? Go on, tell mommy how much you adore every inch of them... or would you rather be part of it and get swalloed?”* \n\n Dont be afraid and tell mommy what you want`,
      'https://cdn.discordapp.com/attachments/123456789/example.png',
      `Revered. Divine. Ready to be pleased... or not.`
    );
    
    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`good_snack-${interaction.user.id}`)
          .setLabel('💕 Good Snack')
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId(`annoyed-${interaction.user.id}`)
          .setLabel('😒 Annoyed')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId(`reject-${interaction.user.id}`)
          .setLabel('❌ Reject')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId(`devour-${interaction.user.id}`)
          .setLabel('👅 Devour')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId(`offer_seed-${interaction.user.id}`)
          .setLabel('🍆 Offer Seed')
          .setStyle(ButtonStyle.Secondary)
      );
  
      await interaction.reply({ content: `${ELISE_ID_MENTION}`, embeds: [embed], components: [row] });

      const filter = (i) =>
        i.user.id === ELISE_ID && i.customId.endsWith(`-${interaction.user.id}`);
      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: 60000,
      });
  
      collector.on('collect', async (i) => {
        const choice = i.customId.split('-')[0];
        let data = fs.existsSync(path)
          ? JSON.parse(fs.readFileSync(path, 'utf8'))
          : { swallowedUsers: [] };
  
        const alreadyInside = data.swallowedUsers.some((u) => u.id === interaction.user.id);
  
        switch (choice) {
          case 'good_snack':
            return i.update({
              content: `*Mmm~ such a good little thing.* Every touch sends shivers through my belly. Keep that up and I might just *reward you* later... 💞`,
              embeds: [], 
              components: [] 
            });
  
          case 'annoyed':
            return i.update({
              content: `*Tch...* You call that worship? My belly deserves better. One more slip and you’ll be churned like the rest 😈`,
              embeds: [], 
              components: [] 
            });
  
          case 'reject':
            return i.update({
              content: `*Ugh... no.* You're not even worth licking off my heel. Crawl away before I change my mind, little pest.`,
              embeds: [], 
              components: [] 
            });
  
          case 'devour':
            if (alreadyInside) {
              return i.update({
                content: `They're already wriggling inside your divine tummy~ Let them squirm a while longer~ 💋`,
                embeds: [], 
                components: [] 
              });
            }
  
            data.swallowedUsers.push({
              id: interaction.user.id,
              username: interaction.user.username,
              devouredAt: new Date().toISOString(),
            });
  
            fs.writeFileSync(path, JSON.stringify(data, null, 2));
  
            return i.update({
              content: `*You reached out... and I opened wide~* One *gulp* and you're sealed away inside my divine belly, a new squirming treat in my sacred womb. Be a good snack now... or I might digest you 😏💖`,
              embeds: [], 
              components: [] 
            });
  
          case 'offer_seed':
            return i.update({
              content: `*Oh?* Feeling brave? Mmm~ Maybe I'll *let you* offer your seed to my divine womb... if you beg prettily enough 💋`,
              embeds: [], 
              components: [] 
            });
  
          default:
            return i.update({
              content: `I don’t recognize that offering. Try again, little snack.`,
              embeds: [], 
              components: [],
              ephemeral: true,
            });
        }
      });
  }
};