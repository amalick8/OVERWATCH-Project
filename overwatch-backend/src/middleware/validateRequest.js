const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        // Format errors to be more readable
        const extractedErrors = errors.array().map(err => err.msg);
        throw new Error(extractedErrors.join(', '));
    }
    next();
};

module.exports = validateRequest;
