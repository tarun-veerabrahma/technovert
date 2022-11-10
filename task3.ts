//navBar JavaScript
var defaultPage = "home";
var presentPage:string;
presentPage=defaultPage;

function changePage(This:HTMLElement,calledPage:string) {
	document.getElementsByClassName("active")[0].classList.remove("active");
	This.classList.add("active");
    let page=document.getElementById(presentPage);
    if(page!=null)
    page.classList.add("hide");
	page=document.getElementById(calledPage);
    if(page!=null)
    page.classList.remove("hide");

	presentPage=calledPage;

}


//Careers
function getFileName() {
    let filename=document.getElementById("filename");
    let name=document.getElementById("files");
    if(filename!=null && name!=null)
	(<HTMLInputElement>filename).value = (<HTMLInputElement>name).value;
}


function careersFormValidation(){
	var careersForm=<Element>document.querySelector("#careerForm");
    var careerFormContainer = <Element>careersForm.parentNode;
    var parent = <Element>careerFormContainer.parentNode;
	var requiredElements=careersForm.getElementsByClassName("required");

    let commonErrorMsg = <Element>parent.querySelector("p.commonErrorMsg");

	for(var i=0; i< requiredElements.length;i++){
		if((<HTMLInputElement>requiredElements[i]).value=="")
		{
			commonErrorMsg.classList.remove("hide");
			break;
		}
	}
	if(i == requiredElements.length){

		commonErrorMsg.classList.add("hide");
		careersForm.classList.add("hide");
		commonErrorMsg.innerHTML="Thank you for showing interest. Will get back to you shortly.";
	}
}


//Contact Us
var validationFlag=0;
//Clear Form JavaScript
function replaceForm() {
	var inputFields = document.getElementsByClassName("contactInput");
	for(let i=0; i<inputFields.length; i++){
		if((<HTMLInputElement>inputFields[i]).value != "")
		{
			(<HTMLInputElement>inputFields[i]).value = "";
		}
	}
	var radioButtons= document.querySelectorAll('#contactForm input[type=radio]:checked');
	for(let i=0; i<radioButtons.length;i++){
		(<HTMLInputElement>radioButtons[i]).checked=false;
	}
	var errorMsg=document.getElementsByClassName("errorMsg");
	for(let i=0;i<errorMsg.length;i++){
		errorMsg[i].classList.add("hide");
	}
	//document.getElementsByClassName("validation")[0].innerHTML="";
}


//PromoCode JavaScript

function setPromoBoxValue(){
	var stateValue = (<HTMLInputElement>document.getElementById("state")).value;
	(stateValue != "")? (<HTMLInputElement>document.getElementById("promoCode")).value = stateValue+"-PROMO": (<HTMLInputElement>document.getElementById("promoCode")).value = "";
}



//RequirementsCheck JavaScript

function contactFormValidation(){
	var requiredElements = document.getElementsByClassName("requiredField");
	let flag=0;
	var temp;
    var emailElement=<HTMLInputElement>document.querySelector("#emailElement");
	if(emailElement.value == ""){
        let parent=<Element>emailElement.parentNode;
		let msg = <Element>parent.querySelector(".emailValidationMsg");
		msg.innerHTML = "";
	}
	for(let i=0;i<requiredElements.length;i++){
		temp=<Element>requiredElements[i].parentElement;
		let errorMsg=<Element>temp.querySelector(".errorMsg");
		if((<HTMLInputElement>requiredElements[i]).value=="")
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
	if(!flag && !validationFlag){
		document.getElementsByClassName("contactForm")[0].classList.add("hide");
		document.getElementsByClassName("successMsg")[0].classList.remove("hide");			
	}
}


//Email Validation
function validateMail(input:HTMLElement){
    var emailElement=<HTMLInputElement>document.querySelector("#emailElement");
	var email = emailElement.value;
    let inputParent =<HTMLElement>input.parentNode;
    if(inputParent!=null){
        var validationField = inputParent.getElementsByClassName("emailValidationMsg")[0];

	let pattern = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$";
	if(!email.match(pattern)){
		(<HTMLElement>validationField).innerHTML = "Invalid Email!";
		validationFlag=1;
		if(email!=""){
            let parent=<ParentNode>emailElement.parentNode;
			let msg = <Element>parent.querySelector(".errorMsg");
			console.log(msg);
			if(!msg.classList.contains("hide")){
				msg.classList.add("hide");
			}
		}
	}
	else{
		validationField.innerHTML="";
		validationFlag=0;
	}
    }
	
}