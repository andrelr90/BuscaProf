const userController = require("./src/controller/UserController");

let sessionConfig = (app, session) => {
    const SESSION_CONFIG = {secret: 'TESTE',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 9999999999999999999999999}
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
        async function(email, password, done) {
            
            console.log("PassportTest");
            let submittedPassword = password;
            
            const {user, userFound, err} = await userController.getUserByEmail(email);

            if (err) { 
                return done(err); 
            }
            if (!userFound) {
                return done(null, false, { message: 'Email not found.' });
            }

            const validPassword = await userController.checkSamePassword(submittedPassword, user.password);
            
            if (!validPassword) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        }    
    ));

    passport.serializeUser((user, done) => {
        console.log("SerializeUser");
        const cookie = {id: user.id, name: user.email, group: user.professor};
        done(null, cookie);
    });

    passport.deserializeUser(async (deserializedUser, done) => {
        console.log("DeserializeUser");
        const {user, userFound, err} = await userController.getUserById(deserializedUser.id);
        console.log(user)
        const cookie = {
            id: user.id,
            name: user.name,
            group: user.professor
        };
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