const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const { ELISE_ID } = process.env;
const fs = require('fs');
const path = './belly.json';
const { cleanExpiredClones } = require('../helpers/bellyUtils');
const { markUser, digestUser } = require('../helpers/voreHandler');
const pregnantPictures = require('../Assets/pregnantPictures.json');
const { getRandomPregnantPicture, getRandomVoreImage, getImageByTag } = require('../helpers/bellyImageHandler');

const MARKED_ROLE_ID = '1460774038069706900';
const DIGESTED_ROLE_ID = '1460774040204607684';
const ALLOWED_ROLE_IDS = ['813835682124529665', '1354084372847923343', '1256658955107565568', '699558391894507620'];
const ALLOWED_CHANNEL_IDS = ['1370319140388343849', '1354767714953990215', '859788500114210826'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('preggypic')
        .setDescription('A special glimpse of your divine swollen goddess~')
        .addStringOption(option =>
            option.setName('tag')
                .setDescription('Optional tags like: big_belly or small_belly')
                .addChoices(
                    { name: 'small_belly', value: 'small_belly' },
                    { name: 'big_belly', value: 'big_belly' },
                    { name: 'pregnancy', value: 'pregnancy' },
                ).setRequired(false)
        ),

    async execute(interaction) {
    const normalColor = '#FFC0CB'; // Soft Pink
    const secretColor = '#E0115F'; // Deep Ruby/Hot Pink
        const tag = interaction.options.getString('tag');
        const user = interaction.user;
        const member = await interaction.guild.members.fetch(user.id);
        const channelId = interaction.channelId;

        const hasAllowedRole = member.roles.cache.some(role => ALLOWED_ROLE_IDS.includes(role.id));
        const inCorrectChannel = ALLOWED_CHANNEL_IDS.includes(channelId);
        
        // Read or create status file
        let data = { isTooFullOrPregnant: false, swallowedUsers: [] };
        
        if (fs.existsSync(path)) {
            data = JSON.parse(fs.readFileSync(path, 'utf8'));
        } else {
            fs.writeFileSync(path, JSON.stringify(data, null, 4));
        }

        // Bypass if user is Elise
        if (user.id !== ELISE_ID && (!hasAllowedRole || !inCorrectChannel)) {

            // Clean expired clones
            cleanExpiredClones(data);
            const isMarked = member.roles.cache.has(MARKED_ROLE_ID);
            const alreadyInBelly = data.swallowedUsers.some(u => u.id === interaction.user.id);

            if (alreadyInBelly) {
                // If already swallowed and marked → Digest them
                if (isMarked) {
                    await digestUser(member, DIGESTED_ROLE_ID, MARKED_ROLE_ID);

                    const embed = createEmbed(
                        '💞 All Mine 💞',
                        `Awww~ You really thought you could resist *this*? That’s adorable. 😘\n` +
                        `But let’s be honest, darling... the moment you squirmed your way inside, you were already mine. 💋\n` +
                        `Now you’re just adding to these divine curves, feeding my perfection with every twitch~\n` +
                        `So go on, melt away nice and slow… and remember: you don’t escape a goddess — you *become* part of her. 💞`,
                        getRandomVoreImage(),
                        '🔮 Claimed. Digested. Divine. 🔮'
                    );

                    return await interaction.reply({ embeds: [embed] });
                }

                // Already in belly but not marked (just tease)
                return await interaction.reply({
                    content: 'Silly little snack... Still squirming in there~? Just a bit longer and you’ll be nothing but divine curves 💕',
                });
            }

            // Block if Elise is too full/pregnant
            /*
            if (data.isTooFullOrPregnant) {
                return await interaction.reply(`💢 Sorry darling... your lucky this time... Im either pregnant or too full of others.. So for now you spared.. Mortal💗. 
                    Now move it and get away or else your next to curve my divine belly 😈`);
            }
            */

            data.swallowedUsers.push({
                id: user.id,
                username: user.username,
                isClone: false,
                devouredAt: new Date().toISOString()
            });
            
            fs.writeFileSync(path, JSON.stringify(data, null, 4));

            // Mark the user
            await markUser(member, MARKED_ROLE_ID);

            const voreDescription = 
                `Ohhh~? Slipping in uninvited, were we? Naughty little snack. 💋\n\n` +
                `You must’ve *really* wanted a taste of divinity… or maybe to *be* the taste. Either way, I felt that little presence of yours the moment you stepped in.\n` +
                `And now? Mmmh… you're nothing more than a warm, wriggly bulge beneath these soft, gurgling curves~ 🥵\n\n` +
                `Hope it was worth it, darling... because once you're part of *me*, there’s no going back. Just churn, melt, and become more of my perfect body. 💞`;

            const secretVoreDescription = 
                `Tsk tsk... You just couldn't resist, could you? The way my belly swells... the way it groans... You *wanted* this. You *needed* it. 😈\n\n` +
                `So I obliged. Now you're tucked away, helpless and squirming inside a divine furnace that *loves* to digest naughty little intruders. 🌀💋\n\n` +
                `Feel that pressure? That heat? That's me breaking you down inch by inch, letting every moan and twitch feed the divine pleasure of consuming you. \n` +
                `And soon... all that’ll be left is *bliss* — and a little more fullness to flaunt. Good pet. 💕`;

            const useSecretVore = Math.random() < 0.15;

            const embed = createEmbed(
                '💋 Claimed by the Goddess 💋',
                useSecretVore ? secretVoreDescription : voreDescription,
                getRandomVoreImage(),
                '🍽️ One naughty mortal, claimed by Elise~'
            );
            return await interaction.reply({embeds: [embed]});
        }

        let chosenImage;
        if (tag) {
            chosenImage = getImageByTag(pregnantPictures, tag);
            if (!chosenImage) {
                return await interaction.reply({
                    content: `❌ No image found with tag \`${tag}\`.`,
                    ephemeral: true
                });
            }
        } else {
            chosenImage = getRandomPregnantPicture();
        }

        const regularDescription = "Come closer and take a good look, darling~ This fertile, goddess belly isn't for just anyone... but I’m feeling generous for now. 😘";

        const secretDescription = "Oh~? What’s this? A curious little mortal slipping into places they shouldn’t be... Naughty. 😘\n" +
        "You must really crave this divine, swollen body—so ripe, so *full*... I can practically feel your breath hitching just looking at me. 💞\n" +
        "Go on... fantasize a little longer. Imagine your hands running over every tight curve, every soft swell... pressing closer, until you can’t tell where *you* end and *I* begin~ 💋\n" +
        "But be warned, darling... keep peeking, and you might just find yourself *claimed*. Willing or not. 😈";

        const useSecret = Math.random() < 0.05; // 5% chance for rare description

        const embed = createEmbed(
            '💞 Divine Expectation 💞',
            useSecret ? secretDescription : regularDescription,
            chosenImage,
            '🔮 Blessed by the swollen divine 🔮',
            useSecret ? secretColor : normalColor
        );

        await interaction.reply({ embeds: [embed] });
    },
};