const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { ERROR_CHANNEL } = process.env

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dadjoke')
        .setDescription('Get a dad joke!'),
    
    async execute(interaction) {
        try {
            const response = await axios.get('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'https://github.com/Elise39u/DiscordJSBot'
                }
            });

            if (response.status === 200) {
                const jokeEmbed = {
                    color: 0x60A5FA,
                    title: 'Dad Joke',
                    description: response.data.joke
                };
                await interaction.reply({ embeds: [jokeEmbed] });
            } else {
                await errorHandling(interaction, response.status);
            }
        } catch (error) {
            await errorHandling(interaction, error.response?.status || 'Unknown Error');
        }
    }
};

async function errorHandling(interaction, status) {
    const loggingChannel = await interaction.client.channels.fetch(ERROR_CHANNEL);
    
    if (loggingChannel) {
        await loggingChannel.send('https://cdn.discordapp.com/attachments/709057115159003156/1109789108722741389/909558100162379877.gif');
        await loggingChannel.send(`<@203095887264743424> Halp Mommy Elise. I found an error status while trying to get a joke: **${status}**`);
    }
    
    await interaction.reply(`Oopsie, I found status code ${status}. I notified Mommy Elise, but for now, try again later for a new joke. ${interaction.user}`);
}