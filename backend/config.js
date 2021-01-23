const userController = require("./src/controller/UserController");

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
        async function(email, password, done) {

            //const user = new User(email, password);
            
            console.log("PassportTest");
            let submittedPassword = password;
            const validPassword = true;
            
            const {user, userFound, err} = await userController.getUserByEmail(email);
            
            // todo check password

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
        const cookie = {id: user.id, name: user.email, group: 'teste'};
        done(null, cookie);
    });

    passport.deserializeUser(async (deserializedUser, done) => {
        console.log("DeserializeUser");
        const {user, userFound, err} = await userController.getUserById(deserializedUser.id);
        console.log(user)
        const cookie = {
            id: user.id,
            name: deserializedUser.name,
            group: deserializedUser.group
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