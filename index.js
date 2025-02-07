const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config();
const { DISCORD_TOKEN } = process.env;
const { createEmbed } = require('../DiscordBot/commands/helpers/embedBuilder')

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
	const channel = client.channels.cache.get('822837640872067082');
	const embed = createEmbed(
		`Digital Assistant v0.1.1 Has launched`,
		`Mommy i have launched without any issues and im now live :3. I have to urge to pat my belly`,
		'https://cdn.discordapp.com/attachments/709057115159003156/1337417775429189673/Screenshot_74.png?ex=67a75edd&is=67a60d5d&hm=2df6b38df7e8995a49414dc34a8b875d2239cbd0dcbf01bc6c069cba4f65f656&'
	);

	channel.send({ embeds: [embed] });

	client.user.setPresence({ 
        status: 'online',
        activities: [
            {
                name: 'Having preggo thoughts while wandering in this sekai',
				type: ActivityType.Watching
            }
        ]
    });
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	};
});

// Log in to Discord with your client's token=
client.login(DISCORD_TOKEN);