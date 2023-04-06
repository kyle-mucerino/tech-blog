const express = require('express');

const app = express();
const PORT = process.envPORT || 3001;

const handlebars = require('express-handlebars');
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({ layoutsDir: __dirname + '/Views/layouts', }));
extname: 'hbs';

app.use(express.static('public'));

const hbs = exphbs.create({ helpers });

app.get('/', (req, res) => res.render('main.hbs', {layout : 'index.hbs'}));

app.listen(PORT, () => console.log(`App listening to port ${PORT}`));
