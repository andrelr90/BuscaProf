let sessionConfig = (app, session) => {
    const SESSION_CONFIG = {secret: 'TESTE',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 30 * 60 * 1000 }//30min
    };
    app.use(session(SESSION_CONFIG));
}

let passportConfig = (app, passport, LocalStrategy) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy( {
            usernameField: "email",
            passwordField: "password"
        },
        function(email, password, done) {

            //const user = new User(email, password);
            
            console.log("PassportTest");
            let userFound = true;
            let err = false;
            let submittedPassword = password;
            let user = {email: email, password: submittedPassword};
            console.log("A")
            console.log(user)
            const validPassword = true;
            
            //const {user, userFound, validPassword, err} = UserController.findUserByEmail(user);
            user.id = 1;

            if (err) { 
                return done(err); 
            }
            if (!userFound) {
                return done(null, false, { message: 'Email not found.' });
            }
            if (!validPassword) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        }    
    ));

    passport.serializeUser((user, done) => {
        console.log("SerializeUser");
        const cookie = {id: user.id, group: 'teste'};
        done(null, cookie);
    });

    passport.deserializeUser((user, done) => {
        console.log("DeserializeUser");
        //const {userFound, user} = UserController.findUserbyId(id);
        console.log(user)
        const cookie = {
            id: user.id,
            group: user.group
        };
        let userFound = true;
        console.log(cookie)
        if (userFound) {
            done(null, cookie)
        }
        else {
            done(null, false)
        }
    });
}

module.exports = { sessionConfig, passportConfig };