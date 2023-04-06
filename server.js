const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const helpers = require("./utils/helpers");
const path = require("path");

const app = express();
const PORT = process.envPORT || 3001;

const sequelize = require("./config/config");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const handlebars = require("express-handlebars");
app.set("view engine", "hbs");
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
extname: "hbs";

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: "strict"
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));


app.get("/", (req, res) => res.render("test.hbs", { layout: "main.hbs" }));

app.use(require("./controllers/"));

app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
  sequelize.sync({ force: false });
});
