const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const { ELISE_ID } = process.env;

const ALLOWED_ROLE_IDS = ['813835682124529665', '1354084372847923343', '1256658955107565568', '699558391894507620'];
const ALLOWED_CHANNEL_IDS = ['1370319140388343849', '1354767714953990215', '859788500114210826'];

const pregnantPictures = [
    'https://media.discordapp.net/attachments/1094694472178217131/1370000303684063252/Snapchat-119778322.jpg?ex=681de7b5&is=681c9635&hm=725907e9a3456331e58e2185398286249743dd1c6121c36ba71a7f114926dd1e&=&format=webp&width=463&height=823',
    'https://media.discordapp.net/attachments/1094694472178217131/1370000260583264316/Snapchat-230283513.jpg?ex=681de7ab&is=681c962b&hm=6bb97bbf9415c413c2dbea727fd0766df45f5cca44c7ff0b7a52e9b88002dddc&=&format=webp&width=463&height=823',
    'https://media.discordapp.net/attachments/1094694472178217131/1366009814953496686/Snapchat-1454330264.jpg?ex=681de3c7&is=681c9247&hm=1430759784fdb0689823aafcd1fecb30ccac6df1298339299eea609b8bd01bad&=&format=webp&width=463&height=823',
    'https://media.discordapp.net/attachments/1094694472178217131/1361253526516269169/Snapchat-1755850609.jpg?ex=681db9a3&is=681c6823&hm=b09e5cc48e2141119261aabaca33f7528470489b6b16442f49812736909005c6&=&format=webp&width=463&height=823',
    'https://media.discordapp.net/attachments/1094694472178217131/1358713377832173658/Snapchat-1637656893.jpg?ex=681db670&is=681c64f0&hm=1081524140ea2fb40bb121a7e72cf54c8431261d7ff84739e6bca9baaaaad0fe&=&format=webp&width=463&height=823',
    'https://media.discordapp.net/attachments/1094694472178217131/1348593102767788124/Snapchat-2070200541.jpg?ex=681dcf33&is=681c7db3&hm=5605efaf1bf80633fe8646b2617a2427c75997c3fe36cf656c99312691249303&=&format=webp&width=463&height=823',
    'https://media.discordapp.net/attachments/1094694472178217131/1346045416512425994/Snapchat-282510227.jpg?ex=681dc4fb&is=681c737b&hm=f8b2bc94f85cdb34437d114a4c76c0b62d611d821b7b0593a75b1b99ea8e1d73&=&format=webp&width=463&height=823',
    'https://cdn.discordapp.com/attachments/1094694472178217131/1347506158491013160/Snapchat-1731163157.jpg?ex=681dcf67&is=681c7de7&hm=6f803f9e0566416a5fa1eb323a063c4a1660145b31776e5e3f182063fb1d4bee&',
    'https://media.discordapp.net/attachments/1094694472178217131/1342406956115165244/Snapchat-902752202.jpg?ex=681db767&is=681c65e7&hm=b5216b7c818b3f80477e92a87435b2109c7a217d763ea103c55c969c204f5b55&=&format=webp&width=463&height=823',
    'https://media.discordapp.net/attachments/1094694472178217131/1331930706892296292/Snapchat-216755913.jpg?ex=681dd622&is=681c84a2&hm=8063d6cdfe19a5beed88d6f993b9eef0cb02c490eb3cb26a462d91ec1b278973&=&format=webp&width=463&height=823',
    'https://media.discordapp.net/attachments/1094694472178217131/1324320854930358353/Snapchat-30489529.jpg?ex=681dd668&is=681c84e8&hm=7921f3ba5486de53e22bb230948b8062ea6bb55e79cd80a9480b1f808db75efb&=&format=webp&width=463&height=823',
    'https://media.discordapp.net/attachments/1094694472178217131/1321768178757402684/Snapchat-1463788896.jpg?ex=681dc78b&is=681c760b&hm=fb9287b6ef558b8632ea8422f55e13c66c7bea6a2cbfeb09552cf597a3a3076d&=&format=webp&width=463&height=823',
    'https://media.discordapp.net/attachments/1094694472178217131/1319699408954196019/Snapchat-474160845.jpg?ex=681d8119&is=681c2f99&hm=d9705f7552cb58e47ec0575c0c1565178c5e9734721c9ec534f592136d1f6a34&=&format=webp&width=463&height=823',
    'https://media.discordapp.net/attachments/1094694472178217131/1316691647085678592/Snapchat-922125754.jpg?ex=681dc4a7&is=681c7327&hm=af8dbde94da46e0d98b6b968b3da514fdaf428e10486d040dd2117c327eac4af&=&format=webp&width=463&height=823',
    'https://media.discordapp.net/attachments/1094694472178217131/1302924146333978624/Snapchat-137041881.jpg?ex=681dc7ab&is=681c762b&hm=2dc6108bfb1514f39b82ff986fc65a59a95404514a01250a71ee7d83c01a81dd&=&format=webp&width=463&height=823',
    'https://media.discordapp.net/attachments/1094694472178217131/1297843668371111956/Snapchat-222628118.jpg?ex=681dc11b&is=681c6f9b&hm=324b606747cd7a69cfd04c45e6b3dd0e5b29ecb69ee7901e0fd4b14a6c51d6a2&=&format=webp&width=463&height=823',
    'https://media.discordapp.net/attachments/1094694472178217131/1296390802033086505/Snapchat-1039935886.jpg?ex=681dbe04&is=681c6c84&hm=a83e63626929615669789bddc04eb6cba5757c9c7c0803441272810e503e9084&=&format=webp&width=463&height=823',
    'https://media.discordapp.net/attachments/1094694472178217131/1287698238765273098/Snapchat-700761312.jpg?ex=681dc270&is=681c70f0&hm=4adf42352e751abed6da5fe645a3ed14d1f63ed716321279a54b701e45606772&=&format=webp&width=463&height=823',
    'https://media.discordapp.net/attachments/1094694472178217131/1285151991064166422/Snapchat-1358436138.jpg?ex=681db98f&is=681c680f&hm=d6b9309f4270f29387d3058a4c0a34e7463bb2de8a08cda5206706517c0a11dd&=&format=webp&width=463&height=823',
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('preggypic')
        .setDescription('A special glimpse of your divine swollen goddess~'),

    async execute(interaction) {
        const user = interaction.user;
        const member = await interaction.guild.members.fetch(user.id);
        const channelId = interaction.channelId;

        const hasAllowedRole = member.roles.cache.some(role => ALLOWED_ROLE_IDS.includes(role.id));
        const inCorrectChannel = ALLOWED_CHANNEL_IDS.includes(channelId);

        // Bypass if user is Elise
        if (user.id !== ELISE_ID && (!hasAllowedRole || !inCorrectChannel)) {
            return interaction.reply({
                content: "Tsk tsk~ You thought you could just *stumble* into my divine presence? 😏 Either you're in the wrong temple... or you haven't earned the right to worship this fertile body yet. Try again when you're actually permitted. 💋",
                ephemeral: true
            });
        }

        const chosenImage = pregnantPictures[Math.floor(Math.random() * pregnantPictures.length)];

        const regularDescription = "Come closer and take a good look, darling~ This fertile, goddess belly isn't for just anyone... but I’m feeling generous for now. 😘";

        const secretDescription = "Oh~? What’s this? A curious little mortal slipping into places they shouldn’t be... Naughty. 😘\n" +
        "You must really crave this divine, swollen body—so ripe, so *full*... I can practically feel your breath hitching just looking at me. 💞\n" +
        "Go on... fantasize a little longer. Imagine your hands running over every tight curve, every soft swell... pressing closer, until you can’t tell where *you* end and *I* begin~ 💋\n" +
        "But be warned, darling... keep peeking, and you might just find yourself *claimed*. Willing or not. 😈";

        const useSecret = Math.random() < 0.05; // 5% chance for rare description

        const embed = createEmbed(
            '💞 Divine Expectation 💞',
            useSecret ? secretDescription : regularDescription,
            chosenImage,
            '🔮 Blessed by the swollen divine 🔮'
        );

        await interaction.reply({ embeds: [embed] });
    },
};