const passport =require('passport')
const GoogleStrategy=require('passport-google-oauth20');

let User=require('../models/user')
const DB=require('../db.config')
User=DB.User


passport.serializeUser((user, done) => {
    done(null, user.user_id); // Utilisez user.user_id au lieu de user.id
  });
  
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { user_id: id } }).then((user) => {
      done(null, user);
    });
  });
  
passport.use(
    new GoogleStrategy(
        {
            // option for google strategy
            callbackURL: '/auth/google/redirect',
            clientID: process.env.clientID,
            clientSecret: process.env.clientSecret,
            passReqToCallback: true, // Permet de passer req à la fonction de rappel
        },
        (req, accessToken, refreshToken, profile, done) => {
            // callback passport function
            console.log('passport callback');
            console.log(profile);

            // Vérifiez si le profil ou l'ID est défini
            if (!profile || !profile.id) {
                return done(new Error('Profil Google non valide'));
            }

            // check if user already exists in database
            User.findOne({ where: { googleId: profile.id } }).then((currrentUser) => {
                if (currrentUser) {
                    console.log('user is already exist ', currrentUser);
                    done(null, currrentUser);
                    // already exist in the database
                } else {
                    // this user is not in the database
                    User.create({
                        
                        prenom: profile.name.familyName,
                        googleId: profile.id,
                    })
                        .then((newUser) => {
                            console.log('new user created:', newUser);
                            done(null, newUser);
                        })
                        .catch((err) => {
                            console.error(err);
                            return done(err);
                        });
                }
            });
        }
    )
);
