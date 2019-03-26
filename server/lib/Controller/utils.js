const { getUserInfoModel } = require('../Model/utils');
exports = module.exports = {
    async getUserInfoController (req, res) {
        const userInfo = await getUserInfoModel(req.session.member_id, req.params.user_id);
        res.status(200).json(userInfo);
    }
};
