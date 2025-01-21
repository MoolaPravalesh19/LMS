
const LocalStrategy = require('passport-local').Strategy;
const Student = require('../models/student');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

module.exports = function(passport) {
    passport.use('student', new LocalStrategy(
        async (username, password, done) => {
            try {
                const user = await Student.findOne({ username });
                if (!user) return done(null, false, { message: 'Incorrect username.' });

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));

    passport.use('admin', new LocalStrategy(
        async (username, password, done) => {
            try {
                const user = await Admin.findOne({ username });
                if (!user) return done(null, false, { message: 'Incorrect username.' });

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));
    passport.use('issue', new LocalStrategy(
        async (libraryid , done) => {
            try {
                const library = await Admin.findOne({ libraryid });
                if (!library) return done(null, false, { message: 'Incorrect library.' });

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));

    passport.serializeUser ((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser (async (id, done) => {
        // You can implement logic to find user in either collection based on the id
        // For simplicity, we will just return null here
        done(null, null);
    });
};
