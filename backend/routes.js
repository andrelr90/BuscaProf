const userController = require("./src/controller/UserController.js");
const path = require("path");
const messageController = require("./src/controller/MessageController.js");
const subjectController = require("./src/controller/SubjectController.js");


function passportLogin(passport) {
    return (req, res, next) => {
        return passport.authenticate('local', (err, user, info) => {
            
            console.log("PassportLogin");
            //console.log(info);
            //console.log(user)
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

function passportCheckLoginGroup(group) {
    return (req, res, next) => {
        console.log("PassportCheckLogin");
        if (req.isAuthenticated() && req.user.group === group) {
            return next();
        }
        res.redirect('/');
    }
}

function passportCheckLogin() {
    return (req, res, next) => {
        console.log("PassportCheckLogin");
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }
}


function passportCheckNotLogin() {
    return (req, res, next) => {
        console.log("PassportCheckNotLogin");
        console.log(req.isAuthenticated())
        if (!req.isAuthenticated()) {
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
    app.post("/login", passportCheckNotLogin(), passportLogin(passport));
    
    app.get("/logged", passportCheckLoginGroup(0), (req, res) => {
        res.send(req.user);
    });
    
    app.post("/register", passportCheckNotLogin(), (req, res) => userController.createUser(req, res));

    app.post("/sendMessage", passportCheckLogin(), (req, res) => messageController.sendMessage(req, res));
    app.post("/getNotifications", passportCheckLogin(), (req, res) => messageController.getNotifications(req, res))
    app.post("/getMessages", passportCheckLogin(), (req, res) => messageController.getMessages(req, res));
    app.post("/getContacts", passportCheckLogin(), (req, res) => messageController.getContacts(req, res));
    app.post("/getLoggedUser", (req, res) => userController.getLoggedUser(req, res));
    app.get("/logout", passportLogout());
    app.get("/", (req, res) => res.redirect("/home"));

    app.post("/getAllSubjects", (req, res) => subjectController.getAllSubjects(req, res));
    app.post("/searchDB", (req, res) => userController.searchProfByName(req, res));
    app.post("/searchProf", (req, res) => userController.searchProfs(req, res));
    app.post("/filter", (req, res) => userController.filter(req, res));
    app.post("/searchID", (req, res) => userController.searchProfById(req, res));
}

module.exports = {setupRoutes};