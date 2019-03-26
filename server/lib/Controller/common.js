const { getUserInfoModel } = require('../Model/utils');
exports = module.exports = {
    async getUserInfoController (req, res) {
        console.log(req.route);
        const userInfo = await getUserInfoModel(req.session.member_id);
        res.status(200).json(jsonReturn(userInfo))
    }
};