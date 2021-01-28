const userController = require("./src/controller/UserController.js");
const path = require("path");
const messageController = require("./src/controller/MessageController.js");

function passportLogin(passport) {
    return (req, res, next) => {
        return passport.authenticate('local', (err, user, info) => {
            
            console.log("PassportLogin");
            console.log(info);
            console.log(user)
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
                    if(user.professor == 0){
                        res.redirect("/search")
                    } else {
                        res.redirect("/professor")
                    }
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
        res.redirect('/login');
    }
}

let setupRoutes = (app, passport) => {

    app.post("/teste", (req, res) => {
        console.log("Teste");
        const teste = req.body.id;
        res.json({'TESTE': teste});
    });
    //app.get("/login", (req, res) => res.sendFile(path.resolve("wwwroot", '../../frontend/login.html')));
    //app.get("/professor", (req, res) => res.sendFile(path.resolve("wwwroot", '../../frontend/login.html')));
    app.post("/login", passportLogin(passport));
    
    app.get("/logged", passportCheckLogin(0), (req, res) => {
        res.send(req.user);
    });

    app.post("/register", (req, res) => userController.createUser(req, res));

    app.post("/sendMessage", (req, res) => messageController.sendMessage(req, res));
    app.post("/getNotifications", (req, res) => messageController.getNotifications(req, res))
    app.post("/getMessages", (req, res) => messageController.getMessages(req, res));
    app.post("/getContacts", (req, res) => messageController.getContacts(req, res));
    app.get("/logout", passportLogout());

    app.post("/searchDB", (req, res) => userController.searchProfByName(req, res));
}

module.exports = {setupRoutes};