const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('egs')
		.setDescription('what does EGS stand for in the youtube series. '),
	async execute(interaction) {
        const description = `
            Curious about what EGS stands for? It means **Elise Gender Story** — or simply, my transgender journey. 🌸

            Even though I have special powers and a unique role in this world, being seen and accepted as a trans girl on Earth is still really hard. I mean, by your world's rules, I shouldn’t be able to get pregnant — yet here I am. So how did it come to this?

            What led me to reveal my identity, my powers… and why do I still struggle with understanding who I truly am? What *am* I? Why *am* I here?

            **EGS** is about all of that. My real experiences — from a quick 2-year recap of what led to my big decision, to deeper topics like identity, sexuality, and even something new: my upcoming *preggo neopronoun* idea.

            So if you're interested in hearing my story, you can click the title of this embed — it links to my EGS playlist on YouTube. Or if you're looking for more depth, check out <#1175925314229121074>, which holds my stories up to **EGS 27**.

            Thanks for wanting to understand me a little more. 💖
        `;

        const embed = createEmbed(
            `🎀 Elise her gender story 🎀`,
            description,
            'https://media.discordapp.net/attachments/709057115159003156/1242704164681678909/20220728164709_1.jpg?ex=67e0e771&is=67df95f1&hm=f0e56e58f3ceca9af7fe2e33e32018e50d6c44649a137f5fddc7f55108f7a4c2&=&format=webp&width=1461&height=823',
            "🎀 Elise Gender Story explained 🎀"
        );

        embed.setURL("https://www.youtube.com/watch?v=GxUxIMQsYP4&list=PLNc-vlTat7viUYY1BuxU1T563gskQpvJJ")
	    await interaction.reply({ embeds: [embed] });
	},
};
