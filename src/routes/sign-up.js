const bcrypt = require('bcryptjs')
const User = require('../model/User')

module.exports = {
    method: 'GET',
    path: '/sign-up',
    handler: async ({payload}, h) => {
        // return 'Hello World'
        const encryptedPassword = await bcrypt.hash(payload.password, 12)
        const user = await User.create({
            ...payload,
            encryptedPassword
        })
        return user
    }
}