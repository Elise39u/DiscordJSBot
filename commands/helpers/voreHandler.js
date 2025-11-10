const fs = require('fs');

const BELLY_PATH = './belly.json';

function getBellyData() {
    if (!fs.existsSync(BELLY_PATH)) return { swallowedUsers: [] };
    return JSON.parse(fs.readFileSync(BELLY_PATH, 'utf8'));
}

function saveBellyData(data) {
    fs.writeFileSync(BELLY_PATH, JSON.stringify(data, null, 4));
}

function getRandomSecretMessage(type) {
    const chance = Math.random();
    if (chance > 0.15) return null; 

    const secretMessages = {
        mark: [
           "You feel that? That’s me, *claiming* you~",
            "Ssshhh... Let my belly do the talking~",
            "Keep struggling. It only makes me purr louder~",
            "Soft, warm, *inescapable*. That’s how I like my meals 💄",
            "I don’t eat fast food... unless you count *you*~",
            "A little wriggle toy, right where you belong~",
            "You wanted my attention? Now you're getting all of it 💅",
        ],
        digest: [
            "From snack to padding. Mmm, you wear well on me~",
            "Guess you *were* built to be food after all~",
            "Hope you enjoyed the ride… not that you had a choice 😘",
            "Burp~ Oh my, did I say your name with that?~",
            "I metabolized your dignity first 💋",
            "Another mortal reduced to softness. You *should* be flattered~",
            "Some people leave legacies. You left *thighs*~",
        ]
    };

    const pool = secretMessages[type];
    return pool[Math.floor(Math.random() * pool.length)];
}

async function markUser(member, MARKED_ROLE_ID) {
    const belly = getBellyData();

    if (!member.roles.cache.has(MARKED_ROLE_ID)) {
        await member.roles.add(MARKED_ROLE_ID);

        if (!belly.swallowedUsers.some(u => u.id === member.id)) {
            belly.swallowedUsers.push({
                id: member.id,
                username: member.user.username,
                markedAt: new Date().toISOString()
            });
            saveBellyData(belly);
        }
        return { status: 'marked', secret: getRandomSecretMessage('mark') };
    }

    return { status: 'already_marked' };
}

async function digestUser(member, MARKED_ROLE_ID, DIGESTED_ROLE_ID) {
    const belly = getBellyData();

    if (!member.roles.cache.has(MARKED_ROLE_ID)) {
        return { status: 'not_marked' };
    }

    await member.roles.remove(MARKED_ROLE_ID);
    await member.roles.add(DIGESTED_ROLE_ID);

    belly.swallowedUsers = belly.swallowedUsers.filter(u => u.id !== member.id);
    saveBellyData(belly);

    return { status: 'digested', secret: getRandomSecretMessage('digest') };
}

module.exports = {
    markUser,
    digestUser
};