const Action = require('./actions-model');

const checkId = async (req, res, next) => {
    console.log(req.params.id);
    const action = await Action.get(req.param.id);
    console.log(action)

    try {
        if (!action) {
            res.status(404).json({ message: 'Action not found.' })
        } else {
            req.action = action;
            next();
        }
    }
    catch (err) {
        next(err);
    }

}

module.exports = {
    checkId,
}