const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = './belly.json';
const { createEmbed } = require('../helpers/embedBuilder');
const { ELISE_ID, ELISE_ID_MENTION } = process.env;

const randomVoreImgs = [
    'https://media.discordapp.net/attachments/1093876399657451530/1361262470055989369/Snapchat-607535797.jpg',
    'https://media.discordapp.net/attachments/1093876399657451530/1359470121269329920/Snapchat-875588561.png',
    'https://cdn.discordapp.com/attachments/1093876399657451530/1363094060763578439/Snapchat-471598124.jpg?ex=6804c7c5&is=68037645&hm=e498f4c3bf0c55a13d5ad5639602e48a08871f7a21a6a52ac69f2d19f2202ee0&',
    'https://media.discordapp.net/attachments/1093876399657451530/1363439369779806399/Snapchat-446356551.jpg?ex=6806095d&is=6804b7dd&hm=97c3d4e163c23e688aea7e2c909f5022da1ceff2db974ffbbf825be6f60b025b&=&format=webp&width=1463&height=823',
    'https://cdn.discordapp.com/attachments/1093876399657451530/1366349610217635930/Snapchat-394441364.jpg?ex=68109fbc&is=680f4e3c&hm=9d145f88ee3a59252724c0d33f6542ebc3f8cd1f18b14efe5d8c119a2b49201c&'
  ];
  
  const bellyPictures = [
      'https://cdn.discordapp.com/attachments/1093876399657451530/1358746267018203136/Snapchat-1994583211.jpg?ex=67f4f692&is=67f3a512&hm=c514eb1cdc6c24d8feb7c7fadedaf8a650c442a2396f321d83d69ff3fd3cc0d9&',
      'https://cdn.discordapp.com/attachments/1093876399657451530/1358746267618115717/Snapchat-1713200016.jpg?ex=67f4f692&is=67f3a512&hm=be9ad8bd4bae83ce42035cecfd7ee1454a4b34a72621bb4002d6f3080666ae60&',
      'https://cdn.discordapp.com/attachments/1093876399657451530/1357737328541700157/Snapchat-2027329662.jpg?ex=67f496ac&is=67f3452c&hm=c054de694f17c303374df4ee53f29f4f09e4fbc5db88daea390aaf34e15d5d5c&',
      'https://cdn.discordapp.com/attachments/1093876399657451530/1358746266716340416/Snapchat-1110008326.jpg?ex=67f4f692&is=67f3a512&hm=4bdf64c3f16b600c21da59b601d3672feaf9b9ed9dc3a208eb44c3e5b81a365e&',
      'https://cdn.discordapp.com/attachments/1093876399657451530/1358746267324252241/Snapchat-1304575324.jpg?ex=67f4f692&is=67f3a512&hm=bace4afeb3ae054f6126fc27c96f3f1f4ec707f6f66a3459640693429908d2f0&',
      'https://cdn.discordapp.com/attachments/1093876399657451530/1366349610507046962/Snapchat-2139031327.jpg?ex=68109fbc&is=680f4e3c&hm=30cff518d97c202eb2f4de7007e8dcbdfdef6c2602cba809ed06ec68320daaf8&',
      'https://media.discordapp.net/attachments/1093876399657451530/1370001782574682142/Snapchat-687414354.jpg?ex=681de916&is=681c9796&hm=78ee6feb7ff5ae2cce198d8dd09fb8fa68a646589f7179174da96bdb0b1a00ba&=&format=webp&width=1463&height=823',
      
  ];

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
              randomVoreImgs[Math.floor(Math.random() * randomVoreImgs.length)],
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
              bellyPictures[Math.floor(Math.random() * bellyPictures.length)],
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