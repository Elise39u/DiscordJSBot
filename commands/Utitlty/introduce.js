const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const fs = require('fs');
const { cleanExpiredClones } = require('../helpers/bellyUtils');
const path = './belly.json';
const { ELISE_ID } = process.env;
const { getImageByTag } = require("../helpers/bellyImageHandler")
const vtuberPictures = require('../Assets/vtuberPictures.json');
const voreBellyImages = require('../Assets/voreBellyPictures.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('introduction')
		.setDescription('Telling a bit about my self'),
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
	    let randomImage = getImageByTag(vtuberPictures, "vtuber");
        let embed;
        const normalColor = '#006D5B'; // Dark Teal
        const secretColor = '#008B8B'; // Dark Cyan

        // Check if the person already is in my divine belly :3
        if (data.swallowedUsers.some(u => u.id === actingUser.id)) {
            embed = createEmbed(
                '💋 Already Inside 💋',
                `Good snack~ You like pleasing me dont you? Well squirm a bit harder in my swollen divine belly~ I might moan your name if your squirm good~ 💞`,
                voreBellyImage,
                '🔮 Already inside my divine belly 🔮',
                secretColor
            );
        } else {
            const shouldDevour = Math.random() <= 0.1;

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
                        `You silly stupid little snack~.. Your so cute when you want to know my assisant better 
                        Speaking to the wrong one and instead met your goddess of fertilty and reproduction~. Enjoy being in my divine belly~ 💖
                        But can you blame me? You looked so tasty and you sure were cute and peckisch~ I couldnt help myself~ 💞
                        Ahh there is my lovely assiant~ Yeah clone of mine a silly snack came up to me to know you better but instead found their goddess~ 🔮,
                        See how round and swollen i am.. You can feel the snack squirming inside me right?~ 💗
                        Well we dont have to remind the good squirming snack what happends when they misbehave right?~ 💋
                        So now be a good snack and relax and make sure to squirm hard in that big swollen divine belly of my 💗,`,
                        voreBellyImage,
                        '🔮 Devoured by Elise instead of meeting their assisant 🔮',
                        secretColor
                    );
                }
            } else {
                const description = `
                Hiya! Oh, were you looking for me? :pink_heart: 

                I’m your digital assistant a perfect clone copy of your favorite **Preggo Goddess of Fertility**, Elise! You’re quite lucky you found me; I’ve heard the real Elise tends to devour those who mistake others for her... hihi! :biting_lip:

                **:sparkles: About Me & Elise**
                I help run the Arcade alongside the Goddess themself. I’m one of the very few clones who didn't get "absorbed" back into their belly! We share a very intimate bond let's just say some very *fun* things happen between us in that master bedroom... oops! Since Elise was highly pregnant when I was created, I’m permanently stuck with this big, beautiful bump too. :pregnant_woman::sparkles:

                **:video_game: What can you find in our Arcade?**
                • :christmas_tree: **The Christmas Arcade:** A festive wonderland filled with games, snack corners, and a cozy warm pool to relax in.
                • :evergreen_tree: **The Enchanted Forest:** Explore the woods outside leading to a Tokyo-inspired city! It’s full of friendly Pokémon waiting to play. Elise loves this city 
                • :sparkling_heart: **Our Star, Elise:** Whether they waddling around full of "visitors" or pregnant or singing and streaming, she’s always here maintaining the arcade with their lovely swollen bump.

                If you need anything else, Pixie, just use the \`/help\` command! I’m built to guide you. Oh... and if you're just here for **belly rubs**? That’s allowed too! I adore them, but be warned if you tease me too much, I'm not responsible for what happens next! hihi~ :smiling_imp:
                `;

        embed = createEmbed(
            `So you want to learn a bit more about this digital AI made by your preggo demi girl. `,
            description,
            randomImage,
            "🎀 An introduction of your preggo ai assisant 🎀",
            normalColor
        );
        }
    }
	    await interaction.reply({ embeds: [embed] });
	},
};
