const Tweet = require('../models/tweet');

const index = async (req, res) => {
    //seleciona os tweets referentes por suas datas, começando do maior para o menor
    const tweets = await Tweet.find({}).sort('-createdAt')
    return res.json(tweets);
}

const store = async (req, res) => {
    const tweet = await Tweet.create(req.body);

    req.io.emit('tweet', tweet);

    return res.json(tweet)
}


module.exports = {
    index,store
};