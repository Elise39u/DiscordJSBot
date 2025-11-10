const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const { cleanExpiredClones } = require('../helpers/bellyUtils');
const fs = require('fs');
const path = './belly.json';
const { ELISE_ID } = process.env;
const { getRandomVtuberImage, getVtuberImageByURl, getRandomVoreImage, getImageByTag } = require("../helpers/bellyImageHandler")
const vtuberPictures = require('../Assets/vtuberPictures.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('preggovtuber')
        .setDescription('Want a glorius pic of my divine pregnant body. Perhaps my swollen belly or big divine breast?')
        .addStringOption(option =>
            option.setName('tag')
                .setDescription('Optional tag like: color or type of clothing')
                .addChoices(
                    { name: 'vtuber', value: 'vtuber' },
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
            randomImage = getImageByTag(vtuberPictures, tag);
                if (!randomImage) {
                    return await interaction.reply({
                        content: `❌ No image found with tag \`${tag}\`.`,
                        ephemeral: true
                    });
                }
            } else {
            randomImage = getRandomVtuberImage();
        }   

    const voreBellyImage = getRandomVoreImage();
    const vtuberPicInfo = getVtuberImageByURl(randomImage);
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
        const isLewd = Math.random() < 0.1;
        const shouldDevour = Math.random() < 0.05;

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
                    `Oh look at that. An new dripping mortal curisou to look at this divine goddess. I can see you dripping thinking how round and big and swollen i would be
                    But as all your humans are.. that weakness is the perfect trap. Now you were so tempted to not swallow you whole and let you go dalring ~
                    *GULP* *Burp* Mmm~ Delicious as always my little snack. You will make a perfect addition to my divine belly~ 💋
                    What is that snack? You dindt wanted to be devoured? Oh well.. you should have thought about that before you came to admire my divine body~
                    And wish me to see me big, round, swollen belly~ 😘. So be a good snack for mommy and squirm a bit
                    Mommy loves to feel her snacks squirming inside her divine belly~`,
                    voreBellyImage,
                    '🔮 Devoured and divine 🔮'
                );
            }
        } else {
                const description = `
                    Mmm~ Hello there darling you wish to see your big swollen divne goddess is it huh?
                    Well you are in luck today darling? For you i would quickly swell my big belly up for you to admire~ 
                    Or perhaps you want to have a little taste of my divine big breast as well?
                    Just imagine a little drink from them or a soft litlt cuddle against them as they press against you~ 
                    I can see you drippling just thinking about it arent you~
                `;
                const lewdDescription = `
                    Oh so needy and so dripping. I can feel you senstion by just standing there darling~
                    Admit it you want to touch my big swollen divine pregnant belly? Or perhaps have a little taste of my big juicy breast~
                    Mmm~ You humans are so cute and adorable when your horny arent you~💋
                    Just imagine this big divne belly agianst you squriming with snacks i devour or a little sip from my big juicy breast~
                    You want it dalring dont you~ well im in a good mood today so 😘 perhaps i will let you have a little taste~
                    But misbehave and you might just join the snacks in my swollen big divne belly~💞
                `;

                embed = createEmbed(
                    `🎀 Elise and their divine goddess body 🎀`,
                    isLewd ? lewdDescription : description,
                    randomImage,
                    '🎀 ' + vtuberPicInfo._comments + ' with an big swollen divine belly and breast 🎀 '
                );
            }
        }

        await interaction.reply({ embeds: [embed] });
    },
};
