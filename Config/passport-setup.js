const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Models/userSchema'); // Adjust the path as needed

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
            // User already exists
            done(null, currentUser);
        } else {
            // Create new user
            new User({
                username: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value
            }).save().then((newUser) => {
                done(null, newUser);
            });
        }
    });
}));
