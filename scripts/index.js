let buttons = Array.from(document.querySelectorAll('input[type=button]'));
buttons.forEach(button => button.addEventListener('transitionend', removeTransition));
buttons.forEach(button => button.addEventListener('mousedown', activateButton));
window.addEventListener('keydown',keyPress);

let buffer;
let queuedAction;
let view = document.getElementById("outputView");
let freshStart;

function keyPress(e){
    const button = document.querySelector(`input[data-key="${e.keyCode}"]`);
    if(e.keyCode === 8){
        if(view.value.length <= 1)
            view.value = "0";
        else
            view.value = view.value.slice(0, view.value.length - 1);
        return;
    }
    else if(!button) return;
    button.classList.add('active');
    input(button.value);
}

function removeTransition(e){
    e.target.classList.remove('active');
}

function activateButton(e){
    e.target.classList.add('active');
    input(e.target.value);
}

function input(i){

    switch(i){
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            if(!+view.value && view.value.indexOf(".") == -1 || freshStart){
                view.value = i;
                freshStart = false;
            }
                
            else
                view.value += i;
            break;
        case ".":
            if(view.value.indexOf(".") == -1)
                view.value += ".";
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            buffer = view.value;
            queuedAction = i;
            freshStart = true;
            break;
        case "=":
            evaluate();
            break;
        case "C":
            window.location.reload();
    }
}

function evaluate(){
    switch(queuedAction){
        case "+":
            view.value = +buffer + +view.value;
            queuedAction = "";
            freshStart = true;
            break;
        case "-":
            view.value = +buffer - +view.value;
            queuedAction = "";
            freshStart = true;
            break;
        case "*":
            view.value = +buffer * +view.value;
            queuedAction = "";
            freshStart = true;
            break;
        case "/":
            if(view.value == "0")
                view.value = "ERROR";
            else{
                view.value = +buffer / +view.value;
                queuedAction = "";
                freshStart = true;
            }
            
            break;
        default:
            return;
    }
}