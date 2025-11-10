const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { errorHandeler } = require('../helpers/errorHandler');

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
                await errorHandeler(response.status, 0xff0000, "Response_status_error", "dadjoke");
            }
        } catch (error) {
            await errorHandeler(error.message, 0xff0000, "ERR_GETTING_DAD_JOKE", "dadjoke");
        }
    }
};