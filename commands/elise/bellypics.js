const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const { cleanExpiredClones } = require('../helpers/bellyUtils');
const fs = require('fs');
const path = './belly.json';
const { ELISE_ID } = process.env;
const { getRandomBellyImage, getRandomVoreImage, getImageByTag } = require("../helpers/bellyImageHandler")
const bellyPictures = require('../Assets/bellyPictures.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bellypics')
        .setDescription('I see your looking at my glorious divine belly')
        .addStringOption(option =>
            option.setName('tag')
                .setDescription('Optional tag like: color or type of clothing')
                .addChoices(
                    { name: 'red', value: 'red' },
                    { name: 'blue', value: 'blue' },
                    { name: 'shirt', value: 'shirt' },
                    { name: 'materiny_clothing', value: 'materiny_clothing' },
                    { name: 'blouse', value: 'blouse' },
                    { name: 'natrual_belly', value: 'natrual_belly' },
                    { name: 'pink', value: 'pink' },
                    { name: 'jogging', value: 'jogging' },
                    { name: 'big_belly', value: 'big_belly' },
                    { name: 'polka_dot', value: 'polka_dot' },
                    { name: 'sweater', value: 'sweater' },
                    { name: 'small_belly', value: 'small_belly' },
                    { name: 'purple', value: 'purple' },
                    { name: 'gray', value: 'gray' },
                    { name: 'lilya', value: 'lilya' },
                    { name: 'kimono', value: 'kimono' },
                    { name: 'green', value: 'green' },
                    { name: 'black_band', value: 'black_band' },
                    { name: 'cyan', value: 'cyan' },
                    { name: 'black', value: 'black' },
                    { name: 'loose_shirt', value: 'loose_shirt' },
                    { name: 'white', value: 'white'},
                    { name: "dress", value: "dress"}
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
            randomImage = getImageByTag(bellyPictures, tag);
                if (!randomImage) {
                    return await interaction.reply({
                        content: `❌ No image found with tag \`${tag}\`.`,
                        ephemeral: true
                    });
                }
            } else {
            randomImage = getRandomBellyImage();
        }   

    const voreBellyImage = getRandomVoreImage();

    let embed;
    
    // Check if the person already is in my divine belly :3
    if (data.swallowedUsers.some(u => u.id === actingUser.id)) {
        embed = createEmbed(
            '💋 Already Inside 💋',
            `Mmm~ I can still feel you squirming in there, You know i like the little kicks you give me.. Once inside you never want to get out because you like pleasing your goddess dont you?. 💞`,
            randomImage,
            '🔮 Claimed by the goddess 🔮'
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
                    `Elise wrapped their arms around you and smirked when they softly whisperd to you \n
                    You loved my pregnant belly so much that you kept temping me a bit too much and you look so delicous \n
                    So be a good little snack and just sit still for a moment this preggo is hungry. Without a notice Elise gulps you down her throat and you land in their belly \n
                    *You hear some muffed sounds coming from outside as you can clear feal Elise rub their belly.* Elise: You though you little snack that you could pat my belly. \n
                    You temptd this goddess so much that i just gulped you down and devoured you.. These little snacks never learn to be hoenst. \n
                    You were delicous and  a bit too sad to devour you but, ohhh im really big and heavy now... Be a good snack and squirm for mommy and i might have some plessure with you.. If you behave good snack.. Now squirm for mommy. 💖`,
                    voreBellyImage,
                    '🔮 Devoured and divine 🔮'
                );
            }
        } else {
                const description = `
                    Well, well... look who wandered in, dripping with curiosity. No need to hide it—your indulgent mommy goddess allows such needy little mortals to admire her. 
                    Come closer now, don't be shy. Give my big, swollen divine belly a nice rub. I don’t bite… unless you give me a reason to, darling~ 
                    And if you’re not careful, well… let’s just say I’m feeling a bit *peckish*, and you look absolutely delicious. 😘
                `;
                const lewdDescription = `
                    Oh~ So eager, aren't you? Staring at my divine belly like you *want* to be part of it. 
                    You could be rubbing from the outside now, but just imagine how much *tighter* and *warmer* it is inside… 
                    Keep tempting me, sweetheart, and I might just make you disappear *where you truly belong*. 💋
                `;

                embed = createEmbed(
                    `🎀 Elise and her divine belly 🎀`,
                    isLewd ? lewdDescription : description,
                    randomImage,
                    '🎀 Stellar genesis womb 🎀'
                );
            }
        }

        await interaction.reply({ embeds: [embed] });
    },
};
