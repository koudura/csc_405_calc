var trigs = ["sin(", "cos(", "tan(", "log(", "abs(", "ln(", "acos(", "asin(", "atan("];
var Ops = ["+", "-", "x", "÷", "^", "√", "mod", "!"];
var shift_on = false;
var ins = Array();



var isOperand = function (_in) {
    return !isNaN(_in);
}

var isOperator = function (o_p) {
    return Ops.includes(o_p);
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
    } else if (isTrig(peek) == true) {
        var x = ins.pop();
        ins.push(x + str);
        alert("istrig");
    } else if (peek == "-") {
        var dp = ins[ins.length - 2];
        if (dp === undefined || dp === null || dp == "(" || isOperator(dp)) {
            ins.push(ins.pop().toString() + val);
        } else if (isTrig(dp)) {
            neg = ins.pop().toString();
            ins.push(ins.pop().toString() + neg + str);
        } else {
            ins.push(str);
        }
    }
    else {
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
    "÷": {
        "isp": 4, "icp": 3, "assoc": 0, "urnary": 0, "func": function (a, b) {
            return a / b;
        }
    },
    "^": {
        "isp": 5, "icp": 6, "assoc": 0, "urnary": 0, "func": function (a, b) {
            return Math.pow(a, b);
        }
    },
    "√": {
        "isp": 5, "icp": 6, "assoc": 1, "urnary": 1, "func": function (n) {
            return Math.sqrt(n);
        }
    },
    "mod": {
        "isp": 3, "icp": 2, "assoc": 0, "urnary": 0, "func": function (a, b) {
            return a % b;
        }
    },
    "!": {
        "isp": 6, "icp": 7, "assoc": 1, "urnary": 0, "func": function (n) {
            var x = n;
            if (n == 0 || n == 1) { return 1; } else {
                for (var i = n - 1; i > 0; i--) {
                    x *= i;
                }
            }
            return x;
        }
    },
    ")": { "isp": -1, "icp": 0, "assoc": 0, "urnary": 0 }
};


function handleTrig(trig) {


}

function isTrig(t) {
    for (var i = 0; i < trigs.length; i++) {
        if (trigs[i] == t) { return true; }
    }
    return false;
}

function handleOperator(op) {
    for (var i = 0; i < Ops.length; i++) {
        if (Ops[i] == op) {
            ins.push(Ops[i]);
        }
    }
    display();
}

function handleConst(constant) {

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
            post.push(str[i]);
        } else if (str[i] == "(") {
            _stack.push(str[i]);
        } else if (str[i] == ")") {
            while (_stack.length > 0 && _stack[_stack.length - 1] != "(") {
                var x = _stack.pop();
                post.push(x);
            }
            _stack.pop();
        } else if (isOperator(str[i])) {
            if (_stack.length <= 0 || _stack[_stack.length - 1] != "(") {
                _stack.push(str[i]);
            } else {
                while (_stack.length > 0 && _stack[_stack.length - 1] != "("
                    && operators[_stack[_stack.length - 1]].isp >= operators[str[i]].icp) {
                    post.push(_stack.pop());
                }
                _stack.push(str[i]);
            }
        }
    }
    while (_stack.length > 0) {
        post.push(_stack.pop());
    }
    return post;
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
    var output = PostoInf(ins);
    var disp = Eval(output);
    ins = new Array();
    ins.push(disp);
    display();
}

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


function Del() {
    var peek = ins[ins.length - 1]
    if (peek != undefined) {
        if (isOperand(peek)) {
            var pp = peek.substring(0, peek.length - 1)
            if (pp == "") {
                ins.pop();
            } else {
                ins.pop();
                ins.push(pp);
            }
        } else {
            ins.pop();
        }
    }
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

