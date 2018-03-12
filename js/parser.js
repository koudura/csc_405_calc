var shift_on = false;
var ins = [];
var _syntax = [];

function AddValue(str) {
    var val = str.toString();
    var pk = peek(ins);
    if (pk === null || pk === undefined) {
        ins.push(val);
    } else if (pk.includes(".") || isDigit(pk)) {
        ins.push(ins.pop().toString() + val);
    } else if (pk === "-") {
        var dp = ins[ins.length - 2];
        if (dp === undefined || dp === null || dp === "(" || isOperator(dp)) {
            ins.push(ins.pop().toString() + val);
        } else {
            ins.push(str);
        }
    }
    else {
        ins.push(str);
    }
    display();
}


function handleTrig(trig) {
    if (shift_on) {
        switch (trig.substring(0, 3)) {
            case "sin":
                ins.push(trigs[7]);
                break;
            case "cos":
                ins.push(trigs[6]);
                break;
            case "tan":
                ins.push(trigs[8]);
                break;
        }
    } else {
        for (i = 0; i < 6; i++) {
            var temp = trigs[i].substring(0, trigs[i].length - 1);
            if (trig === temp) {
                ins.push(trigs[i]);
                break;
            }
        }
    }
    display();
}

function handleOperator(op) {
    for (var i = 0; i < Ops.length; i++) {
        if (Ops[i] === op) {
            ins.push(Ops[i]);
        }
    }
    display();
}

function handleConst(constant) {
    ins.push(constant);
    display();
}

//point or float sign control//
function AddPoint(str) {
    var peek = ins[ins.length - 1];
    if (peek === null || peek === undefined) {
        ins.push(str);
    } else if (!peek.includes(".")) {
        if (isOperand(peek)) {
            ins.push(ins.pop().toString() + str);
        } else {
            ins.push(str);
        }
    }
    display();
}

function AddBrace(str) {
    var eye = peek(ins);
    if (eye === null || eye === undefined) {
        ins.push(str);
    } else {
        if (str === "(") {
            ins.push(str);
        } else if (eye.includes("(")) {
            ins.push(str);
        }
    }

    display();
}

var isnegated = false;

function negate() {
    var current = peek(ins);
    if (isOperand(current)) {
        AddBrace("(");
        var cur = "-" + ins.pop();
        ins.push(cur);
        AddBrace(")");
        isnegated = true;

    }

}

function resolvConsts() {
    for (i = 0; i < ins.length; i++) {

    }
}

function Evaluate() {

    var output = parseToPostfix(ins);
    var result = Eval(output);
    ins = [];
    ins.push(result);
    display();
    ins = [];
}

function Shift() {
    var sb = document.getElementById("to_shift");
    var _sin = document.getElementById("sin");
    var _cos = document.getElementById("cos");
    var _tan = document.getElementById("tan");

    if (shift_on === true) {
        _sin.value = "sin";
        _cos.value = "cos";
        _tan.value = "tan";
        sb.style.color = "white";
        sb.style.backgroundColor = "steelblue";
        shift_on = false;
    } else {
        _sin.value = "sin¯¹";
        _cos.value = "cos¯¹";
        _tan.value = "tan¯¹";
        sb.style.color = "red";
        sb.style.backgroundColor = "darkblue";
        shift_on = true;
    }
}

//handles deletion//
function Del() {
    var top = peek(ins);
    if (top !== undefined) {
        if (isOperand(top)) {
            var tp = top.substring(0, top.length - 1)
            if (tp === "") {
                ins.pop();
            } else {
                ins.pop();
                ins.push(tp);
            }
        } else {
            ins.pop();
        }
    }
    display();
}

//clears input screen//
function Clear() {
    ins = [];
    display();
}

function display() {
    var v = ins.join()
    calc.display.value = st(v).toString();
}

var st = function (v) {
    return v.replace(/,/g, "");
};

