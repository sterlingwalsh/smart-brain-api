const getRank = async (db, query) => {

    const getFromEntryCount = async(entries) => {
        return await db.select('entries')
            .from('users')
            .orderBy('entries', 'desc')
            .then(result => {
                return result.map(obj => obj.entries).indexOf(entries) + 1;
            });
    }
    
    console.log('query', query);
    let returnVal = undefined;
    console.log("get rank", query);
    switch (typeof query){
        case 'object':
            let rank  = await getFromEntryCount(query.entries);
            returnVal = Object.assign({}, query, {rank});
            break
        case 'string':
            returnVal = await getFromEntryCount(query)
            break
        default:
            return -1;
    }
    console.log("get rank return", returnVal);
    return returnVal;
}

module.exports = { getRank }