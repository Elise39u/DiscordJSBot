const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const { cleanExpiredClones } = require('../helpers/bellyUtils');
const fs = require('fs');
const path = './belly.json';
const { ELISE_ID } = process.env;
const { getRandomBellyImage, getRandomVoreImage, getImageByTag } = require("../helpers/bellyImageHandler")
const bellyPictures = require('../Assets/bellyPictures.json');
const voreBellyImages = require('../Assets/voreBellyPictures.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('christmasbelly')
        .setDescription('Its Winter and Christmas is near! Wanna see who wanted to stay warm in my big divine swollen belly?')
        .addStringOption(option =>
            option.setName('tag')
                .setDescription('Optional tag like: devour or crawl')
                .addChoices(
                    { name: 'See the belly after Elise devoured someone', value: 'devour' },
                    { name: 'Want to see what Elise sees after you crawl back into their belly? 🐾', value: 'crawl' }
                ).setRequired(false)
        ),
    async execute(interaction) {
    const actingUser = interaction.user;
    const tag = interaction.options.getString('tag');

    // Read or create status file
    let data = { isTooFullOrPregnant: false, swallowedUsers: [] };

    if (fs.existsSync(path)) {
        data = JSON.parse(fs.readFileSync(path, 'utf8'));
    } else {
        fs.writeFileSync(path, JSON.stringify(data, null, 4));
    }

    // Clean expired clones
    cleanExpiredClones(data);
    let randomImage;
        if (tag) {
            randomImage = getImageByTag(voreBellyImages, tag);
                if (!randomImage) {
                    return await interaction.reply({
                        content: `❌ No image found with tag \`${tag}\`.`,
                        ephemeral: true
                    });
                }
            } else {
            randomImage = getRandomVoreImage();
        }   

    const voreBellyImage = getRandomVoreImage();

    let embed;
    
    // Check if the person already is in my divine belly :3
    if (data.swallowedUsers.some(u => u.id === actingUser.id)) {
        embed = createEmbed(
            '💋 Already Inside 💋',
            `Sooo full and soo round and so heavy.. Come on darling squirm for mommy and be a good little obiedent snack.. You know you like being in my big swollen round divine belly~ 💖`,
            randomImage,
            '🔮 Elise swalloed you whole.. You needy, horny little snack.  🔮'
        );
    } else {
        const isLewd = Math.random() < 0.05;
        const shouldDevour = Math.random() < 0.10;

        if(shouldDevour) {
            if(actingUser.id === ELISE_ID) {
                return interaction.reply({
                    content: "Silly goddess if your hungry.. Just devour someone with `/devourme:target` 💋",
                    ephemeral: true
                });
            } else {
                data.swallowedUsers.push({
                    id: actingUser.id,
                    username: actingUser.username,
                    isClone: false,
                    devouredAt: new Date().toISOString()
                });
                fs.writeFileSync(path, JSON.stringify(data, null, 4));


                embed = createEmbed(
                    '💞 Gulp and devoured by Elise.... 💞',
                    `Sooo darling.. Your so needy and horny and your Goddess Elise just can tell it the way you drip with curiosity \n 
                    Mmm... You teased me so much with that horny little look at my big divine swollen belly. You just couldn't resist it anymore, could you? \n
                    I couldnt help myself darling. I felt peckish and you looked absolutely delicious.. So an hungry fertilty goddess had to do what an hungry fertility goddess has to do~ \n
                    No be a good snack for mommy and actively squirm in my big divine swollen belly~ 💖 Mommy likes it when they can feel her snacks squirm.
                    It does bring a bit of plessure knowing you like my big divine swollen belly so much you just had to be part of it~ 💋`,
                    voreBellyImage,
                    '🔮 Devoured by the big swollen fertilty goddess Elise. 🔮'
                );
            }
        } else {
                const description = `
                    Well well.. You ponderd cutie? Who wanted to stay warm in my big divine swollen belly this cold winter?
                    Well lets say i do offer devouring services to those who are *very* curious about what its like inside my divine belly~ 💖
                    And see i have a few customers right now who are just loving it in there~. Can you hear them squirming and having fun? Mommy surely love it when their snacks squirm for them.
                    So darling you can look and can feel my big divine swollen belly. But one wrong move and your going right in there with them~ 💋
                `;
                const lewdDescription = `
                    Oh my darling you naughty little snack~ 💖. The way you rub my belly carress it i can feel you really like it and admire it.
                    Can you feel them squirming. Some are in their on their own free will and others.. Well lets say mommy had just to do what an hungry fertility goddess has to do~ 💋 
                    You really like my big divine swollen belly dont you~. You just cant resist it can you~. Mmm.. Such a horny little snack~ I can basically feel your desire to get in. 
                    Now darling since you know how to plessure mommy that well. I perhaps give in into your desires to get in my big, swollen, squirming active divine belly~ 💞.
                    But be aware darling.. Misbehave and mommy will have to show you how *real* fun in my divine belly is~ 🔮 But be a good snack and you perhaps never want to leave sweetie.
                    Now want to be swolled or crawl in like the good obiedent snack you are for mommy~? 💋
                `;

                embed = createEmbed(
                    `🎀 Elise their big, swollen, snack filled belly🎀`,
                    isLewd ? lewdDescription : description,
                    randomImage,
                    '🎀 Elise had a snack or 2 or 3.  🎀'
                );
            }
        }

        await interaction.reply({ embeds: [embed] });
    },
};
