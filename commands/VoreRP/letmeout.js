const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = './belly.json';
const { ELISE_ID, ELISE_ID_MENTION } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('letmeout')
        .setDescription('Politely beg Elise to be let out of her womb~'),
    async execute(interaction) {
        const userId = interaction.user.id;
        const username = interaction.user.username;

        // Load belly data
        if (!fs.existsSync(path)) return await interaction.reply({ content: 'No one’s in the belly yet~ 🍑', ephemeral: true });
        const bellyData = JSON.parse(fs.readFileSync(path));

        // Check if user is inside
        const index = bellyData.swallowedUsers.findIndex(u => u.id === userId);
        if (index === -1) {
            return await interaction.reply({ content: 'Why your trying to get out of my divine womb if your not in it darling?💫', ephemeral: true });
        }

        // Embed responses
        const cozy = [
            "Aww~ Tired of soaking in warmth? I get it… maybe it's time for you to be reborn into the world again~ 🌸",
            "It’s okay, love~ I’ll let you out nice and slow. But don’t forget how safe it felt in there~ 💗",
            "You’ve been so good in there~ If your time’s up, I’ll gently set you free~ 🌙",
            "I’ll miss your warmth inside me~ but go ahead, darling. Be gentle with the world out there~ ✨"
        ];
        const teasing = [
            "Leaving already? But you looked so round and cute from the outside~ I’ll *consider* it~ 😘",
            "You sure you want out? I was just starting to enjoy your squirming~ Maybe next time you’ll beg sooner~ 💋",
            "Hehe~ You must be so flustered in there~ Alright, alright, maybe I’ll *think* about letting you go~ 😏",
            "Awh~ You want out now? Guess the belly was a bit *too* cozy, huh~? 💞"
        ];
        const dominant = [
            "Oh? You think you get to *ask*? I’ll decide when you leave my belly, pet~ 🔥",
            "Tch. You’re lucky I’m in a good mood~ Let’s see if I feel generous enough to release you~ 💦",
            "I swallowed you because you *belong* to me~ And you want out already? Hmph. We’ll see~ 💋",
            "Good prey stays put~ but maybe, just maybe, I’ll let you crawl back into the world~ for now~ 💗"
        ];
        const nsfwDominantRare = [
            "Heh~ You wanna crawl out now? After I’ve had you pulsing and trembling in there all this time? Tch. You’re mine, and I don’t let go *that* easily~ 💦",
            "Leaving? When I can still *feel* your heartbeat thumping through my womb? Don’t be silly, pet. You’re staying until I’ve milked every squirm out of you~ 🔥",
            "You're not done yet~ I’ve felt every twitch and moan from inside, and you think I’m ready to give you up? Hah. You don’t get to decide, *prey*~ 💋",
            "I haven’t even *played* with you properly in there~ Wanting out now is just cute. But it’s not your call, darling… not when you’ve been writhing so sweetly for me~ 💦",
            "You want out already? But I haven't even gotten to the part where you beg properly yet~ Stay right where you are while I savor this *fullness* a little longer~ 😈"
        ];

        const allStyles = [...cozy, ...teasing, ...dominant];
        let selected;

        if (Math.random() <= 0.01) {
          selected = nsfwDominantRare[Math.floor(Math.random() * nsfwDominantRare.length)];
        } else {
          selected = allStyles[Math.floor(Math.random() * allStyles.length)];
        }

        const embed = new EmbedBuilder()
            .setTitle('💫 Request to Be Let Out 💫')
            .setDescription(`**${username}** is asking to leave Elise’s warm divine embrace...\n\n*${selected}*`)
            .setColor('#f9a8d4')
            .setThumbnail(interaction.user.displayAvatarURL());

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('accept_letout')
                .setLabel('Let them out 💨')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('deny_letout')
                .setLabel('Keep them inside 💖')
                .setStyle(ButtonStyle.Danger)
        );

        await interaction.reply({
            content: `${ELISE_ID_MENTION} Darling 💖💖, Creator💖💖.. I recived a request to let someone out of your divine womb~`,
            embeds: [embed],
            components: [row]
        });

        const filter = i => i.user.id === ELISE_ID;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60_000 });

        collector.on('collect', async i => {
            if (i.customId === 'accept_letout') {
                bellyData.swallowedUsers.splice(index, 1);
                fs.writeFileSync(path, JSON.stringify(bellyData, null, 2));

                await i.update({
                    content: `✨ ${username} has been let out of Elise’s cozy belly~ Reborn and refreshed 💗`,
                    embeds: [],
                    components: []
                });
            } else if (i.customId === 'deny_letout') {
                await i.update({
                    content: `🔒 ${username} remains tucked away inside Elise~ No escape just yet~ 💞`,
                    embeds: [],
                    components: []
                });
            }
            collector.stop();
        });

        collector.on('end', async collected => {
            if (collected.size === 0) {
                await interaction.editReply({
                    content: `⏳ No answer from Elise… Looks like you’re staying in for now, ${username}~ 💦`,
                    embeds: [],
                    components: []
                });
            }
        });
    }
};