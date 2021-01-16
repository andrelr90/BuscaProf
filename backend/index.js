const express = require("express");
const session = require('express-session');

const bodyParser = require('body-parser')
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const SESSION_CONFIG = {secret: 'TESTE',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 30 * 60 * 1000 }//30min
    };
    
app.use(session(SESSION_CONFIG));

app.post("/teste", (req, res) => {
    console.log("Teste");
    const teste = req.body.id; 
    res.json({'TESTE': teste});
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})