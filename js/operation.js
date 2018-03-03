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
var Ops = ["√", "^", "mod", "!", "x", "÷", "+", "-"];
var shift_on = false;
var ins = Array();

function Shift() {
    var sb = document.getElementById("to_shift");
    if (shift_on === true) {
        sb.style.color = "white";
        sb.style.backgroundColor = "steelblue";
        shift_on = false;
    } else {
        sb.style.color = "red";
        sb.style.backgroundColor = "darkblue";
        shift_on = true;
    }
}


var isOperand = function (_in) {
    return !isNaN(_in);
}

var isOperator = function (str) {
    return Ops.includes(str);
};

var isDigit = function (n) {
    var numReg = /[0-9]/i;
    return numReg.test(n);
}


function AddValue(str) {
    var val = str.toString();
    var peek = ins[ins.length - 1];
    if (peek === null || peek === undefined) {
        ins.push(val);
    } else if (peek.includes(".") || isDigit(peek)) {
        ins.push(ins.pop().toString() + val);
    } else if (peek == "-") {
        var dp = ins[ins.length - 2];
        if (dp === undefined || dp === null || dp == "(" || isOperator(dp)) {
            ins.push(ins.pop().toString() + val);
        } else if (isTrig(dp)) {
            neg = ins.pop().toString();
            ins.push(ins.pop().toString() + neg + str);
        }
    } else if (isTrig(peek)) {
        ins.push(ins.pop().toString() + str)
    } else {
        ins.push(str);
    }
    display();
}

var operators = {
    "(": { "isp": 0, "icp": 9, "assoc": 0, "urnary": 0 },
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
    ")": { "isp": -1, "icp": 0, "assoc": 0, "urnary": 0 }
};

var trigs = ["sin(", "cos(", "tan(", "log(", "abs(", "ln(", "acos(", "asin(", "atan("];
function handleTrig(trig) {


}

var isTrig = function (str) {
    for (x in trigs) {
        if (x == str) {
            return true;
        }
    }
}

function handleOperator(op) {
    for()
}

function handleConst(constant){

}

function AddPoint(str) {
    var peek = ins[ins.length - 1];
    if (peek === null || peek === undefined) {
        ins.push(str);
    } else if (!peek.includes(".")) {
        ins.push(ins.pop().toString() + str);
    }
    display();
}

function AddBrace(str) {

}

function PostoInf(str) {
    var post = Array();
    var _stack = Array();

    for (var i = 0; i < str.length; i++) {
        if (isOperand(str[i])) {
            pos.add(str[i]);
        } else if (str[i] == "(") {
            _stack.push(str[i]);
        } else if (str[i] == ")") {
            while (_stack.length > 0 && _stack[_stack.length - 1] != "(") {
                var x = _stack.pop();
                post.add(x);
            }
            _stack.pop();
        } else if (isOperator(str[i])) {
            if (_stack.length <= 0 || _stack[_stack.length - 1] != "(") {
                _stack.push(str[i]);
            } else {
                while (_stack.length > 0 && _stack[_stack.length - 1] != "("
                    && operators[_stack[_stack.length - 1]].isp >= operators[str[i]].icp) {
                    post.add(_stack.pop());
                }
                _stack.push(str[i]);
            }
        }
    }
    while (_stack.length > 0) {
        post.add(_stack.pop());
    }
}

function Eval(post) {
    var _stack = new Array();
    for (var i = 0; i < post.length; i++) {
        if (isOperand(post[i])) {
            _stack.push(post[i]);
        } else if (isOperator(post[i])) {
            var A = Number(_stack.pop());
            var B = Number(_stack.pop());
            _stack.push(operators[post[i]].func(B, A).toString());
        }
    }
    return _stack.pop();
}

function Evaluate() {

}

function Del() {
    var peek = ins.pop();
    peek = peek.toString();
    ins.push(peek.substring(0, peek.length - 1));
    display();
}

function Clear() {
    ins = new Array();
    display();
}

function display() {
    var v = ins.join()
    calc.display.value = st(v).toString();
}
var st = function (v) {
    return v.replace(/,/g, "");
};

