const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../helpers/embedBuilder');
const { cleanExpiredClones } = require('../helpers/bellyUtils');
const fs = require('fs');
const path = './belly.json';
const { ELISE_ID } = process.env;

const bellyPictures = [
    'https://cdn.discordapp.com/attachments/1093876399657451530/1358746267018203136/Snapchat-1994583211.jpg?ex=67f4f692&is=67f3a512&hm=c514eb1cdc6c24d8feb7c7fadedaf8a650c442a2396f321d83d69ff3fd3cc0d9&',
    'https://cdn.discordapp.com/attachments/1093876399657451530/1358746267618115717/Snapchat-1713200016.jpg?ex=67f4f692&is=67f3a512&hm=be9ad8bd4bae83ce42035cecfd7ee1454a4b34a72621bb4002d6f3080666ae60&',
    'https://cdn.discordapp.com/attachments/1093876399657451530/1357737328541700157/Snapchat-2027329662.jpg?ex=67f496ac&is=67f3452c&hm=c054de694f17c303374df4ee53f29f4f09e4fbc5db88daea390aaf34e15d5d5c&',
    'https://cdn.discordapp.com/attachments/1093876399657451530/1358746266716340416/Snapchat-1110008326.jpg?ex=67f4f692&is=67f3a512&hm=4bdf64c3f16b600c21da59b601d3672feaf9b9ed9dc3a208eb44c3e5b81a365e&',
    'https://cdn.discordapp.com/attachments/1093876399657451530/1358746267324252241/Snapchat-1304575324.jpg?ex=67f4f692&is=67f3a512&hm=bace4afeb3ae054f6126fc27c96f3f1f4ec707f6f66a3459640693429908d2f0&',
    'https://cdn.discordapp.com/attachments/1093876399657451530/1366349610507046962/Snapchat-2139031327.jpg?ex=68109fbc&is=680f4e3c&hm=30cff518d97c202eb2f4de7007e8dcbdfdef6c2602cba809ed06ec68320daaf8&',
    'https://media.discordapp.net/attachments/1093876399657451530/1370001782574682142/Snapchat-687414354.jpg?ex=681de916&is=681c9796&hm=78ee6feb7ff5ae2cce198d8dd09fb8fa68a646589f7179174da96bdb0b1a00ba&=&format=webp&width=1463&height=823'
]

const voreBelly = [
    'https://media.discordapp.net/attachments/1093876399657451530/1361262470055989369/Snapchat-607535797.jpg?ex=67fe1df7&is=67fccc77&hm=d8fd6376a8aaae3ceebb00efdd6434bf460b4cb491463ec5abd2b918dbeb1bd3&=&format=webp&width=1463&height=823',
    'https://media.discordapp.net/attachments/1093876399657451530/1359470121269329920/Snapchat-875588561.png?ex=67f798b6&is=67f64736&hm=dab90d897c69b40d886ad3760c024cd48b405976f0b2ad3aa59acc7e35045747&=&format=webp&quality=lossless&width=1463&height=823',
    'https://cdn.discordapp.com/attachments/1093876399657451530/1363094060763578439/Snapchat-471598124.jpg?ex=6804c7c5&is=68037645&hm=e498f4c3bf0c55a13d5ad5639602e48a08871f7a21a6a52ac69f2d19f2202ee0&',
    'https://media.discordapp.net/attachments/1093876399657451530/1363439369779806399/Snapchat-446356551.jpg?ex=6806095d&is=6804b7dd&hm=97c3d4e163c23e688aea7e2c909f5022da1ceff2db974ffbbf825be6f60b025b&=&format=webp&width=1463&height=823',
    'https://cdn.discordapp.com/attachments/1093876399657451530/1366349610217635930/Snapchat-394441364.jpg?ex=68109fbc&is=680f4e3c&hm=9d145f88ee3a59252724c0d33f6542ebc3f8cd1f18b14efe5d8c119a2b49201c&'
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bellypics')
        .setDescription('I see your looking at my glorious divine belly'),
    async execute(interaction) {
    const actingUser = interaction.user;

    // Read or create status file
    let data = { isTooFullOrPregnant: false, swallowedUsers: [] };

    if (fs.existsSync(path)) {
        data = JSON.parse(fs.readFileSync(path, 'utf8'));
    } else {
        fs.writeFileSync(path, JSON.stringify(data, null, 4));
    }

    // Clean expired clones
    cleanExpiredClones(data);
    const randomImage = bellyPictures[Math.floor(Math.random() * bellyPictures.length)];
    const voreBellyImage = voreBelly[Math.floor(Math.random() * voreBelly.length)];

    let embed;
    
    // Check if the person already is in my divine belly :3
    if (data.swallowedUsers.some(u => u.id === actingUser.id)) {
        embed = createEmbed(
            '💋 Already Inside 💋',
            `Mmm~ I can still feel you squirming in there, You know i like the little kicks you give me.. Once inside you never want to get out because you like pleasing your goddess dont you?. 💞`,
            randomImage,
            '🔮 Claimed by the goddess 🔮'
        );
    } else {
        const isLewd = Math.random() < 0.05;
        const shouldDevour = Math.random() < 0.10;

        if(shouldDevour) {
            if(actingUser.id === ELISE_ID) {
                return interaction.reply({
                    content: "Silly goddess if your hungry.. Just devour someone with `/devourme:target` 💋",
                    ephemeral: true
                });
            } else {
                data.swallowedUsers.push({
                    id: actingUser.id,
                    username: actingUser.username,
                    isClone: false,
                    devouredAt: new Date().toISOString()
                });
                fs.writeFileSync(path, JSON.stringify(data, null, 4));


                embed = createEmbed(
                    '💞 Gulp and devoured by Elise.... 💞',
                    `Dont struggle now sweetheart your tasty.. You feel Elise their arms wraps around you as their boobs squish your body.. You look down and they nod.. One quick drink sweetheart as they undress their shirt revailing their black bra and you smirk at them. \n
                    *You start to suck on Elise their huge ass tits and their tits its nipples as they lean a bit back and moan.. It doesnt take long before you feel the milk dripping from their tits*.\n
                    *😈 Elise starts to kiss you on the lips in the neck as you feel plessured and plessrued.. As you look to them you see a smirk on their face and they licks her lips.. They juggels one of their tits before they opens their lips and swallows you whole..* \n
                    *💞 **Gulp.. Gulp** With struggle you slide down Elise their throat.. As you land in their dark but divine swollen belly now.. For some reason its warm and really comfy.. You wonder how long your goddess Elise will take you in.* \n
                    *You hear the goddes from the outside as you hear the muffed moans and something rubbing agianst Elist their outerwomb.. *
                    You were delicous and  a bit too sad to devour you but, ohhh im really big and heavy now... Be a good snack and squirm for mommy and i might have some plessure with you.. If you behave good snack.. Now squirm for mommy. 💖`,
                    voreBellyImage,
                    '🔮 Devoured and divine 🔮'
                );
            }
        } else {
                const description = `
                    Well, well... look who wandered in, dripping with curiosity. No need to hide it—your indulgent mommy goddess allows such needy little mortals to admire her. 
                    Come closer now, don't be shy. Give my big, swollen divine belly a nice rub. I don’t bite… unless you give me a reason to, darling~ 
                    And if you’re not careful, well… let’s just say I’m feeling a bit *peckish*, and you look absolutely delicious. 😘
                `;
                const lewdDescription = `
                    Oh~ So eager, aren't you? Staring at my divine belly like you *want* to be part of it. 
                    You could be rubbing from the outside now, but just imagine how much *tighter* and *warmer* it is inside… 
                    Keep tempting me, sweetheart, and I might just make you disappear *where you truly belong*. 💋
                `;

                embed = createEmbed(
                    `🎀 Elise and her divine belly 🎀`,
                    isLewd ? lewdDescription : description,
                    randomImage,
                    '🎀 Stellar genesis womb 🎀'
                );
            }
        }

        await interaction.reply({ embeds: [embed] });
    },
};
