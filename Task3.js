//navBar JavaScript
var a = "home";
document.getElementById("homeNav").onclick = function() {change("homeNav","home")};
document.getElementById("servicesNav").onclick = function() {change("servicesNav","")};
document.getElementById("careersNav").onclick = function() {change("careersNav","careers")};
document.getElementById("contactNav").onclick = function() {change("contactNav","contact")};
function change(This,e) {
	document.getElementsByClassName("active")[0].classList.remove("active");
	document.getElementById(This).classList.add("active");
	document.getElementById(a).classList.add("hide");
	document.getElementById(e).classList.remove("hide");
	a=e;

}


//Careers
document.getElementById("files").onchange=function(event){value()};
function value(event) {
	document.getElementById("filename").value = document.getElementById("files").value;
}

document.getElementById("submit").onclick=function(event){submit(event)};
function submit(event){
	event.preventDefault();
	var a=document.forms["careerForm"];
	var c=document.forms["careerForm"].getElementsByClassName("required")
	let i=0;
	for(i=0; i< c.length;i++){
		if(c[i].value=="")
		{
			a.parentNode.querySelector(".ErrorMsg").classList.remove("hide");
			break;
		}
	}
	if(i == c.length){
		a.parentNode.querySelector(".ErrorMsg").classList.add("hide");
		a.classList.add("hide");
		a.parentNode.querySelector("p.content").innerHTML="Thank you for showing interest. Will get back to you shortly.";
	}
}


//Contact Us
var validationFlag=0;
//ClearForm JavaScript
document.getElementById("clearButton").onclick=function(event){clearForm(event)};
function clearForm(event) {
	var l = document.getElementsByClassName("contactInput");
	event.preventDefault();
	for(let i=0; i<l.length; i++){
		if(l[i].value != "")
		{
			l[i].value = "";
		}
	}
	var k=document.getElementsByClassName("contactRadio");
	for(let i=0; i<k.length; i++){
		if(k[i].checked == true)
		{
			k[i].checked = false;
		}
	}
	var h=document.getElementsByClassName("errorMsg");
	for(let i=0;i<h.length;i++){
		h[i].classList.add("hide");
	}
	document.getElementsByClassName("validation")[0].innerHTML="";
}


//PromoCode JavaScript
document.getElementById("state").onclick=function(){promoBox()};
function promoBox(){
	var b = document.getElementById("state").value;
	if(b != "Select")
	{
		document.getElementById("promoCode").value = b+"-PROMO";
	}
	else{
		document.getElementById("promoCode").value = "";
	}
}


//GenderAlerts JavaScript
document.getElementById("Male").onclick=function(){alert("Hello Sir!");};
document.getElementById("Female").onclick=function(){alert("Hello Madam!");};


//RequirementsCheck JavaScript
document.getElementById("sendButton").onclick=function(event){ check(event)};

/*function check(event){
	event.preventDefault();
	var l = document.getElementsByClassName("Required");
	let c=0;
	for(let i=0;i<l.length;i++){
		if(l[i].value=="")
		{
			c+=1;
			break;
		}
	}
	var t=document.getElementById("mainError");
	if(c>0){
		
		if(t.classList.contains("hide")){
			t.classList.remove("hide");
		}
	}
	else{
		if(!t.classList.contains("hide")){
			t.classList.add("hide");
		}
		alert("Your request has been received");
	}
}*/



function check(event){
	event.preventDefault();
	var l = document.getElementsByClassName("Required");
	let c=0;
	let t="";
	for(let i=0;i<l.length;i++){
		t=l[i].parentElement;
		let b=t.querySelector(".errorMsg");
		if(l[i].value=="")
		{
			if(b.classList.contains("hide")){
				b.classList.remove("hide");
			}
			c=1;
		}
		else{
			if(!b.classList.contains("hide")){
				b.classList.add("hide");
			}
		}
	}
	if(c==0 && validationFlag==0){
		document.getElementsByClassName("contactForm")[0].classList.add("hide");
		document.getElementsByClassName("successfulSubmission")[0].classList.remove("hide");			
	}
}


//Email Validation
function validateMail(a){
	var email = document.forms["contactForm"]["meMail"].value;
	var valid = a.parentNode.getElementsByClassName("validation")[0];

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
