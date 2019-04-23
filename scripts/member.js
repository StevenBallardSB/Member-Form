window.onload = function () {
    let memberForm = document.getElementById("member_form");
    memberForm.onsubmit = validateForm;
    let reseBtn = document.getElementById("reset");
    reseBtn.onclick = clearForm;
    let corpRadioButton = document.getElementById("corporate");
    corpRadioButton.onchange = toggleCompanyName;
    let indRadioButton = document.getElementById("individual");
    indRadioButton.onchange = toggleCompanyName;
};
function toggleCompanyName() {
    alert("it got toggled!");
}
function clearForm() {
    let spanElements = document.querySelectorAll("#member_form > fieldset > span");
    for (let index = 0; index < spanElements.length; index++) {
        spanElements[index].innerHTML = "*";
    }
    let indRadBtn = document.getElementById("individual");
    if (indRadBtn.checked) {
        let companyName = document.getElementById("company_name").nextElementSibling;
        companyName.innerHTML = "";
    }
}
function validateForm() {
    let isAllDataValid = true;
    if (isEmpty("email")) {
        isAllDataValid = false;
        let emailSpan = document.getElementById("email").nextElementSibling;
        displayError(emailSpan, "Email is required");
    }
    if (isEmpty("password")) {
        isAllDataValid = false;
        let passwordSpan = document.getElementById("password").nextElementSibling;
        displayError(passwordSpan, "password is required");
    }
    if (isEmpty("verify")) {
        isAllDataValid = false;
        let verifyPasswordSpan = document.getElementById("verify").nextElementSibling;
        displayError(verifyPasswordSpan, "Password verification is required");
    }
    if (isEmpty("first_name")) {
        isAllDataValid = false;
        let firstNameSpan = document.getElementById("first_name").nextElementSibling;
        displayError(firstNameSpan, "first name is required");
    }
    if (isEmpty("last_name")) {
        isAllDataValid = false;
        let lastNameSpan = document.getElementById("last_name").nextElementSibling;
        displayError(lastNameSpan, "last name is required");
    }
    if (isEmpty("phone")) {
        isAllDataValid = false;
        let phoneSpan = document.getElementById("phone").nextElementSibling;
        displayError(phoneSpan, "Phone number is required");
    }
    if (!isValidPhone("phone")) {
        isAllDataValid = false;
        let phoneSpan = document.getElementById("phone").nextElementSibling;
        displayError(phoneSpan, "Phone number is not valid.");
    }
    if (!isAllDataValid) {
        event.preventDefault();
    }
}
function isEmpty(elemId) {
    let elem = document.getElementById(elemId);
    if (elem.value.trim() == "") {
        return true;
    }
    return false;
}
function isValidPhone(phone) {
    if (phone.trim().length != 12) {
        return false;
    }
    if (phone.charAt(3) != "-" || phone.charAt(7) != "-") {
        return false;
    }
    phone = phone.replace(/-/g, "");
    for (let i = 0; i < phone.length; i++) {
        if (!Number.isInteger(parseInt(phone.charAt(i)))) {
            return false;
        }
    }
    return true;
}
function displayError(targetElement, errMsg) {
    targetElement.innerText = errMsg;
    targetElement.style.color = "red";
}
