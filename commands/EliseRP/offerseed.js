const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require('discord.js');
const fs = require('fs');
const path = './belly.json';
  const { ELISE_ID, ELISE_ID_MENTION } = process.env;
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName('offerseed')
      .setDescription('Offer your seed to her divine, fertile womb and hope she accepts it...'),
  
    async execute(interaction) {
      if (interaction.user.id === ELISE_ID) {
        return interaction.reply({
          content: `You’re the goddess, my queen~ You don’t *offer* seed... you *demand* it 😈`,
          ephemeral: true,
        });
      }
  
      const embed = new EmbedBuilder()
        .setTitle('🌺 A Goddess’ Craving...')
        .setDescription(`**${interaction.user.username}** kneels, eyes wide, heart pounding. Before them stands ${ELISE_ID_MENTION} — glowing with divine heat, her belly *not yet swollen*, her mood *dangerously needy*...\n\nShe sighs, hand brushing her untouched tummy with a pout.\n\n*“Tch... I’m so empty. I hate it.”*\n\nThen, her gaze sharpens:\n\n*“You’re offering that little seed of yours?”* Her lips curl into a smirk. *“It better be enough to make this belly swell the way I crave... or else I’m going to be very, very displeased~”*\n\nShe leans closer, whispering...\n*“Let’s see if you’re worth the honor.”* 💋`)
        .setImage('https://media.discordapp.net/attachments/1093876399657451530/1359470121269329920/Snapchat-875588561.png')
        .setColor(0xff3366)
        .setFooter({ text: 'Moody. Needy. Divine.' });
  
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`acceptseed-${interaction.user.id}`)
          .setLabel('💦 Accept Seed')
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId(`denyseed-${interaction.user.id}`)
          .setLabel('🙄 Deny Seed')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
         .setCustomId(`devourseed-${interaction.user.id}`)
         .setLabel('😈 Devour Instead')
         .setStyle(ButtonStyle.Danger)
      );
  
      await interaction.reply({ embeds: [embed], components: [row] });
  
      const filter = (i) =>
        i.user.id === ELISE_ID && i.customId.endsWith(`-${interaction.user.id}`);
  
      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: 60000,
      });
  
      collector.on('collect', async (i) => {
        const choice = i.customId.split('-')[0];
  
        if (choice === 'acceptseed') {
            await interaction.update({
                content: `Mmm~ You’re truly eager, aren’t you, <@${user.id}>?~ 💋
              
              *The goddess hums, her soft divine belly rising with each breath, her eyes glinting with decadent approval.*  
              "I suppose you may offer your seed… Just you and me now, a private moment for something **sacred**, deliciously personal. My body... is ready to be claimed."
              
              *She traces a finger across her plush tummy, smirking with that goddess hunger...*  
              "Make me swell, my sweet thing. Let’s see if you’re worthy of planting something divine inside me~"
              
              **A one-on-one blessing is about to begin.** 🌸
              
              But don’t forget: if you disappoint… mommy might just swallow you whole instead~ 😈`,
                components: [],
                allowedMentions: { users: [user.id] }
              });
        }
  
        if (choice === 'denyseed') {
          await i.update({
            content: `*Ugh...* She rolls her eyes.\n\n*“That? You think that pathetic little offering could satisfy a goddess like me?”*\n\nShe turns away with a dismissive wave.\n*“Come back when you’re actually worthy of filling this womb.”* 😒`,
                components: [],
                allowedMentions: { users: [user.id] }
          });
        }

        if (choice === 'devourseed') {
            // Load belly.json
            let data = fs.existsSync(path)
              ? JSON.parse(fs.readFileSync(path, 'utf8'))
              : { swallowedUsers: [] };
    
            // Check if already inside
            const alreadyInside = data.swallowedUsers.some(u => u.id === user.id);
            if (alreadyInside) {
              return i.update({
                content: `*Oh? Still squirming in there, are we?~* Mommy’s belly remembers every *wiggle*... Don’t think I’ve forgotten you 💖`,
                components: [],
                allowedMentions: { users: [user.id] },
              });
            }
    
            // Add them to belly.json
            data.swallowedUsers.push({
              id: user.id,
              username: user.username,
              devouredAt: new Date().toISOString(),
            });
            fs.writeFileSync(path, JSON.stringify(data, null, 2));
    
            await i.update({
              content: `*Tch... you really thought that would please me?*\n\nHer gaze darkens.\n\n*“Pathetic.”* She lunges forward with a cruel grin.\n\nBefore you can react, the world goes dark — her divine lips sealing your fate. You’re swallowed whole, entombed in the soft, sacred depths of her needy womb.\n\n*“There. Much better. Now stay there and squirm, little disappointment~”* 🤰💫`,
              components: [],
              allowedMentions: { users: [user.id] },
            });
          }
      });
    },
  };