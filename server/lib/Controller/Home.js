const { promiseAll } = require('../utils');
const { getActiyityGoodsController, getGoodsListController, getHotGoodsController, getLikeGoodsController } = require('./Goods');

exports = module.exports = {
    async getHomeDataController (req, res) {
        const [activeGoodsList, basicGoodsList, hotGoodsList, likeGoodsList] = await promiseAll([getActiyityGoodsController(), getGoodsListController(), getHotGoodsController(), getLikeGoodsController()]);
        res.status(200).json({
            activeGoodsList: activeGoodsList[1],
            hotGoodsList: hotGoodsList[1],
            basicGoodsList: basicGoodsList[1],
            likeGoodsList: likeGoodsList[1]
        })
    }
};

