const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const fs = require('fs');
const path = './belly.json';
const { createEmbed } = require('../helpers/embedBuilder');
const { ELISE_ID } = process.env;

const randomIMGs = [
  'https://media.discordapp.net/attachments/1093876399657451530/1361262470055989369/Snapchat-607535797.jpg?ex=67fe1df7&is=67fccc77&hm=d8fd6376a8aaae3ceebb00efdd6434bf460b4cb491463ec5abd2b918dbeb1bd3&=&format=webp&width=1463&height=823',
  'https://media.discordapp.net/attachments/1093876399657451530/1359470121269329920/Snapchat-875588561.png?ex=67f798b6&is=67f64736&hm=dab90d897c69b40d886ad3760c024cd48b405976f0b2ad3aa59acc7e35045747&=&format=webp&quality=lossless&width=1463&height=823'
];

  module.exports = {
    data: new SlashCommandBuilder()
      .setName('beg')
      .setDescription('Beg your goddess to be devoured and taken deep inside her warm, dominant embrace 💋'),
  
    async execute(interaction) {
      const beggingUser = interaction.user;
  
      if (beggingUser.id === ELISE_ID) {
        return interaction.reply({
          content: 'Oh sweetie, you’re the one doing the devouring, not the begging 💅',
          ephemeral: true,
        });
      }
  
      let bellyData;
      try {
        bellyData = JSON.parse(fs.readFileSync(path, 'utf8'));
      } catch (err) {
        console.error('Error reading belly.json:', err);
        return interaction.reply({
          content: 'Oops~ Something went wrong with my divine belly... 💔',
          ephemeral: true,
        });
      }
  
      const alreadySwallowed = bellyData.swallowedUsers.find(u => u.id === beggingUser.id);
      if (alreadySwallowed) {
        return interaction.reply({
          content: `You're already nestled deep inside me, squirming adorably~ 💖`,
          ephemeral: true,
        });
      }
  
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('accept_beg')
          .setLabel('Devour them 💋')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId('deny_beg')
          .setLabel('Deny them 💅')
          .setStyle(ButtonStyle.Secondary)
      );
  
      await interaction.reply({
        content: `*${beggingUser.username}* is on their knees... begging to be swallowed whole~\n<@${ELISE_ID}>, will you indulge them?`,
        components: [row],
      });
  
      const replyMessage = await interaction.fetchReply();
  
      const collector = replyMessage.createMessageComponentCollector({
        componentType: ComponentType.Button,
        time: 60_000, // 1 minute
      });
  
      collector.on('collect', async (buttonInteraction) => {
        if (buttonInteraction.user.id !== ELISE_ID) {
          return await buttonInteraction.reply({
            content: "Tsk tsk~ Only the goddess can decide their fate, darling 💄",
            ephemeral: true,
          });
        }
  
        if (buttonInteraction.customId === 'accept_beg') {
          const swallowedUser = {
            id: beggingUser.id,
            username: beggingUser.username,
            isClone: false,
            devouredAt: new Date().toISOString(),
          };
  
          bellyData.swallowedUsers.push(swallowedUser);
  
          try {
            fs.writeFileSync(path, JSON.stringify(bellyData, null, 2));
          } catch (err) {
            console.error('Failed to update belly.json:', err);
            return buttonInteraction.reply({
              content: 'I tried to swallow them... but something got in my way 💢',
              ephemeral: true,
            });
          }
  
          const imgLink = randomIMGs[Math.floor(Math.random() * randomIMGs.length)];
          const embed = createEmbed(
            `💖 Mmm~ Another tasty treat~ 💖`,
            `You begged so sweetly, ${beggingUser.username}... How could I resist?\nNow you're mine~ curled up deep inside my warm, greedy belly 💋`,
            imgLink,
            `✨ You look so deliciously round inside me ✨`,
            '#FF69B4'
          );
  
          await buttonInteraction.update({
            content: '',
            embeds: [embed],
            components: [],
          });
        }
  
        if (buttonInteraction.customId === 'deny_beg') {
          await buttonInteraction.update({
            content: `*Tsk tsk~* Not today, little morsel 💅\n<@${beggingUser.id}>, you'll have to squirm a little harder to earn your place inside me~`,
            components: [],
          });
        }
  
        collector.stop();
      });
  
      collector.on('end', async (_, reason) => {
        if (reason === 'time') {
          try {
            await interaction.editReply({
              content: `Time's up, ${beggingUser.username}~ Your chance has slithered away 💋`,
              components: [],
            });
          } catch {}
        }
      });
    },
  };