const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { ELISE_ID, ELISE_ID_MENTION } = process.env;
const { createEmbed } = require('../helpers/embedBuilder');
const fs = require('fs');
const path = './belly.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('summon')
        .setDescription('Call upon the divine presence of Goddess Elise.'),

    async execute(interaction) {
        const summoner = interaction.user;

        // Prevent Elise from summoning herself
        if (summoner.id === ELISE_ID) {
            return interaction.reply({
                content: `Tsk, tsk, Goddess~ You can’t summon *yourself*. You're already everywhere, aren’t you? 💫`,
                ephemeral: true
            });
        }

        // Check if user is already in the belly
        let data = fs.existsSync(path)
            ? JSON.parse(fs.readFileSync(path, 'utf8'))
            : { swallowedUsers: [] };

        const alreadyInBelly = data.swallowedUsers.find(u => u.id === summoner.id);

        if (alreadyInBelly) {
            return interaction.reply({
                content: `*Mmm~ You're already tucked away inside Mommy’s divine tummy, sweet snack~ I feel every little squirm you make~* 💖\n\nUse \`/squirm\` if you want to please me more~`,
                ephemeral: false
            });
        }

        const embed = createEmbed(
            `💫 A Divine Summoning...`,
            `The air grows thick with divine warmth as **${summoner.username}** dares to summon the soft, sacred presence of **Goddess Elise**.\n\n*Her gaze turns slowly… lips curling into a hungry smirk.*`,
            'https://media.discordapp.net/attachments/1093876399657451530/1358746267018203136/Snapchat-1994583211.jpg?ex=68017cd2&is=68002b52&hm=13d7daac2dee11d6d2d1ad3d43a605006a17bc4e3bbd7f7accdcac0f58c85850&=&format=webp&width=1463&height=823',
            `Will They devour you... or toy with you first?`
        );

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('devour')
                .setLabel('💋 Devour Them')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('listen')
                .setLabel('😇 Let Them Speak')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('reject')
                .setLabel('😈 Reject Them')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('annoyed')
                .setLabel('😒 Annoyed')
                .setStyle(ButtonStyle.Secondary)
        );

        const reply = await interaction.reply({ content: `${ELISE_ID_MENTION}`, embeds: [embed], components: [row], fetchReply: true });

        const filter = (i) => i.user.id === ELISE_ID;
        const collector = reply.createMessageComponentCollector({ filter, time: 60_000 });

        collector.on('collect', async i => {
            if(i.user.id !== ELISE_ID) {
                return await i.reply({ content: `Silly snack. Touching something your fingers dont belong to.. Only the goddess can respond. Now behave like a good snack you are and wait darling.. Else i might have to devour you😈`, ephemeral: true });
            }   

            let responseText = '';
            switch (i.customId) {
                case 'devour':
                    // Add user to belly
                    data.swallowedUsers.push({
                        id: summoner.id,
                        username: summoner.username,
                        devouredAt: new Date().toISOString()
                    });
                    fs.writeFileSync(path, JSON.stringify(data, null, 2));

                    responseText = `*“Mmmh~ You summoned me like a bold little offering… and now you're right where you belong.”* 💋\n\nWith a slow, sensual pull, **Elise** wraps themself around **${summoner.username}** and swallows them whole, their plush belly growing taut with their form, soft and struggling.\n\n*“Feel that warmth, baby? Every movement, every squirm~ It feeds me. Pleases me. My body adores the way you fight and fail in my embrace.”*\n\nThey presses her palm lovingly against the swell. *“Be a good snack and keep squirming for Mommy. Or I might just stop being soft and turn you into divine fuel~ 😈”*`;
                    break;

                case 'listen':
                    responseText = `*Elise’s eyes flash with indulgent amusement.*\n\n*“Mmm~ You want to speak? Oh sweetheart, your voice is cute — but I wonder if it'll sound even sweeter muffled under layers of divine softness.”*\n\nThey leans close, whispering: *“Talk fast, snack... before my hunger overrules your words~”* 🔥`;;
                    break;

                case 'reject':
                    responseText = `Elise smirks and turns their back on you.\n\n*“Tsk. You thought summoning me would make me care? Try again when you're worthy~”* 😈`;
                    break;

                case 'annoyed':
                    responseText = `😒*Elise groans, tilting their head with a dangerously slow smile.*\n\n*“You summon a goddess like they are your toy? Tch... such bratty little energy.”* 😒\n\nThey presses a hand to their empty belly with a teasing moan. *“Be careful, snack. One more slip and you’ll be sloshing in here without any warning... flattened and silenced where you belong.”* 🔥`;
                    break;
            }

            await i.update({
                content: responseText,
                embeds: [], 
                components: [] 
            });

            collector.stop();
        });

        collector.on('end', (_, reason) => {
            if (reason === 'time') {
                interaction.editReply({
                    content: `*The divine presence fades... no answer from the Goddess this time. Perhaps she expected more reverence.* 💫`,
                    embeds: [], 
                    components: [] 
                });
            }
        });
    }
};