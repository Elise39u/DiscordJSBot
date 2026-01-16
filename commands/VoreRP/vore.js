const fs = require('fs');
const path = './belly.json';
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const { ELISE_ID, ELISE_ID_MENTION } = process.env;
const { cleanExpiredClones } = require('../helpers/bellyUtils');
const voreBellyImages = require('../Assets/voreBellyPictures.json');
const { getImageByTag } = require('../helpers/bellyImageHandler')

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
        )
        .addStringOption(option =>
            option.setName('entry')
                .setDescription('How do you want to enter Elise’s belly?')
                .setRequired(false)
                .addChoices(
                    { name: 'Devour me 💋', value: 'devour' },
                    { name: 'Crawl your way inside (Unbirth) 🐾', value: 'crawl' }
                )
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
        const entryMethod = interaction.options.getString('entry') || 'devour';

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

        /* Block if Elise is too full/pregnant
        if (data.isTooFullOrPregnant) {
            return await interaction.reply(`💢 Sorry darling... Im either too full of arcade visitors currently or pregnant and cant vore someone.., You'll have to wait until I’m feeling a bit lighter or gave birth~  💗`);
        }
        */

        
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
        const crawlFlavored = [
            "That's it~ On your hands and knees like a good pet. Crawl into my belly where you *belong* — nice and slow, so I can savor every inch~ 💦",
            "Didn't even need to lift a finger~ You're already crawling into my womb like the needy little prey you are. I *love* that in a meal~ 💋",
            "Mmm~ Watching you push yourself inside me is such a *turn on*. Keep going... deeper… round me out from the inside~ 💗",
            "Such obedience~ You’re so desperate to be mine, you’re climbing right into your soft prison~ My belly's waiting, and it doesn't let go~ 😘",
            "Begging wasn't needed — your actions told me everything. Now crawl in, slowly… I want to feel every movement as you settle inside where you *truly* belong~ 🔥",
            "You chose this, love~ Now don’t stop. Feel me stretch around you as you disappear inside. My belly *owns* you now, and you’ll feel that with every squirm~ ✨",
            "So needy… so desperate to be swallowed whole without even a gulp. Go on, make yourself part of my roundness~ You’re not leaving until I say so~ 💖"
        ];
        
        let selected;
        const chance = Math.random();
        const devourFlavored = [...sweet, ...teasing, ...spicy];
        const imgLink = getImageByTag(voreBellyImages, entryMethod);
    
        if (chance <= 0.01) {
            selected = nsfwRare[Math.floor(Math.random() * nsfwRare.length)];
        } else {
            const pool = entryMethod === 'crawl' ? crawlFlavored : devourFlavored;
            selected = pool[Math.floor(Math.random() * pool.length)];
        }

        const entryCheck = entryMethod === 'crawl' ? "💖 Crawled into Elise 💖" : "💖 Devoured by Elise 💖";
        const embed = createEmbed(
            entryCheck,
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

            if(targetUser.id === ELISE_ID) {
                return await interaction.reply({ content: '😤 You can’t devour yourself, silly~ Use `/devourme target:@user` On someone else if your hungry 😘~ 💕' });
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

        const promtRequestTitle = entryMethod === 'crawl' ? "🥺 Unbirth Request 🥺" : "🥺 Devour Request 🥺";
        const promptDescription = entryMethod === 'crawl' ? `${targetName} wants to crawl into your belly~ 💖 Accept or Deny within 1min Mommy Elise` : `${targetName} wants to be devoured~ 💖 Accept or Deny within 1min Mommy Elise`
        const promptEmbed = createEmbed(
            promtRequestTitle,
            promptDescription,
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
                let bellyContent;

                if (entryMethod === 'crawl') {
                    bellyContent = `💗 Ohh~ ${targetName}... crawling in like the perfect little plaything you are~ \nEvery inch of you pressing in deeper… slow and obedient~ That’s it, fill me up from the *inside*.\nYou're staying in there, nice and round — because I said so~ 💋`;
                } else {
                    bellyContent = `💗 Mmm~ ${targetName}, you should’ve known better than to tempt me~ \n *Gulp, gulp... gulp* — and just like that, you’re mine.\nCurled up inside me, stretching me out deliciously~ No escape now, darling~ 😘`;
                }

                await i.update({ content: bellyContent, embeds: [embed], components: [] });
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