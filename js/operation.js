var Trig = {
    sin: "sin(",
    cos: "cos(",
    tan: "tan(",
    abs: "abs(",
    log: "log(",
    ln: "ln(",
    arctan: "atan(",
    arcsin: "asin(",
    arccos: "acos("
};
var Ops = ["√", "^", "mod", "!", "x", "÷", "+", "-", "e", "π"];
var shift_on = false;
var ins = Array();

function Token(str) {
    calc.display.Value += str;
}

function AddValue(str) {
    calc.display.value += str;
}

function Tokenize(in_str) {
    this.input = in_str;
    this.tokens = new Array();
}

function isOperand(_in) {
    return !isNaN(_in);
}

var isOperator = function (str) {
    return Ops.includes(str);
};


var operators = {
    "(": {"isp": 0, "icp": 9, "assoc": 0, "urnary": 0},
    "+": {
        "isp": 2, "icp": 1, "assoc": 0, "urnary": 0, "func": function (a, b) {
            return a + b;
        }
    },
    "-": {
        "isp": 2, "icp": 1, "assoc": 0, "urnary": 0, "func": function (a, b) {
            return a - b;
        }
    },
    "x": {
        "isp": 4, "icp": 3, "assoc": 0, "urnary": 0, "func": function (a, b) {
            return a * b;
        }
    },
    "/": {
        "isp": 4, "icp": 3, "assoc": 0, "urnary": 0, "func": function (a, b) {
            return a / b;
        }
    },
    "^": {
        "isp": 5, "icp": 6, "assoc": 1, "urnary": 1, "func": function (a, b) {
            return Math.pow(a, b);
        }
    },
    ")": {"isp": -1, "icp": 0, "assoc": 0, "urnary": 0}
};

function handleTrig(trig) {
    var trigs = ["sin", "cos", "tan", "log", "abs", "ln", "acos", "asin", "atan"];
    calc.display.value += Trig[trig].toLowerCase();
}

function handleOperator(operator) {

}

function AddPoint(str) {

}

function AddBrace(str) {

}

function Shift() {
    var sb = document.getElementsById("to_shift");
    alert("shift false");
    if (shift_on === true) {
        //   sb.style.backgroundColor = "steelblue";
        alert("shift off");
        shift_on = false;
    } else {
        //  sb.style.backgroundColor = "darkblue";
        alert("shift on");
        shift_on = true;
    }
}


function PostoInf(str) {
    var post = Array();
    var _stack = Array();

    for (var i = 0; i < str.length; i++) {
        if (isOperand(str[i])) {
            pos.add(str[i]);
        } else if (str[i] === "(") {
            _stack.push(str[i]);
        } else if (str[i] === ")") {
            while (_stack.length > 0 && _stack[_stack.length - 1] !== "(") {
                var x = _stack.pop();
                post.add(x);
            }
            _stack.pop();
        } else if (isOperator(str[i])) {
            if (_stack.length <= 0 || _stack[_stack.length - 1] !== "(") {
                _stack.push(str[i]);
            } else {
                while (_stack.length > 0 && _stack[_stack.length - 1] !== "("
                && operators[_stack[_stack.length - 1]]["isp"] >= operators[str[i]]["icp"]) {
                    post.add(_stack.pop());
                }
                _stack.push(str[i]);
            }
        }
    }
    while(_stack.length > 0){
        post.add(_stack.pop());
    }

}