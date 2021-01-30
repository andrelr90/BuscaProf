const cors = require("cors");

const express = require("express");
const session = require('express-session');

const bodyParser = require('body-parser')
const app = express();

const {sessionConfig, passportConfig} = require("./config.js");
const {setupRoutes} = require('./routes.js');

const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const path = require("path");

app.use(express.static(path.resolve("wwwroot", '../../frontend/'), {extensions: ['html', 'css']}));

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


(async function() {
    
    const Database = require("./db_project/dbConfig")
    const db = new Database();
    await db.createDatabase();
    await db.createTables();
    
  })()


sessionConfig(app, session);
passportConfig(app, passport, LocalStrategy);

setupRoutes(app, passport);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})