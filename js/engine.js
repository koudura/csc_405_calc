var operators = {
    "(": {"pre": 0, "rule": 0, "urnary": 0},
    "+": {
        "pre": 2, "rule": 0, "urnary": 0, "func": function (a, b) {
            return a + b;
        }
    },
    "-": {
        "pre": 2, "rule": 0, "urnary": 0, "func": function (a, b) {
            return a - b;
        }
    },
    "mod": {
        "pre": 2, "rule": 0, "urnary": 0, "func": function (a, b) {
            return a % b;
        }
    },
    "x": {
        "pre": 3, "rule": 0, "urnary": 0, "func": function (a, b) {
            return a * b;
        }
    },
    "÷": {
        "pre": 3, "rule": 0, "urnary": 0, "func": function (a, b) {
            return a / b;
        }
    },
    "^": {
        "pre": 6, "rule": 1, "urnary": 0, "func": function (a, b) {
            return Math.pow(a, b);
        }
    },
    "√(": {
        "pre": 6, "rule": 1, "urnary": 1, "func": function (n) {
            return Math.sqrt(n);
        }
    },
    "!": {
        "pre": 7, "rule": 1, "urnary": 1, "func": function (n) {
            var x = n;
            if (n === 0 || n === 1) {
                return 1;
            } else {
                for (var i = n - 1; i > 0; i--) {
                    x *= i;
                }
            }
            return x;
        }
    },
    "sin(": {
        "pre": 5, "rule": 1, "urnary": 1, "func": function (n) {
            return Math.sin(n * Math.PI / 180);
        }
    },
    "cos(": {
        "pre": 5, "rule": 1, "urnary": 1, "func": function (n) {
            return Math.cos(n * Math.PI / 180);
        }
    },
    "tan(": {
        "pre": 5, "rule": 1, "urnary": 1, "func": function (n) {
            return Math.tan(n * Math.PI / 180)
        }
    },
    "asin(": {
        "pre": 5, "rule": 1, "urnary": 1, "func": function (n) {
            return Math.asin(n) * 180 / Math.PI;
        }
    },
    "acos(": {
        "pre": 5, "rule": 1, "urnary": 1, "func": function (n) {
            return Math.acos(n) * 180 / Math.PI;
        }
    },
    "atan(": {
        "pre": 5, "rule": 1, "urnary": 1, "func": function (n) {
            return Math.atan(n) * 180 / Math.PI;
        }
    },
    "log(": {
        "pre": 5, "rule": 1, "urnary": 1, "func": function (n) {
            return Math.log10(n);
        }
    },
    "ln(": {
        "pre": 5, "rule": 1, "urnary": 1, "func": function (n) {
            return Math.log(n);
        }
    },
    "abs(": {
        "pre": 5, "rule": 1, "urnary": 1, "func": function (n) {
            return Math.cos(n)
        }
    },
    ")": {"pre": -1, "rule": 0, "urnary": 0}
};

var Ops = ["+", "-", "x", "÷", "^", "√(", "mod", "!", "(", ")"];
var trigs = ["sin(", "cos(", "tan(", "log(", "abs(", "ln(", "acos(", "asin(", "atan("];

var isOperand = function (_in) {
    return !isNaN(_in);
};

var isOperator = function (o_p) {
    return Ops.includes(o_p);
};

var isDigit = function (n) {
    var numReg = /[0-9]/i;
    return numReg.test(n);
};

var peek = function (arr_) {
    return arr_[arr_.length - 1];
};

var isTrig = function (t) {
    return trigs.includes(t);
};

function parseToPostfix(_infix) {
    _post = [];
    _stack = [];

    for (i = 0; i < _infix.length; i++) {
        tok = _infix[i];
        if (isOperand(tok)) {
            _post.push(tok);
        } else if (tok === "(") {
            _stack.push(tok);
        } else if (tok === ")") {
            while (_stack.length > 0 && peek(_infix) !== "(") {
                _post.push(_stack.pop());
            }
            _stack.pop();
        } else if (isOperator(tok) || isTrig(tok)) {
            a = tok;
            b = peek(_infix);
            while (isOperator(b) && ((!operators[a].rule && (operators[a].pre <= operators[b].pre))
                || (operators[a].rule && (operators[a].pre < operators[b].pre)))) {
                _post.push(_stack.pop());
            }
            _stack.push(a);
        }
    }
    while (_stack.length > 0) {
        var s = peek(_stack);
        if (s === "(" || s === ")") {
            break;
        }
        _post.push(_stack.pop());
    }
    return _post;
}

function Eval(_postfix) {
    if (!_postfix.includes("(") && !_postfix.includes(")")) {
        _out = [];
        for (i = 0; i < _postfix.length; i++) {
            var t = _postfix[i];
            if (isOperand((t))) {
                _out.push(t);
            } else {
                if (operators[t].urnary) {
                    e = Number(_out.pop());
                    _out.push(operators[t].func(e).toString());
                } else {
                    a = Number(_out.pop());
                    b = Number(_out.pop());
                    _out.push(operators[t].func(b, a).toString());
                }
            }
        }
        return _out[0];
    }
}
























