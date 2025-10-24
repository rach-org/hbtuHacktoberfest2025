// const input = document.getElementById('calc-input');
// const one = document.getElementById('one');
// const two = document.getElementById('two');
// const three = document.getElementById('three');
// const four = document.getElementById('four');
// const five = document.getElementById('five');
// const six = document.getElementById('six');
// const seven = document.getElementById('seven');
// const eight = document.getElementById('eight');
// const nine = document.getElementById('nine');
// const zero = document.getElementById('zero');
// const add = document.getElementById('add');
// const sub = document.getElementById('subtract');
// const mul = document.getElementById('multiply');
// const divide = document.getElementById('divide');
// const equal = document.getElementById('equal');
// const decimal = document.getElementById('decimal');

// let s = "";

// one.addEventListener('click',() => {
//     s = s+1;
//     input.value = s;
// });

// two.addEventListener('click',() => {
//     s = s+2;
//     input.value = s;
// });

// three.addEventListener('click',() => {
//     s = s+3;
//     input.value = s;
// });

// four.addEventListener('click',() => {
//     s = s+4;
//     input.value = s;
// });

// five.addEventListener('click',() => {
//     s = s+5;
//     input.value = s;
// });

// six.addEventListener('click',() => {
//     s = s+6;
//     input.value = s;
// });

// seven.addEventListener('click',() => {
//     s = s+7;
//     input.value = s;
// });

// eight.addEventListener('click',() => {
//     s = s+8;
//     input.value = s;
// });

// nine.addEventListener('click',() => {
//     s = s+9;
//     input.value = s;
// });

// add.addEventListener('click',() => {
//     s = s+'+';
//     input.value = s;
// });

// sub.addEventListener('click',() => {
//     s = s+'-';
//     input.value = s;
// });

// mul.addEventListener('click',() => {
//     s = s+'*';
//     input.value = s;
// });

// divide.addEventListener('click',() => {
//     s = s+'/';
//     input.value = s;
// });

// decimal.addEventListener('click',() => {
//     s = s+'.';
//     input.value = s;
// });

// equal.addEventListener('click' ,() => {

// });

const input = document.getElementById('calc-input');
let s = "";
const equal = document.getElementById('equal');
const buttonValues = {
    zero: '0', one: '1', two: '2', three: '3', four: '4',
    five: '5', six: '6', seven: '7', eight: '8', nine: '9',
    add: '+', subtract: '-', multiply: '*', divide: '/', decimal: '.'
};


Object.keys(buttonValues).forEach(id => {
    const btn = document.getElementById(id);
    btn.addEventListener('click', () => {
        if(input.value){
            s=input.value;
        }
        s += buttonValues[id];
        input.value = s;
    });
});

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter"){
        event.preventDefault(); 
        equal.click();
    }
});

document.getElementById('delete').addEventListener('click', () => {
    s = s.slice(0, -1)
    input.value = s;
});

equal.addEventListener('click', () => {
    let str = input.value;
    // Only allow numbers, operators (+-*/), and decimal points
    if (/^[-+*/.\d\s]+$/.test(str)) {
        try {
            // Disallow consecutive operators and invalid expressions
            // Evaluate only if the string is a valid mathematical expression
            // This regex checks for a valid math expression (numbers and operators)
            // and prevents things like "1++2", ".+3", etc.
            if (/^(\s*-?\d+(\.\d+)?\s*([+\-*/]\s*-?\d+(\.\d+)?\s*)*)$/.test(str)) {
                // Instead of eval, use a safe math evaluation
                let result = NaN;
                try {
                    // Manual math parser for basic operations (no eval, no Function)
                    // Split by operators and process left to right (no operator precedence)
                    let tokens = str.match(/-?\d+(\.\d+)?|[+\-*/]/g);
                    if (!tokens) throw new Error('Invalid');
                    let value = parseFloat(tokens[0]);
                    for (let i = 1; i < tokens.length; i += 2) {
                        let op = tokens[i];
                        let num = parseFloat(tokens[i+1]);
                        if (isNaN(num)) throw new Error('Invalid');
                        switch(op) {
                            case '+': value += num; break;
                            case '-': value -= num; break;
                            case '*': value *= num; break;
                            case '/': value /= num; break;
                            default: throw new Error('Invalid');
                        }
                    }
                    result = value;
                } catch (e) {
                    result = NaN;
                }
                if (typeof result === 'number' && isFinite(result)) {
                    s = result.toString();
                    input.value = s;
                } else {
                    input.value = 'Error';
                    s = '';
                }
            } else {
                input.value = 'Error';
                s = '';
            }
        } catch (e) {
            input.value = 'Error';
            s = '';
        }
    } else {
        input.value = 'Error';
        s = '';
    }
});
