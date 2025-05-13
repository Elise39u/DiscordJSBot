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
            1. Make the YUME Diva video idea in editing 
            2. Once V3 is on the planning update all the outfits to V3 booba size... Change everything to fit this change. 3, 4 are part of this *Currently working on: WIP**
            3. Try to make Ref sheets for all the looks including pregnant and non pregnant versions. (Mabye try to learn posing in blender)
            4. Mabye the idea that mark depends your lipstick full and eyeliner color? To gain more in line with your mark **Currently working on: WIP**
            5. Rework the Visual upgrades into brand new day dresses with sekai stories more closer to card storys of the units.. Make it more foccused on the unit i got close too. 
            6. Change Brand new school dress their hair.
            7. https://www.color-meanings.com/neon-color-palettes/ See if this can be used back in the discord of color pallet 30.. Mabye logo or other visual ideas. 
            8. Make an Ultimate Elise dress based on the idea of Ultimate Miku to fit the Gurdian lore idea and our true powers
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
