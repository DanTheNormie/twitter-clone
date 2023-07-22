const fs = require('fs');
const passport = require('passport');
const path = require('path');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

console.log(__dirname);

const pathToKey = path.join(__dirname,'..','SecretKeys','id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const options = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};


const strategy = new JwtStrategy(options, async(payload, done) =>{
    try{
        const user = await User.findOne({_id: payload.sub})
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    }catch(err){
        return done(err, null);
    }
})

module.exports = (passport)=>{
    passport.use(strategy)
}