const jwt = require('jsonwebtoken')
const db = require('../models/db')

module.exports = async(req, res, next) => {
    try {

        const authorization = req.headers.authorization
        if (!authorization) {
            throw new Error('Unauthorized')
        }
        if (!(authorization.startsWith('Bearer '))) {
            throw new Error('Unauthorized')
        }
        const token = authorization.split(' ')[1]
        console.log('process.env.JWT_SECRET', process.env.JWT_SECRET)
        const payload = jwt.sign(token, process.env.JWT_EXPIRES_IN)
        console.log('payload1', payload)

        const user = await db.user.findFirstOrThrow({ where: { id: payload.id } })
            // delete user.password
        console.log('user1', user)
        req.user = user
        next()

    } catch (err) {
        next(err)
    }

}