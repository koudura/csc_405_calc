var shift_on = false;
var ins = [];

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
        switch (trig) {
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

function Evaluate() {
    var output = parseToPostfix(ins);
    var result = eval(output);
    ins = [];
    ins.push(result);
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
    var top = peek(ins);
    if (top !== undefined) {
        if (isOperand(top)) {
            var tp = top.substring(0, peek.length - 1)
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

