const getRank = async (db, query) => {

    const getFromEntryCount = async(entries) => {
        return await db.select('entries')
            .from('users')
            .orderBy('entries', 'desc')
            .then(result => {
                console.log('result', result);
                console.log(result.map(obj => obj.entries));
                return result.map(obj => obj.entries).indexOf(entries) + 1;
            });
    }
    
    console.log('query', query);
    let returnVal = undefined;
    switch (typeof query){
        case 'object':
            let rank  = await getFromEntryCount(query.entries);
            returnVal = Object.assign({}, query, {rank});
            console.log('return', returnVal);
            break
        case 'string':
            returnVal = await getFromEntryCount(query)
            console.log('return', returnVal);
            break
        default:
            return -1;
    }
    return returnVal;
}

module.exports = { getRank }