const passport = require('passport');
const User = require('../auth/User');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
const GitHubStrategy = require('passport-github2').Strategy
passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email, password, done){
        User.findOne({email}).then(user =>{
            bcrypt.compare(password, user.password, function(err, result){
                if(err){return done(err)}
                if(result) {return done(null, user)}
            });
        }).catch(e =>{
            return done(e)
        })
    }
))
passport.use(new GitHubStrategy({
    clientID: '290aab93de8fd9d78246',
    clientSecret: '06ad84435cbaef1b7d608528c63fd604d92fb40b',
    callbackURL: "http://127.0.0.1:8000/api/auth/github",
    scope: [ 'user:email' ]
  },
  async function(request, accessToken, refreshToken, profile, done) {
    const user = await User.find({githubId: profile.id});
    const newUser = await new User({
        githubId: profile.id,
        full_name: profile.login,
    }).save()
    return done(null, newUser);
  }
));

passport.serializeUser(function(user, done){
    done(null, user._id)
})

passport.deserializeUser(function(id, done){
    User.findById(id).then((user, err) =>{
        done(err, user)
    })
})