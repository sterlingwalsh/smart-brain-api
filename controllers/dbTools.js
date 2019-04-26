const getRank = async (db, entries) => {
    return await db.select('entries')
        .from('users')
        .orderBy('entries', 'desc')
        .then(result => {return result.map(obj => obj.entries).indexOf(entries) + 1});
}

module.exports = { getRank }