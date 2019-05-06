const clarifai = require('clarifai')
const dbTools = require('./dbTools');

const app = new Clarifai.App({
  apiKey: 'c7586c79ca384fc8a15d522745d555b0'
 });

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {return res.json(data)})
        .catch(err => res.status(400).json('Unable to retrieve information from api'));

}

const handleImage = (req,res, db) => {
    const {id} = req.body;
    db('users').where({id})
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            entries = entries[0];
            console.log('entries', entries);
            dbTools.getRank(db, entries)
            .then(rank => {console.log('got rank', rank); res.json({
                entries,
                rank})}
            );
        })
        .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
    handleImage,
    handleApiCall
}