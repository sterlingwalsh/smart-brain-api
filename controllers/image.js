const clarifai = require('clarifai')

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
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
    handleImage,
    handleApiCall
}