let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
let opts = {}
const mongoose = require("mongoose");
const userModel = mongoose.model("user");
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        userModel.findOne({id: jwt_payload.sub})
            .then(user => {
                if (user) {
                    return done(null, user)
                }
                return done(null, false);
            })
            .catch(err => {
                return done(err, false);
            })
    }));
}