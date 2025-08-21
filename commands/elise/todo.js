const { SlashCommandBuilder } = require('discord.js');
const { errorHandeler } = require('../helpers/errorHandler');
const { createEmbed } = require('../helpers/embedBuilder');
const { ELISE_ID } = process.env;

// Set to track cooldowns (unauthorized users)
const cooldown = new Set();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('todo')
		.setDescription('this command is for Elise themself. An note on what they plan to do for their content-creation.'),
	async execute(interaction) {
        if (interaction.user.id !== ELISE_ID) {
                // Handle cooldown
                if (!cooldown.has(interaction.user.id)) {
                    cooldown.add(interaction.user.id);
    
                    // Try to send a DM to Elise
                    try {
                        const eliseUser = await interaction.client.users.fetch(eliseId);

                        const guildName = interaction.guild?.name || "DMs or Unknown Server";
                        const channelMention = `<#${interaction.channel.id}>`;

                        await eliseUser.send(`⚠️ Mammy Someone tried to see your todo list :(! \n **User:** ${interaction.user.tag} (${interaction.user.id}) \n **Server:** ${guildName} \n**Channel:** #${channelMention}`);
                    } catch (err) {
                        await errorHandeler(err.message, 0xff0000, "DM_ELISE_ERR", "todo");
                    }
    
                    // Remove user from cooldown after 1 minute
                    setTimeout(() => {
                        cooldown.delete(interaction.user.id);
                    }, 60_000);
                }

            const embed = createEmbed(
                `❌ Error user id mismatch ❌`,
                "Sorry only Elise is allowed to use this command",
                null,
                "❌ Error elise their id not found ❌",
                0x992D22
            );

            return await interaction.reply( { embeds: [embed] , ephemeral: true});
        }

        const description = `
            1. Once V3 is on the planning update all the outfits to V3 booba size... Change everything to fit this change. 2, 3, 4 are part of this **Currently working on: WIP**
            2. Try to make Ref sheets for all the looks including pregnant and non pregnant versions. (Mabye try to learn posing in blender) **Currently working on: WIP**
            3. Mabye the idea that mark depends your lipstick full and eyeliner color? To gain more in line with your mark **Currently working on: WIP**
            4. Rework the Visual upgrades into brand new day dresses with sekai stories more closer to card storys of the units.. Make it more foccused on the unit i got close too. 
            5. Change Brand New sekais dresses to fit lore better like Empty and School ones hair. 
            6. https://www.color-meanings.com/neon-color-palettes/ See if this can be used back in the discord of color pallet 30.. Mabye logo or other visual ideas. 
            7. Stellar Type Elise (Type crystals as bottom and top line on lower part of dress, With the main crystal pointing to terapgoes heaxgones with types: https://admin.esports.gg/wp-content/uploads/2023/12/pokemon-scarlet-violet-stellar-type-1568x882.jpg)
            8. Rewrite Elif lore to fit the Girly game arcade lore. Include your goddess powers too
        `;

        const embed = createEmbed(
            `🎀 Elise todo list for the server. 🎀`,
            description,
            null,
            "🎀 Todo list mammy elise🎀"
        );
	    await interaction.reply({ embeds: [embed] });
	},
};
