const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const voreBellyImages = require('../Assets/voreBellyPictures.json');
const fs = require('fs');
const path = './belly.json';
const { cleanExpiredClones } = require('../helpers/bellyUtils');
const { getRandomBellyImage, getRandomVoreImage, getImageByTag } = require("../helpers/bellyImageHandler")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stellargensiswomb')
        .setDescription('my price possesion as the goddess of fertilty/reproduction'),
    async execute(interaction) {
        
        const actingUser = interaction.user;
        // Read or create status file
        let data = { isTooFullOrPregnant: false, swallowedUsers: [] };
    
        if (fs.existsSync(path)) {
            data = JSON.parse(fs.readFileSync(path, 'utf8'));
        } else {
            fs.writeFileSync(path, JSON.stringify(data, null, 4));
        }
        
        cleanExpiredClones(data);
        const voreBellyImage = getImageByTag(voreBellyImages, "devour");
        let embed;
        // Check if the person already is in my divine belly :3
                if (data.swallowedUsers.some(u => u.id === actingUser.id)) {
                    embed = createEmbed(
                        '💋 Already Inside 💋',
                        `You needy humans always so eager to get my attenion isnt it? While squirm a bit harder and i might moan you name snack.. Mommy likes when their snacks squirm 💋💗`,
                        voreBellyImage,
                        '🔮 Claimed by the goddess 🔮'
                    );
                } else {
                    const shouldDevour = Math.random() < 0.15;
        
                    if (shouldDevour) {
                        if (actingUser.id === ELISE_ID) {
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
                                '💞 Devoured by Elise.... 💞',
                                ` **BUURRRPPPP** Oh oops.. You pixies always so eager and needy to get know me and my powers better 💋💞
                                I could feel you stare and drip with anticepation and as you rubbed my swollen snack filled belly i did warn you  :sparkling_heart:
                                One wrong move and you would go right inside my swollen divine belly **BURRRPPPP*** 💞 After all i warned you i was quite hungry. 😈
                                Reaching the under part of my swollen belly without permission.. Tsk tsk tsk pixie should have known better. 🔮😈
                                While your in my swollen belly i do let you know behave and be a good snack and squirm for your Goddess. :sparkling_heart:
                                I am sure that i dont have to remind you snack what happends to Snack who dont listen to Mommy Elise 😈`,
                                voreBellyImage,
                                '🔮 Devoured and divine 🔮'
                            );
                        }
                    } else {
                    const description = `
                        You Pixies are always so curious and so needy... Ever wonder how a trans girl like me can get pregnant, or are you just here to stare at my big, round, swollen belly? :ribbon:

                        Darling, did you forget I’m a Goddess? As the **Goddess of Fertility and Reproduction**, I am not bound by your simple Earthly laws. I extend them. My **Stellar Genesis Womb** is the pride and joy of my godhood, allowing me to bypass the boundaries of nature itself! :kiss::pregnant_woman:

                        My belly nurtures and adapts to any life: from pulsing insect eggs and elemental beings to simple human, demonic, or even robotic pregnancies. It is a sacred space designed to keep every pregnancy safe... or to nourish those who dare to be devoured by their Goddess. :smiling_imp:

                        Together with my **Royal Mark**, this womb is the reason I ascended to divinity. If you want to read more about my specific powers, Pixie, you can find them in <#1345430746789052496>

                        Be warned, though... you look absolutely delicious, and I’m feeling rather hungry today.

                        Much love from your swollen trans girl Goddess,
                        **Preggo Elise** :sparkling_heart:
                    `;
                    const lewdDescirption = `
                        Oh my... who do I feel here? Someone is absolutely dripping with need. Don't try to hide yourself, Pixie I can sense your desire from here. :biting_lip::ribbon:

                        Is it this big, swollen belly of mine that fascinates you, or are you just wondering how I can get so big and round? I can feel you staring while you're trembling. Come closer and give it a good rub your Goddess is in the mood for some attention. :heart::pregnant_woman:

                        Can you feel the "snacks" I devoured squirming inside? :smiling_imp: Yes, I do devour arcade visitors, and you look especially tasty, Pixie... so consider this a warning. You’re rubbing my belly just right, so I’ll leave you on the outside for now. But as the **Goddess of Fertility**, my powers are truly extraordinary.

                        From absorbing you needy humans to being impregnated with pulsating insect eggs, elemental beings, or even mechanical robots... I don't just bypass the laws of nature, I dominate them. And right now, Pixie, I am dominating you. I can sense exactly what you need. :chains::sparkling_heart:

                        So, keep rubbing just like that and please your Goddess. But one wrong move, and you’ll find out just how hungry I am. You look like a perfect snack that would fit right into my swollen belly. :yum::baby_bottle:

                        Much love,
                        **Your Swollen and Hungry Preggo Elise** :heart_on_fire:
                    `;

                    //Add a 5% chance rarity for a more lewd description of the stellar gensis womb
                    const isLewd = Math.random() < 0.05;
                    const randomImage = getRandomBellyImage();
                    const normalColor = '#4cf10a'; // Light Green
                    const secretColor = '#0a76a1'; // Darker blue

                    embed = createEmbed(
                        `🎀 Elise their goddess powers🎀`,
                        isLewd ? lewdDescirption : description,
                        randomImage,
                        "🎀 Stellar gensis womb 🎀",
                        isLewd ? secretColor : normalColor
                    );
                }
            }
        await interaction.reply({ embeds: [embed] });
    },
};
