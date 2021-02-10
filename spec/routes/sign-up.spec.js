const bcrypt = require('bcryptjs')

const SignUp = require('../../src/routes/sign-up');
const User = require('../../src/model/User');
const { expect } = require('chai');

describe('SignUp', function(){
    describe('#handler', function() {

        beforeEach(async function(){
            this.user = {
                email: 'john@doe.com',
                firstName: 'john',
                lastName: 'doe',
                password: 'mySecretPass'
            }
            this.expectedPassword = 'hashed-password'
            // sinon.stub(bcrypt, 'hash').resolves(this.expectedPassword)
            this.mockedBcrypt = sinon.mock(bcrypt)
            this.mockedBcrypt.expects('hash').once().resolves(this.expectedPassword)

            this.res = await SignUp.handler({ payload: this.user })
        })

        afterEach(async function(){
            await User.deleteMany({})
        })

        it('create the user in the database', async function() {
            expect(await User.countDocuments()).to.equal(1)
        })

        it('return user object', function(){
            expect(this.res).to.deep.include({
                email: this.user.email,
                firstName: this.user.firstName,
                lastName: this.user.lastName
            })
        })

        it('creates password hash', async function(){
            expect(await User.findOne()).to.have.property('encryptedPassword')
        })

        it('hashes the expected password', async function(){
            expect(await User.findOne()).to.have.property('encryptedPassword', this.expectedPassword)
        })
    })
})