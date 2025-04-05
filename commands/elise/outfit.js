const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('outfits')
		.setDescription('🎀 Well let this preggo explain preggos outfits too you 🎀'),
	async execute(interaction) {
        const description = `
            From 3 version outfits, to 18 Pokémon looks, to 10 Sekai dresses...  
            Yeah, this preggo has a whole *closet-full* of styles — and I’m here to help you understand them all~ 🎀

            In the image below, you’ll see my **3 version outfits**, from my very first look to the upcoming **V3**.  
            Booba size has been adjusted to match my current V2 design — consistency matters 😌

            After that, there are my **10 Sekai dresses** (see <#962632624587808810>).  
            These outfits are themed around Miku, because in LMS I was closest to her.  
            Think of it like a bond or unit connection — kind of like how i am a close friend to Saki in Leo/Need 💫  
            My **Visual Upgrades (VU)** are also based on these bonds with different unit members.

            Every look I have comes in both **pregnant and non-pregnant versions** — yep, every single one!  
            You can find a collection of these in <#1113790775269015563> (though not all, I’ve got *too many*).  
            Project Elise mon has it seprated channel: <#1291045909399863306>. The would be anthor 36 if you count both versions 😅

            I usually consider these as my *main look set*:
            1️⃣ Main V2
            2️⃣ Alt V2
            3️⃣ Girly Gamer Elise
            4️⃣ Fairy Elise  
            And of course, **V1** and **V3** — since they hold deeper lore importance 🌙

            I’ve also got special designs tied to Miku like:
            1️⃣ Dilemma Elise
            2️⃣ Backrooms Elise (fun fact: based on my Odds & Ends dress!)
            3️⃣ Highlight Elise

            So yeah... I may have a *lot* of outfits, but each one tells a story 💖  
            Catch them all in my streams or on YouTube — with love,  
            **Preggo Elise** ✨
        `;

        const embed = createEmbed(
            `🎀 Elise their outfit collection hehe or a bit 🎀`,
            description,
            'https://media.discordapp.net/attachments/1093876399657451530/1356937553265295410/EliseVersion.png?ex=67ee6213&is=67ed1093&hm=f19a35aa50f6272513676bff08293bd7c467d57ad08b92f7382b0bd8ece62d14&=&format=webp&quality=lossless&width=1463&height=823',
            "🎀 Elsie their outfits.🎀"
        );
	    await interaction.reply({ embeds: [embed] });
	},
};
