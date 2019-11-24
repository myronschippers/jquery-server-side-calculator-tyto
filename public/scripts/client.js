$(document).ready(init);

function init() {
    console.log('Document tots Ready!!!!');

    // get equation history
    getHistory();
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
    });
}

//
// VIEW UPDATES
// ----------

function render(history) {
    const $solution = $('.js-solution');
    const $historyList = $('.js-history-list');
    const lastIndex = history.length - 1;

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
