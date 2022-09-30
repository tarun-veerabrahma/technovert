//navBar JavaScript
var defaultPage = "home";
var presentPage;
presentPage=defaultPage;

function changePage(This,calledPage) {
	document.getElementsByClassName("active")[0].classList.remove("active");
	document.getElementById(This).classList.add("active");
	document.getElementById(presentPage).classList.add("hide");
	document.getElementById(calledPage).classList.remove("hide");
	presentPage=calledPage;

}


//Careers
function fileName() {
	document.getElementById("filename").value = document.getElementById("files").value;
}


function careersFormValidation(){
	var careersForm=document.forms["careerForm"];
	var requiredElements=document.forms["careerForm"].getElementsByClassName("required")
	for(var i=0; i< requiredElements.length;i++){
		if(requiredElements[i].value=="")
		{
			careersForm.parentNode.parentNode.querySelector("p.commonErrorMsg").classList.remove("hide");
			break;
		}
	}
	if(i == requiredElements.length){
		careersForm.parentNode.parentNode.querySelector("p.commonErrorMsg").classList.add("hide");
		careersForm.classList.add("hide");
		careersForm.parentNode.querySelector("p.content").innerHTML="Thank you for showing interest. Will get back to you shortly.";
	}
}


//Contact Us
var validationFlag=0;
//ClearForm JavaScript
function clearForm() {
	var inputFields = document.getElementsByClassName("contactInput");
	for(let i=0; i<inputFields.length; i++){
		if(inputFields[i].value != "")
		{
			inputFields[i].value = "";
		}
	}
	var radioButtons= document.querySelectorAll('input[type=radio]:checked');
	for(let i=0; i<radioButtons.length;i++){
		radioButtons[i].checked=false;
	}
	var errorMsg=document.getElementsByClassName("errorMsg");
	for(let i=0;i<errorMsg.length;i++){
		errorMsg[i].classList.add("hide");
	}
	document.getElementsByClassName("validation")[0].innerHTML="";
}


//PromoCode JavaScript

function setPromoBoxValue(){
	var stateValue = document.getElementById("state").value;
	if(stateValue != "")
	{
		document.getElementById("promoCode").value = stateValue+"-PROMO";
	}
	else{
		document.getElementById("promoCode").value = "";
	}
}



//RequirementsCheck JavaScript

function requirementsCheck(){
	var requiredElements = document.getElementsByClassName("Required");
	let flag=0;
	var temp;
	for(let i=0;i<requiredElements.length;i++){
		temp=requiredElements[i].parentElement;
		let errorMsg=temp.querySelector(".errorMsg");
		if(requiredElements[i].value=="")
		{
			if(errorMsg.classList.contains("hide")){
				errorMsg.classList.remove("hide");
			}
			flag=1;
		}
		else{
			if(!errorMsg.classList.contains("hide")){
				errorMsg.classList.add("hide");
			}
		}
	}
	if(flag==0 && validationFlag==0){
		document.getElementsByClassName("contactForm")[0].classList.add("hide");
		document.getElementsByClassName("successfulSubmission")[0].classList.remove("hide");			
	}
}


//Email Validation
function validateMail(input){
	var email = document.forms["contactForm"]["meMail"].value;
	var validationField = input.parentNode.getElementsByClassName("validation")[0];

	let pattern = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$";
	if(!email.match(pattern)){
		validationField.innerHTML = "Invalid Email!";
		validationFlag=1;
	}
	else{
		validationField.innerHTML="";
		validationFlag=0;
	}
}
