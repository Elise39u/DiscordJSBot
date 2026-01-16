const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const { getImageByTag } = require('../helpers/bellyImageHandler');
const vtuberPictures = require('../Assets/vtuberPictures.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('arcadelook')
		.setDescription('How does my magical Arcade Sekai look.'),
	async execute(interaction) {
        let randomImage = getImageByTag(vtuberPictures, "belly_cam");
            if (!randomImage) {
                return await interaction.reply({
                    content: `❌ No image found with tag \`${tag}\`.`,
                    ephemeral: true
                 });
            } 
        
        const description  = `Curious how my magical Christmas Girly Gamer looks or how it works? Well let me show you in this little post
        
        🎮 **Arcade Main colors**
        The Main color pallete of the arcade is: Pastel Purple(#c3b1e1), Pink(#FFC0CB), Hot Pink(#FF69B4), Lighter Purple(#E6E6FA) and accents to support these colors like: (Think of accents to match these colors)
        Arcade machines hold thier iconic colors to match the games they hold inside them.
        The Neon lights often share a colors different to my main colors of sky blue(#609bf2) and teal green(#33af93) and Pink from the main colors.
        The Girly Gamer Arcade logo sign is mainly the Pastel pink(). 

        🎮 **Arcade Layout**
        You enter on the pastel pink terrace. Holding a large christmaly blooming decorated sakura tree. Surroding with pink benches to sit and relax.
        In front of you is the entry way into the arcade. With the Girly Gamer sign above the doors. To the right of that is the christmas tree where Lilliya asked me to marry. :3
        The pool is behind you. A beautifully chilling pool with a hot pool next to it. Beautifully white tiles surround the pool area while the pink colors return at the bar
        If you enter the arcade you find rows and rows of arcade machines fitting games of the eras i had in my life. Including ones never meants for arcades. 
        Of course their is our snack corner filled with all sorts of sweet and savory treats you will find in our arcade in my teal green. 
        Christmas decorationgs linger the halls as seen in my brand new arcade journey. 
        There is a recording studio specially for me as well as a luxery decorated master bedroom. Where i have devoured counteless vistors hihi. 
        Outside the arcade is a beautifull enchanted forest filled with pokemons. That will lead you to a look a like city resambling tokyo.

        🎮 **Christmas Arcade Decorations**
        The arcade is beautifull decorated with all sorts of chritstmas decorations. Christmas trees linger the halls representing my Arcades color pallete
        My master bedroom has its own colored christmas tree with decorations after my own color pallete. 
        AS well there is a special christmas village represnting my home planet of Aethernymonia. With little figurines of people i met in my life and loved. Even me highly pregnant to represnt my true identity as reminder :3.
        The halls are also decorated with special christmas tree leaves holding christmast ornaments
        The christmas lights go beautifully along the neon lights with their warm soft white light, While one main big christmas tree stands in the halls. 
        `    
        
        const description2= `
        Step into my **Magical Christmas Girly Gamer Arcade**! 🎮✨ A world of neon lights, festive warmth, and pink aesthetic.

        🎨 **Color Palette**
        • **Main:** Pastel Purple (\`#c3b1e1\`), Pink (\`#FFC0CB\`), Hot Pink (\`#FF69B4\`), and Lavender (\`#E6E6FA\`).
        • **Accents:** Neon Sky Blue (\`#609bf2\`) and Teal Green (\`#33af93\`).
        • **Atmosphere:** Warm soft white lights (\`#FDF5E6\`) mingling with vibrant neon signage.

        🏰 **The Arcade Layout**
        • **The Terrace:** A pastel pink entrance featuring a blooming Sakura tree and the Christmas tree where Lilliya proposed! :3
        • **Pool Area:** Chilling white-tiled pools and a hot tub with a pink-accented bar.
        • **The Floor:** Endless rows of machines from every era and my signature Teal Green snack corner.
        • **Private Quarters:** A professional recording studio and my luxury master bedroom—where I’ve devoured many visitors... hihi.
        • **Surroundings:** An enchanted Pokémon forest leading to a Tokyo-inspired city.

        🎄 **Festive Touches**
        • **Aethernymonia Village:** A miniature village featuring figurines of my loved ones—including a highly pregnant me to represent my true identity!
        • **Decorations:** Trees throughout the halls matching the arcade’s palette, draped in festive leaves and shimmering ornaments.
        • **The Centerpiece:** One massive, glowing Christmas tree stands guard over the main hall.
        `;

        const embed = createEmbed(
            `How does the Christmas Girly Gamer Arcade look `,
            description2,
            randomImage,
            "🎀 Christmas Girly Gamer Arcade Looks. {{ Last updated {DATE} }}🎀"
        );

	    await interaction.reply({ embeds: [embed] });
	},
};