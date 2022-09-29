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

document.getElementById("submit").onclick=function(event){careersFormValidation(event)};
function careersFormValidation(event){
	event.preventDefault();
	var form=document.forms["careerForm"];
	var required_list=document.forms["careerForm"].getElementsByClassName("required")
	for(var i=0; i< required_list.length;i++){
		if(required_list[i].value=="")
		{
			form.parentNode.parentNode.querySelector("p.commonErrorMsg").classList.remove("hide");
			break;
		}
	}
	if(i == required_list.length){
		form.parentNode.parentNode.querySelector("p.commonErrorMsg").classList.add("hide");
		form.classList.add("hide");
		form.parentNode.querySelector("p.content").innerHTML="Thank you for showing interest. Will get back to you shortly.";
	}
}


//Contact Us
var validationFlag=0;
//ClearForm JavaScript
document.getElementById("clearButton").onclick=function(event){clearForm(event)};
function clearForm(event) {
	var input_fields = document.getElementsByClassName("contactInput");
	event.preventDefault();
	for(let i=0; i<input_fields.length; i++){
		if(input_fields[i].value != "")
		{
			input_fields[i].value = "";
		}
	}
	var radio_buttons=document.getElementsByClassName("contactRadio");
	for(let i=0; i<radio_buttons.length; i++){
		if(radio_buttons[i].checked == true)
		{
			radio_buttons[i].checked = false;
		}
	}
	var error_msg=document.getElementsByClassName("errorMsg");
	for(let i=0;i<error_msg.length;i++){
		error_msg[i].classList.add("hide");
	}
	document.getElementsByClassName("validation")[0].innerHTML="";
}


//PromoCode JavaScript

function setPromoBoxValue(){
	var state_value = document.getElementById("state").value;
	if(state_value != "")
	{
		document.getElementById("promoCode").value = state_value+"-PROMO";
	}
	else{
		document.getElementById("promoCode").value = "";
	}
}



//RequirementsCheck JavaScript
document.getElementById("sendButton").onclick=function(event){requirementsCheck(event)};
function requirementsCheck(event){
	event.preventDefault();
	var required_elements = document.getElementsByClassName("Required");
	let flag=0;
	var temp;
	for(let i=0;i<required_elements.length;i++){
		temp=required_elements[i].parentElement;
		let error_msg=t.querySelector(".errorMsg");
		if(required_elements[i].value=="")
		{
			if(error_msg.classList.contains("hide")){
				error_msg.classList.remove("hide");
			}
			flag=1;
		}
		else{
			if(!error_msg.classList.contains("hide")){
				error_msg.classList.add("hide");
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
	var valid = input.parentNode.getElementsByClassName("validation")[0];

	let pattern = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$";
	if(!email.match(pattern)){
		valid.innerHTML = "Invalid Email!";
		validationFlag=1;
	}
	else{
		valid.innerHTML="";
		validationFlag=0;
	}
}
