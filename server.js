const express = require('express');

const app = express();
const PORT = process.envPORT || 3001;

const handlebars = require('express-handlebars');
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars({ layoutsDir: __dirname + '/Views/layouts', }));

app.use(express.static('public'));

app.get('/', (req, res) => res.render('main', {layout : 'index'}));

app.listen(PORT, () => console.log(`App listening to port ${PORT}`));
