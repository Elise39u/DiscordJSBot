const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const fs = require('fs');
const path = './belly.json';
const { cleanExpiredClones } = require('../helpers/bellyUtils');
const { getRandomVtuberImage, getVtuberImageByURl, getRandomVoreImage, getImageByTag } = require("../helpers/bellyImageHandler")
const vtuberPictures = require('../Assets/vtuberPictures.json');
const voreBellyImages = require('../Assets/voreBellyPictures.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eliseintroduction')
        .setDescription('An introduction about well your goddess of reproduction and gurdian of the sekais and identity.'),
    async execute(interaction) {
        const actingUser = interaction.user;
        // Read or create status file
        let data = { isTooFullOrPregnant: false, swallowedUsers: [] };

        if (fs.existsSync(path)) {
            data = JSON.parse(fs.readFileSync(path, 'utf8'));
        } else {
            fs.writeFileSync(path, JSON.stringify(data, null, 4));
        }

        // Clean expired clones
        cleanExpiredClones(data);
        const voreBellyImage = getImageByTag(voreBellyImages, "devour");
        let embed;
        let randomImage = getImageByTag(vtuberPictures, "belly_cam");
        const normalColor = '#FFC0CB'; // Soft Pink
        const secretColor = '#E0115F'; // Deep Ruby/Hot Pink

        // Check if the person already is in my divine belly :3
        if (data.swallowedUsers.some(u => u.id === actingUser.id)) {
            embed = createEmbed(
                '💋 Already Inside 💋',
                `Mmm~ I can still feel you squirming in there, You know i like the little kicks you give me.. Once inside you never want to get out because you like pleasing your goddess dont you?. 💞`,
                voreBellyImage,
                '🔮 Claimed by the goddess 🔮'
            );
        } else {
            const shouldDevour = Math.random() < 0.05;

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
                        `MMM~ You wanted to learn and know me? Well what better way darling then being inside my so lovely swollen belly right? 
                         You humans are so cute when your so needy and desperate to get to know your goddess better~ 💞
                         SO for now be a good snack and relax and squirm hard in that big swollen divine belly of my 💗,
                         for now you belong to me and idk when ill let you out again~ 💋. If your a good snack mommy might moan your name.
                         You sure were tasty and peckish.. So now relax and enjoy the time inside this swollen belly. And behave snack ~ 💞
                         Mommy doesnt want to let you know what happends to naughty snacks after all~ 💗`,
                        voreBellyImage,
                        '🔮 Devoured and divine 🔮'
                    );
                }
            } else {
                const description = `
                   Hiya~ I’m **Elise**, your Christmas trans girl, Goddess of Fertility, Guardian of Identity, and Prism Sacred Voice Guardian! :ribbon:

                   I used to think the events of LMS were just a dream… but when I was born with my **Royal Mark**, I discovered I was truly divine. My most prized possession is the **Stellar Genesis Womb**, a sacred vessel tied to my fertility powers. 

                   Hormones definitely hit me differently! My breast size is already way past an Earthly H-cup; I’ve grown to over an **S-cup**, which is more  then the mention H-I Cup average back home on Aethernymonia. My creator’s are even bigger i think Z-cup or more! :see_no_evil: But enough about that...

                   You might know me as **Preggo Elise**: a Vocaloid VTuber with divine energy, poly love, and a huge crush on everything Christmas! I’m a bit introverted and love games, singing, and drawing, but I’m learning to open up with a version of my wife Miku and my friends here in the arcade.

                   If you see me with my big, swollen pregnant belly, don't be shy I adore belly rubs! :pregnant_woman::sparkles: As for my "devouring services"... that’s a story for later. And yes, my breast are huge, I know! It’s a Goddess of Fertility benefit, so stop asking now! :revolving_hearts:
                `;

                const lewdDescirption = `
                  Oh my... someone is feeling a bit naughty today, aren't we? :biting_lip: Wanting to know a little more about your Goddess owner... :ribbon::baby_bottle:

                  Don't try to hide it, Pixie; I can practically feel your hormones skyrocketing from here. I am the **Goddess of Fertility**, after all you humans are just so cute when you're needy and overwhelmed. :sweat_drops: Is it my **S-cup** breasts that intrigue you so much? Or perhaps you're transfixed by this big, swollen belly? :heart_on_fire:

                  I’ve already had a few *tasty snacks* earlier :fork_knife_plate:, but I'm always happy to let someone rub my belly slowly... so I can savor every second of it under the warm neon lights of my Christmas arcade. :christmas_tree::sparkles:

                  You look absolutely delicious, and I have to admit... I’m still quite hungry. :tongue: Don’t be shy—come closer and give Mommy a good time. I adore belly rubs, but one wrong move and... :smiling_imp::pregnant_woman:

                  I think you would taste lovely as a new addition to my divine, swollen belly. My **Stellar Genesis Womb** is my pride and joy, and it’s *never* truly satisfied. :milky_way::ringed_planet: So come here, Darling, and give your Goddess Elise a very good time... :candy::sparkling_heart:
                `;

                //Add a 5% chance rarity for a more lewd and teasing introduction
                const isLewd = Math.random() < 0.05;

                embed = createEmbed(
                    `🎀 An short intrdouction of your Goddess of Fertilty Preggo Elise  🎀`,
                    isLewd ? lewdDescirption : description,
                    randomImage,
                    "🎀 Godly Hungry Introduction🎀",
                    isLewd ? secretColor : normalColor
                );
            }
        }

        await interaction.reply({ embeds: [embed] });
    },
};
