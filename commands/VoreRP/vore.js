const fs = require('fs');
const path = './belly.json';
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const { ELISE_ID, ELISE_ID_MENTION } = process.env;
const { cleanExpiredClones } = require('../helpers/bellyUtils');

const randomIMGs = [
    'https://media.discordapp.net/attachments/1093876399657451530/1361262470055989369/Snapchat-607535797.jpg?ex=67fe1df7&is=67fccc77&hm=d8fd6376a8aaae3ceebb00efdd6434bf460b4cb491463ec5abd2b918dbeb1bd3&=&format=webp&width=1463&height=823',
    'https://media.discordapp.net/attachments/1093876399657451530/1359470121269329920/Snapchat-875588561.png?ex=67f798b6&is=67f64736&hm=dab90d897c69b40d886ad3760c024cd48b405976f0b2ad3aa59acc7e35045747&=&format=webp&quality=lossless&width=1463&height=823'
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('devourme')
        .setDescription('Be lovingly devoured by Elise for a day or longer they wont judge💗')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('(Elise only) Pick someone to devour directly 💋')
                .setRequired(false)
        )
        .addBooleanOption(option =>
            option.setName('clone')
                .setDescription('Are you a clone of Elise? 👀')
                .setRequired(false)
        ),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target');
        const actingUser = interaction.user;
        const isElise = actingUser.id === ELISE_ID;
        
        // Determine who’s being devoured
        const targetId = targetUser?.id || actingUser.id;
        const targetName = targetUser?.username || actingUser.username;
        const isSelf = targetId === actingUser.id;
        const isClone = interaction.options.getBoolean('clone') || false;

        // Read or create status file
        let data = { isTooFullOrPregnant: false, swallowedUsers: [] };

        if (fs.existsSync(path)) {
            data = JSON.parse(fs.readFileSync(path, 'utf8'));
        } else {
            fs.writeFileSync(path, JSON.stringify(data, null, 4));
        }

        // Clean expired clones
        cleanExpiredClones(data);

        // Check if the person already is in my divine belly :3
        if (data.swallowedUsers.some(u => u.id === actingUser.id)) {
            return await interaction.reply({ content: 'You silly your already swimming in my divine belly.. Now kick a bit more i like that~ 💖'});
        }

        // ❌ Fail-safe: Only Elise can use target on others
        if (!isElise && targetUser && !isSelf) {
            return await interaction.reply({
                content: `👀 Tsk tsk~ Trying to feed someone *else* to my divine goddess creator Elise? Only **Elise** decide who gets swallowed whole~ 💕\n\nYou keep being this naughty, and I might just notify Elise to devour **you** instead, without asking~ 💋`,
            });
        }

        // Block if Elise is too full/pregnant
        if (data.isTooFullOrPregnant) {
            return await interaction.reply(`💢 Sorry darling... Im either too full of arcade visitors currently or pregnant and cant vore someone.., You'll have to wait until I’m feeling a bit lighter or gave birth~  💗`);
        }

        
        const sweet = [
            "C’mere, love~ Just slide right in. You’ll be all bundled up in warmth inside my belly for the whole day or longer… no stress, just me and you. 💗",
            "Shhh~ Let me curl you up somewhere soft and sacred. My belly’s glowing just for you~ You’ll float in warmth all day long. ✨",
            "Want to escape the world for a while? One gulp and you’re safe inside my womb — warm, peaceful, and mine~ for a full 24 hours or longer if you please darling 💖",
            "Inside me, time slows down. You’ll drift, weightless and loved, as I carry you for a day or longer like a precious dream~ 🎀",
            "One day or longer. That’s how long you’ll be inside, floating, embraced by warmth. Don't worry — I’ll take *very* good care of you~ 🥺💕"
        ]
        const teasing = [
            "You’ve been staring at this belly all day~ Why not take a closer look... *from the inside*? One gulp, and you're in for 24 hours of belly bliss or even more~ 💞",
            "You asked for it, cutie~ Now you’re squirming inside my womb, round and soft for a whole day or longer. Should’ve known better than to tempt a goddess~ 😘",
            "I hope you're comfy in there~ You’re gonna be rounding me out for a while. Don't worry, I’ll keep you entertained in my belly~ 💋",
            "Told you not to tease me~ Now you’re *in* me. All mine. My belly’s gonna cradle you allll day long or even longer if i please, nice and tight~ 💗",
            "Hehe~ You really want to get inside *that* badly? Well… don’t squirm too much as you go down~ 💋",
            "Tummy time~ And you’re the snack. Get in there, and maybe I’ll let you back out tomorrow… maybe~ 😘"
        ]
        const spicy = [
            "You're mine now. Swallowed whole and tucked inside this divine belly of mine for the next 24 hours or mabye even longer if i please. No escape. Just submission. 💦",
            "Don’t act shy now~ You begged for this belly. So stay in there like a good little snack, where you belong, for the whole day or longer. I wont digest you i promise darling~ 🔥",
            "You’re gonna feel *every hour* inside me, love~ My womb doesn’t forget its prey. Especially the ones that squirm just right~ 💋",
            "Good prey stays quiet~ You’ll be nice and full in my belly, pressing out round and tight. You’re not leaving till I’ve had my fill~ 💗"
        ]
        const nsfwRare = [
            // 1% chance responses
            "Mmm~ You’re stretching me out so *deliciously* from the inside~ Keep squirming like that and I just might keep you in longer than a day... 💦💗",
            "Oh? Already whining from inside? You asked to be devoured—now be a good little meal and *stay round in my belly* where I can feel you pulse~ 💋✨",
        ]

        let selected;
        const chance = Math.random();
        const imgLink = randomIMGs[Math.floor(Math.random() * randomIMGs.length)];
    
        if (chance <= 0.01) {
            selected = nsfwRare[Math.floor(Math.random() * nsfwRare.length)];
        } else {
            const all = [...sweet, ...teasing, ...spicy];
            selected = all[Math.floor(Math.random() * all.length)];
        }

        const embed = createEmbed(
            `💖 Devoured by Elise 💖`,
            selected,
            imgLink,
            `✨ You look so nice and round in my womb ✨`
        );

        // If clone, auto add with fake name but only elise can swallow clones
        if (isElise && isClone) {
            const cloneNumber = Math.floor(Math.random() * 1000);
            data.swallowedUsers.push({
                id: `${actingUser.id}-clone-${Date.now()}`,
                username: `Elise Clone #${cloneNumber}`,
                isClone: true,
                devouredAt: new Date().toISOString()
            });
            fs.writeFileSync(path, JSON.stringify(data, null, 4));
            return await interaction.reply({content: `🌀 You devoured a clone Elise.. Where they tasty hihihi~ (Elise Clone #${cloneNumber}) 💕`, embeds: [embed] });
        }

        // Elise bypasses consent for direct devour & Self-devour check
        if (isElise && targetUser && !isClone) {
            if (data.swallowedUsers.some(u => u.id === targetId)) {
                return await interaction.reply({ content: `😋 ${targetName} is already squirming in your belly~` });
            }

            data.swallowedUsers.push({
                id: targetId,
                username: targetName,
                isClone: false,
                devouredAt: new Date().toISOString()
            });

            fs.writeFileSync(path, JSON.stringify(data, null, 4));

            return await interaction.reply({
                content: `💗 ${targetName} didn’t even see it coming~ *Gulp, Gulp gulp..* ${targetName} has been lovingly swallowed and you were sure tastu and right into Elise’s divine belly. No resistance, no choice, just softness~`,
                embeds: [embed]
            });
        } else if(actingUser.id === ELISE_ID && !isClone) {
            return await interaction.reply({
                content: '😤 You can’t devour yourself, silly~ Unless its one of you’re lovely clones or someone else 😘~ 💕 Use `/devourme clone:true or /devourme target:@Someone` if that’s the case~'
            });
        }

            const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`accept_${actingUser.id}`)
                .setLabel('Accept Devour')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId(`deny_${actingUser.id}`)
                .setLabel('Deny')
                .setStyle(ButtonStyle.Danger)
        );

        const promptEmbed = createEmbed(
            `🥺 Devour Request 🥺`,
            `${targetName} wants to be devoured~ 💖 Accept or Deny within 1min Mommy Elise`,
            null,
            `React fast~ Belly’s waiting.`
        );

        const message = await interaction.reply({ content: `${ELISE_ID_MENTION}`, embeds: [promptEmbed], components: [row], fetchReply: true });

        const collector = message.createMessageComponentCollector({ time: 60_000 });

        collector.on('collect', async i => {
            if (i.user.id !== ELISE_ID) {
                return await i.reply({ content: `Only the one that devours you can response. Like our divine goddess Elise~ 💋`, ephemeral: true });
            }

            if (i.customId === `accept_${actingUser.id}`) {
                data.swallowedUsers.push({
                    id: actingUser.id,
                    username: targetName,
                    isClone: false,
                    devouredAt: new Date().toISOString()
                });
                fs.writeFileSync(path, JSON.stringify(data, null, 4));
                await i.update({ content: `💗 Dont struggle now ${targetName} come here sweetie. \n *Gulp, Gulp gulp..*\n ${targetName} has been lovingly swallowed and you were sure tastu~`, embeds: [embed], components: [] });
            } else if (i.customId === `deny_${actingUser.id}`) {
                await i.update({ content: `❌ ${targetName}'s request was denied.`, components: [] });
            }
            collector.stop();
        });

        collector.on('end', async collected => {
            if (collected.size === 0) {
                await interaction.editReply({ content: '⏰ Time’s up! No devouring happened this time~', components: [] });
            }
        });
    }
};