var contacts = {};
var contactObj = {};
var uniqueId = 0;
var contactTileLayout = `<div class="contactTile">
					<div><span class="name"></span></div>
					<div class="details">
						<div><span class="email"></span></div>
						<div><span class="mobile"></span></div>
					</div>
				</div>`;
var validationPatterns = {
	"name": "^[A-za-z ]{3,}$",
	"email": "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$",
	"mobile": "^[(]?[\+]?[0-9]{0,3}[)]?( )?[0-9]{10}$",
	"landline": "^[0-9]{2,4}[(\-) ]?[0-9]{6,8}$",
	"website": "^((http|https):\/\/)?([w]{3}.)?[A-Za-z]+([A-Za-z0-9_(\-)%:\.\/])+$",
	"address": "[0-9A-Za-z\.(\-)\/: \n]+$"
}
var validationFlag=0;




function showForm(elementId){
	$("#formContainer").find(".buttons").addClass("hide");
	if(elementId=="addContact"){
		$("#addContactButtonsContainer").removeClass("hide");
	}
	if(elementId=="editOption"){
		$("#editContactButtonsContainer").removeClass("hide");
	}
	$("#formContainer").removeClass("hide");
}

function cancelForm(){
	$("#formContainer").addClass("hide");
	$("#contactForm").trigger("reset");
	resetValidationMsg("contactForm");
}


function fieldValidation(element){
	console.log(element);
	let input = $(element)[0].value;
	let name=$(element)[0].name;
	let temp = $(element)[0];
	let label = $(temp).parent().find(".formLabel").text();
	if(!(input.match(validationPatterns[name]))){
		validationFlag = 0;
		if(input==""){
			$(temp).parent().find(".validationMsg").text(label+" is required");
		}
		else{
			$(temp).parent().find(".validationMsg").text("Invalid "+label);
		}
	}
	else{
		$(temp).parent().find(".validationMsg").text("");
	}
}

function resetValidationMsg(elementId){
	$("#"+elementId).find(".validationMsg").each(function(){
		$(this).text("");
	})
}


function setContactObj(values){
	contactObj = {};
	for(let i=0;i<values.length;i++){
		let key = values[i].name;
		contactObj[key] = values[i].value;
	}
}

function setContactTileValues(contactTile){
	for(var key in contactObj){
		if(contactTile.find("."+key).length != 0){
			contactTile.find("."+key).text(contactObj[key]);
		}
	}
}

function setContactDetailsSectionValues(id){
	contactObj = JSON.parse(contacts[id]);
	for(var key in contactObj){
		if($("#"+key).length !=0){
			$("#"+key).text(contactObj[key]);
		}
	}
	$("#contactDetailsSection.hide").removeClass("hide");
}

function setInputFieldsValues(id){
	let values = $("#contactForm :input");
	contactObj = JSON.parse(contacts[id]);
	let temp = Object.values(contactObj);
	for(let i=0;i<temp.length;i++){
		values[i].value = temp[i];
	}
}



function formValidation(elementId){
	let fields = $("#"+elementId).find(":input");
	let values = fields.serializeArray();
	validationFlag=1;
	fields.each(function(){
		fieldValidation(this);
	})
	if(validationFlag){
		return true;
	}
	else{ return false;}

}

function changePage(elementId){
	$("#navigationContainer").find(".active").removeClass("active");
	$("#"+elementId).addClass("active");
	if(elementId == "addContact")
	{
		showForm(elementId);
	}
	else{
		cancelForm();	
	}
}

function addContact(){
	var values = $("#contactForm :input").serializeArray();
	if(formValidation("contactForm")){
		setContactObj(values);
		let newContactTile=$(contactTileLayout).appendTo("#contactsSection");
		setContactTileValues(newContactTile);
		let temp = newContactTile[0];
		temp.setAttribute("id",++uniqueId);
		contacts[uniqueId]=JSON.stringify(contactObj);
		newContactTile.click();
		changePage("home");
	}
		
}

$("#contactsSection").on("click",".contactTile",function(){
	$(".contactTile.active").removeClass("active");
	$(this).addClass("active");
	let id = $(this).attr("id");
	setContactDetailsSectionValues(id);
})

function editContact(element){
	let id = $(".contactTile.active")[0].getAttribute("id");
	setInputFieldsValues(id);
	showForm(element);
}

function deleteContact(){
	let id = $(".contactTile.active")[0].getAttribute("id");
	$(".contactTile.active")[0].remove();
	delete contacts[id];
	$("#contactDetailsSection").addClass("hide");
	$("#contactsSection").find(".contactTile")[0].click();

}

function updateContact(){
	if(formValidation("contactForm")){
		let id = $(".contactTile.active")[0].getAttribute("id");
		let values = $("#contactForm :input").serializeArray();
		setContactObj(values);
		contacts[id] = JSON.stringify(contactObj);
		cancelForm();
		let contactTile = $(".contactTile.active");
		setContactTileValues(contactTile);
		contactTile.click();
	}
}
