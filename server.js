const express = require('express');

const app = express();
const PORT = process.envPORT || 3001;

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Hello !'));

app.listen(PORT, () => console.log(`App listening to port ${PORT}`));
