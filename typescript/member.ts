
/**
 * This method wires up all the buttons to the functions that will be called.
 */
window.onload = function(){
    let memberForm = document.getElementById("member_form");
    memberForm.onsubmit = validateForm;

    let reseBtn = document.getElementById("reset");
    reseBtn.onclick = clearForm;

    let corpRadioButton = document.getElementById("corporate");
    corpRadioButton.onchange = toggleCompanyName;

    let indRadioButton = document.getElementById("individual");
    indRadioButton.onchange = toggleCompanyName;
}

function toggleCompanyName() {
    let corporate = document.getElementById("corporate") as HTMLInputElement;
    if(corporate.checked){
        let companyName = document.getElementById("company_name") as HTMLInputElement;
        companyName.disabled = false
        let companySpan = <HTMLElement>document.getElementById("company_name").nextElementSibling;
        displayError(companySpan, "*")
    }
    else{
        let companyName = document.getElementById("company_name") as HTMLInputElement;
        companyName.disabled = true
        let companySpan = <HTMLElement>document.getElementById("company_name").nextElementSibling;
        displayError(companySpan, "")
    }
   
}

/**
 * This method resets all textboxes and error messages.
 */
function clearForm(){
    //Textboxes are cleared because the reset button is type=reset

    let spanElements = document.querySelectorAll("#member_form > fieldset > span");
    for (let index = 0; index < spanElements.length; index++) {
        spanElements[index].innerHTML = "*";
    }

    let indRadBtn = <HTMLInputElement>document.getElementById("individual");
    if(indRadBtn.checked){
        let companyName = document.getElementById("company_name").nextElementSibling;
        companyName.innerHTML = ""; 
    }
}
/**
 * Checks to see if the entire form is valid
 */
function validateForm(){
    clearForm();
    let isAllDataValid = true;

    if (isEmpty("email")) {
        isAllDataValid = false;
        let emailSpan = <HTMLElement>document.getElementById("email").nextElementSibling;
        displayError(emailSpan, "Email is required")
    }
    if (isEmpty("verify")) {
        isAllDataValid = false;
        let verifyPasswordSpan = <HTMLElement>document.getElementById("verify").nextElementSibling;
        displayError(verifyPasswordSpan, "Password verification is required")
    }
    if (isDifferent()){
        isAllDataValid = false;
        let verifyPasswordSpan = <HTMLElement>document.getElementById("verify").nextElementSibling;
        displayError(verifyPasswordSpan, "Passwords must match")
    }
    if (lessThanSix()){
        isAllDataValid = false;
        let passwordSpan = <HTMLElement>document.getElementById("password").nextElementSibling;
        displayError(passwordSpan, "password needs to be at least six characters")
    }
    if (isEmpty("password")) {
        isAllDataValid = false;
        let passwordSpan = <HTMLElement>document.getElementById("password").nextElementSibling;
        displayError(passwordSpan, "password is required")
    }
    let corporate = document.querySelector("#corporate") as HTMLInputElement
    if(corporate.checked){
        if (isEmpty("company_name")){
            isAllDataValid = false;
            let companySpan = <HTMLElement>document.getElementById("company_name").nextElementSibling;
            displayError(companySpan, "Company name is required");
        }
    }
    if (isEmpty("first_name")) {
        isAllDataValid = false;
        let firstNameSpan = <HTMLElement>document.getElementById("first_name").nextElementSibling;
        displayError(firstNameSpan, "first name is required")
    }
    if (isEmpty("last_name")) {
        isAllDataValid = false;
        let lastNameSpan = <HTMLElement>document.getElementById("last_name").nextElementSibling;
        displayError(lastNameSpan, "last name is required")
    }

    if (isEmpty("phone")) {
        isAllDataValid = false;
        let phoneSpan = <HTMLElement>document.getElementById("phone").nextElementSibling;
        displayError(phoneSpan, "Phone number is required");
    }

    if(!isValidPhone("phone")){
        isAllDataValid = false;
        let phoneSpan = <HTMLElement>document.getElementById("phone").nextElementSibling;
        displayError(phoneSpan, "Phone number is not valid.");
    }

    if(!isAllDataValid){
        event.preventDefault();
    }
}

/**
 * Checks if the v alue of an HTMLInputElement is empty
 * Leading and trailing whitespace is ignored
 * @param elemId The id of an <input>
 * 
 */
function isEmpty(elemId:string):boolean{
    let elem = <HTMLInputElement>document.getElementById(elemId);
    if(elem.value.trim() == "") {
        return true;
    }
    return false;
}

/**
 * Validates a phone number for a US format
 * @param phone The phone number to validate
 */
function isValidPhone(phone:string):boolean{
    //Throw exception if method does not have an implementation yet
    //throw "Method not coded yet";
    //Valid format ###-###-####
    let elem = <HTMLInputElement>document.getElementById(phone);
    if(elem.value.trim().length != 12) {
        return false;
    }
    elem.value = elem.value.replace(/-/g, "");
    for(let i = 0; i < elem.value.length; i++) {
        if(!Number.isInteger(parseInt(elem.value.charAt(i)))){
            return false;
        }
    }
    return true; //all valid
}

/**
 * Displays an error as the innerText for the target element
 * @param targetElement Element to display error msg in
 * @param errMsg Error message text
 */
function displayError(targetElement:HTMLElement, errMsg:string){
    targetElement.innerText = errMsg;
    targetElement.style.color = "red";

}

function isDifferent():boolean{
    let password = document.getElementById("password") as HTMLInputElement;
    let verify = document.getElementById("verify") as HTMLInputElement;
    if (password.value != verify.value) {
        return true;
    }
    return false;
}

function lessThanSix():boolean{
    let password = document.getElementById("password") as HTMLInputElement;
    if (password.value.length >= 6){
        return false;
    }
    return true;
}