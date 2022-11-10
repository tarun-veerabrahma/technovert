//navBar JavaScript
var defaultPage = "home";
var presentPage;
presentPage = defaultPage;
function changePage(This, calledPage) {
    document.getElementsByClassName("active")[0].classList.remove("active");
    This.classList.add("active");
    var page = document.getElementById(presentPage);
    if (page != null)
        page.classList.add("hide");
    page = document.getElementById(calledPage);
    if (page != null)
        page.classList.remove("hide");
    presentPage = calledPage;
}
//Careers
function getFileName() {
    var filename = document.getElementById("filename");
    var name = document.getElementById("files");
    if (filename != null && name != null)
        filename.value = name.value;
}
function careersFormValidation() {
    var careersForm = document.querySelector("#careerForm");
    var careerFormContainer = careersForm.parentNode;
    var parent = careerFormContainer.parentNode;
    var requiredElements = careersForm.getElementsByClassName("required");
    var commonErrorMsg = parent.querySelector("p.commonErrorMsg");
    for (var i = 0; i < requiredElements.length; i++) {
        if (requiredElements[i].value == "") {
            commonErrorMsg.classList.remove("hide");
            break;
        }
    }
    if (i == requiredElements.length) {
        commonErrorMsg.classList.add("hide");
        careersForm.classList.add("hide");
        commonErrorMsg.innerHTML = "Thank you for showing interest. Will get back to you shortly.";
    }
}
//Contact Us
var validationFlag = 0;
//Clear Form JavaScript
function replaceForm() {
    var inputFields = document.getElementsByClassName("contactInput");
    for (var i = 0; i < inputFields.length; i++) {
        if (inputFields[i].value != "") {
            inputFields[i].value = "";
        }
    }
    var radioButtons = document.querySelectorAll('#contactForm input[type=radio]:checked');
    for (var i = 0; i < radioButtons.length; i++) {
        radioButtons[i].checked = false;
    }
    var errorMsg = document.getElementsByClassName("errorMsg");
    for (var i = 0; i < errorMsg.length; i++) {
        errorMsg[i].classList.add("hide");
    }
    //document.getElementsByClassName("validation")[0].innerHTML="";
}
//PromoCode JavaScript
function setPromoBoxValue() {
    var stateValue = document.getElementById("state").value;
    (stateValue != "") ? document.getElementById("promoCode").value = stateValue + "-PROMO" : document.getElementById("promoCode").value = "";
}
//RequirementsCheck JavaScript
function contactFormValidation() {
    var requiredElements = document.getElementsByClassName("requiredField");
    var flag = 0;
    var temp;
    var emailElement = document.querySelector("#emailElement");
    if (emailElement.value == "") {
        var parent_1 = emailElement.parentNode;
        var msg = parent_1.querySelector(".emailValidationMsg");
        msg.innerHTML = "";
    }
    for (var i = 0; i < requiredElements.length; i++) {
        temp = requiredElements[i].parentElement;
        var errorMsg = temp.querySelector(".errorMsg");
        if (requiredElements[i].value == "") {
            if (errorMsg.classList.contains("hide")) {
                errorMsg.classList.remove("hide");
            }
            flag = 1;
        }
        else {
            if (!errorMsg.classList.contains("hide")) {
                errorMsg.classList.add("hide");
            }
        }
    }
    if (!flag && !validationFlag) {
        document.getElementsByClassName("contactForm")[0].classList.add("hide");
        document.getElementsByClassName("successMsg")[0].classList.remove("hide");
    }
}
//Email Validation
function validateMail(input) {
    var emailElement = document.querySelector("#emailElement");
    var email = emailElement.value;
    var inputParent = input.parentNode;
    if (inputParent != null) {
        var validationField = inputParent.getElementsByClassName("emailValidationMsg")[0];
        var pattern = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$";
        if (!email.match(pattern)) {
            validationField.innerHTML = "Invalid Email!";
            validationFlag = 1;
            if (email != "") {
                var parent_2 = emailElement.parentNode;
                var msg = parent_2.querySelector(".errorMsg");
                console.log(msg);
                if (!msg.classList.contains("hide")) {
                    msg.classList.add("hide");
                }
            }
        }
        else {
            validationField.innerHTML = "";
            validationFlag = 0;
        }
    }
}
