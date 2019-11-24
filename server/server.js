const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

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
app.post('/api/equation', (req, res) => {
    // retrieve the sent data
    const equationObject = req.body;
    const mathNum1AsInt = parseInt(equationObject.mathNum1);
    const mathNum2AsInt = parseInt(equationObject.mathNum2);
    let solution = 0;

    // do the math
    if (equationObject.mathOperator === 'add') {
        solution = mathNum1AsInt + mathNum2AsInt;
    } else if (equationObject.mathOperator === 'sub') {
        solution = mathNum1AsInt - mathNum2AsInt;
    } else if (equationObject.mathOperator === 'divi') {
        solution = mathNum1AsInt / mathNum2AsInt;
    } else if (equationObject.mathOperator === 'multi') {
        solution = mathNum1AsInt * mathNum2AsInt;
    }

    // add equation and solution to history
    history.push({
        mathNum1: mathNum1AsInt,
        mathNum2: mathNum2AsInt,
        mathOperator: equationObject.mathOperator,
        solution: solution,
    });

    console.log('history: ', history);

    // send back a message
    res.sendStatus(201);
});

app.listen(PORT, () => {
    console.log('Server running, listening on port: ', PORT);
});