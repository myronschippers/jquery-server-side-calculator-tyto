let MATH_OPERATOR = null;

$(document).ready(init);

function init() {
    console.log('Document tots Ready!!!!');
    $('.js-btn-submit').on('click', onClickSubmitEquation);
    $('.js-btn-mathOp').on('click', onClickMathOp);
    $('.js-btn-clear').on('click', onClickClear);

    // get equation history
    getHistory();
}

//
// EVENT HANDLERS
// ----------

function onClickSubmitEquation(event) {
    let num1 = $('.js-field-mathNum1').val();
    let num2 = $('.js-field-mathNum2').val();

    num1 = parseInt(num1);
    num2 = parseInt(num2);

    const equation = {
        mathNum1: num1,
        mathNum2: num2,
        mathOperator: MATH_OPERATOR,
    };

    console.log('Submit Equation: ', equation);
    postEquation(equation);
}

function onClickMathOp(event) {
    MATH_OPERATOR = $(this).data('operator');
    console.log('Click Operator: ', MATH_OPERATOR);
}

function onClickClear(event) {
    $('.js-field-mathNum1').val('');
    $('.js-field-mathNum2').val('');

    MATH_OPERATOR = null;
}

//
// API CALLS
// ----------

function getHistory() {
    $.ajax({
        method: 'GET',
        url: '/api/equation-history'
    })
    .then(function(response) {
        console.log('GET history: ', response);
        render(response);
    })
    .catch(function(err) {
        console.log('GET history error: ', err);
        alert('There was an error loading the equation history.');
    });
}

function postEquation(equationObject) {
    if (equationObject.mathOperator == null) {
        return false;
    }

    $.ajax({
        method: 'POST',
        url: '/api/equation',
        data: equationObject,
    })
    .then(function(response) {
        console.log('POST equation: ', response);
        getHistory();
    })
    .catch(function(err) {
        console.log('POST equation error: ', err);
        alert('There was an error processing your equation.');
    });

}

//
// VIEW UPDATES
// ----------

function render(history) {
    const $solution = $('.js-solution');
    const $historyList = $('.js-history-list');
    const lastIndex = history.length - 1;

    // EMPTY HTML CONTENT
    $solution.empty()
    $historyList.empty();

    $solution.append(history[lastIndex].solution);

    for (let equData of history) {
        let visualOperator = null;

        if (equData.mathOperator === 'add') {
            visualOperator = '+';
        } else if (equData.mathOperator === 'sub') {
            visualOperator = '-';
        } else if (equData.mathOperator === 'multi') {
            visualOperator = '*';
        } else if (equData.mathOperator === 'divi') {
            visualOperator = '/';
        }

        $historyList.append(`
            <li>
                ${equData.mathNum1}
                ${visualOperator}
                ${equData.mathNum2}
                =
                ${equData.solution}
            </li>
        `);
    }
}
