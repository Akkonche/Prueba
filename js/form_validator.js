const emptyStringRegex = /^\s*$/;
const validEmailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

document.addEventListener("DOMContentLoaded", ()=>{
    const inputFieldsA = ["input_a_1", "input_a_2", "input_a_3"];
    const inputFieldsB = ["input_b_1", "input_b_2"];
    let inputA1 = document.getElementById(inputFieldsA[0]);
    let inputA2 = document.getElementById(inputFieldsA[1]);
    let inputA3 = document.getElementById(inputFieldsA[2]);
    let inputB1 = document.getElementById(inputFieldsB[0]);
    let inputB2 = document.getElementById(inputFieldsB[1]);
    let submitA = document.querySelector("[name=btn-form-a_1]");
    let submitB = document.querySelector("[name=btn-form-b_1]");
    let formA = document.getElementById("form_a");
    let formB = document.getElementById("form_b");

    let inputFieldA1 = inputA1.parentElement;
    let inputFieldA2 = inputA2.parentElement;
    let inputFieldA3 = inputA3.parentElement;
    let inputFieldB1 = inputB1.parentElement;
    let inputFieldB2 = inputB2.parentElement;

    let inputFieldA1Error = null;
    let inputFieldA2Error = null;
    let inputFieldA3Error = null;

    let errorsRegistered = {};
    // Interceptar el evento submit de los formularios
    formA.addEventListener("submit",(e)=>{
        e.preventDefault();
        e.stopPropagation();
        let focused = false;
        let validated = true;
        // Podemos validar cada uno de los campos
        if (emptyStringRegex.test(inputA1.value)) {
            validated = false;
            focused = createErrorElement(inputFieldA1, inputFieldA1Error, inputA1, "¡Este campo es requerido!", !focused);
        }
        if (!validEmailRegex.test(inputA2.value)) {
            validated = false;
            focused = createErrorElement(inputFieldA2, inputFieldA2Error, inputA2, "¡El correo no tiene formato válido!", !focused);
        }
        if (!validEmailRegex.test(inputA3.value)) {
            validated = false;
            focused = createErrorElement(inputFieldA3, inputFieldA3Error, inputA3, "¡El correo no tiene formato válido!", !focused);
        }
    });

    function createErrorElement(inputField, errorField, input,  errorMsg, focused ) {
        if (!errorsRegistered[input.id]) {
            errorField = document.createElement("DIV");
            errorField.classList.add("col-l-9", "error", "offset-l-3");
            input.classList.add('error');
            input.addEventListener('change', onBlurOrChange);
            errorField.innerHTML = errorMsg;
            inputField.appendChild(errorField);
            errorsRegistered[input.id] = [input, errorField, inputField]
        }
        if (focused) {
            input.focus();
        }
        return true;
    }
    function onBlurOrChange(e){
        const target = e.target;
        if (errorsRegistered[target.id]) {
            let [input, errorField, inputField] = errorsRegistered[target.id];
            input.classList.remove("error");
            errorField.remove();
            delete errorsRegistered[target.id];
            input.removeEventListener("change", onBlurOrChange);
        }
    }
});