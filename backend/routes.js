const userController = require("./src/controller/UserController.js");
const path = require("path")

function passportLogin(passport) {
    return (req, res, next) => {
        return passport.authenticate('local', (err, user, info) => {
            
            console.log("PassportLogin");
            console.log(info);
            if (err) {
                throw err;
            }
            if (!user) {
                res.send(info)
            }
            else {
                req.login(user, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("QQ")
                    res.send("Logged in")
                })
            }
        })(req, res, next);
    }
}

function passportCheckLogin(group) {
    return (req, res, next) => {
        console.log("PassportCheckLogin");
        if (req.isAuthenticated() && req.user.group === group) {
            return next();
        }
        res.redirect('/');
    }
}

function passportLogout() {
    return (req, res, next) => {
        console.log("PassportLogout");
        req.logout();
        res.redirect('/');
    }
}

let setupRoutes = (app, passport) => {
    
    app.post("/teste", (req, res) => {
        console.log("Teste");
        const teste = req.body.id;
        res.json({'TESTE': teste});
    });
    app.get("/login", (req, res) => res.sendfile(path.resolve("wwwroot", '../../frontend/login.html')));
    app.post("/login", passportLogin(passport));
    
    app.get("/logged", passportCheckLogin('teste'), (req, res) => {
        res.send(req.user);
    });

    app.post("/register", (req, res) => userController.createUser(req, res));

    app.get("/logout", passportLogout());

    app.post("/search", (req, res) => userController.searchUserByName(req, res));
}

module.exports = {setupRoutes};