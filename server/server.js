const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const history = [
    // {
    //     mathNum1: 0,
    //     mathNum2: 0,
    //     mathOperator: 'add', // 'sub', 'mutl', 'divi', 'add'
    //     solution: 0
    // }
];

// GET of the equation history
app.get('/api/equation-history', (req, res) => {
    res.send(history);
});

// POST that accepts an object for an equation

app.listen(PORT, () => {
    console.log('Server running, listening on port: ', PORT);
});