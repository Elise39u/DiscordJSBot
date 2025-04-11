/**
 * Removes expired clones after 24h.
 */
function cleanExpiredClones(data) {
    const now = new Date();
    data.swallowedUsers = data.swallowedUsers.filter(user => {
        if (user.isClone) {
            const devouredAt = new Date(user.devouredAt);
            const diff = now - devouredAt;
            return diff < 24 * 60 * 60 * 1000;
        }
        return true;
    });
}

/**
 * Returns whether Elise is pregnant (based on swallowed users).
 */
function isPregnant(data) {
    return getPregnancySource(data) !== null;
}

/**
 * Gets who Elise is pregnant by, if anyone, and it's within 24h.
 */
function getPregnancySource(data) {
    const now = new Date();
    return data.swallowedUsers.find(u => {
        const timeSince = now - new Date(u.devouredAt);
        return timeSince < 24 * 60 * 60 * 1000;
    }) || null;
}

/**
 * Formats who im pregnant of or have devoured :3 for the end embed of preg check
 */
function formatPregnancyLine(pregnancyData) {
    if (!pregnancyData) return '';

    const { by, amount, type, since } = pregnancyData;
    const pregTime = new Date(since).toLocaleString('en-GB');

    if (type === "clone") {
        return `🤰 Pregnant by **${by}** (clone) since \`${pregTime}\` ~ But there’s still *room for a snack or another clone*~ 💕`;
    } else {
        return `🍼 Elise is carrying **${amount > 1 ? amount + ' babies' : 'a baby'}** from **${by}** since \`${pregTime}\`. She can’t devour or clone right now~ 💗`;
    }
}

/**
 * Returns how many im pregnant of or how many i have swimming inside my belly
 */
function getBellySize(data) {
    return data.swallowedUsers?.length || 0;
}

/**
 * Checks if i still have room for a snack or 2.. Mabye more
 */
function hasRoomForMore(data) {
    // If not pregnant at all → can devour
    if (!data.pregnancy) return true;

    // Clone pregnancies still allow snacks
    return data.pregnancy.type === 'clone';
}

/**
 * formating function for the user list on the embed 
 */
function formatUserLine(user) {
    const devouredAt = new Date(user.devouredAt).toLocaleString('en-GB');
    const isClone = user.username.includes("Clone-Elise");
    const action = isClone ? 'Got Elise pregnant at' : 'Devoured at';
    return `• **${user.username}** - ${action}: \`${devouredAt}\``;
}

module.exports = {    
    cleanExpiredClones,
    isPregnant,
    getPregnancySource,
    formatPregnancyLine,
    getBellySize,
    hasRoomForMore,
    formatUserLine,
};