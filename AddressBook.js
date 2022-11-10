var contacts = {};
var contactObj = {};
var uniqueId = 0;
var contactTileLayout = `<div class="contactTile">
					<div class="tooltip">
						<span class="contactDetail name"></span>
						<span class="tooltipText"></span>
					</div>
					<div class="details">
						<div class="tooltip">
							<span class="contactDetail email"></span>
							<span class="tooltipText"></span>
						</div>
						<span class="contactDetail mobile"></span>
					</div>
				</div>`;
var validationPatterns = {
	"name": "^[A-za-z ]{3,}$",
	"email": "^[A-Za-z0-9._%+-]+@[A-Za-z0-9\.-]+\.[A-Za-z]{2,3}$",
	"mobile": "^(([\+][(][0-9]{1,3}[)])|([\+][0-9]{1,3}))?( )?[0-9]{10}$",
	"landline": "^[0-9]{2,4}[(\-) ]?[0-9]{6,8}$",
	"website": "^(((http|https)://)|(w{3}\.))$",
	"address": "[0-9A-Za-z\.(\-)\/: \n]+$"
}


var requiredFieldsIndicator='<span class="requiredFieldsIndicator">*</span>';

function markRequiredFields(elementId){
	$("#"+elementId).find(":input").each(function(){
		if($(this).attr("required") == "required"){
			$(this).parent().find(".formLabel").after(requiredFieldsIndicator);
		}
	})

}

function showForm(elementId){
	$("#formContainer").find(".buttons").addClass("hide");
	if(elementId=="addContact"){
		$("#addContactButtonsContainer").removeClass("hide");
		$(".body").addClass("blur");
		$("#formContainer").addClass("focus");
	}
	if(elementId=="editOption"){
		$("#editContactButtonsContainer").removeClass("hide");
	}
	$("#formContainer").removeClass("hide");
}

function closeForm(){
	$("#formContainer").addClass("hide");
	$("#contactForm").trigger("reset");
	$("#contactForm").removeClass("focus");
	$(".body").removeClass("blur");
	resetErrorMsgs("contactForm");
	changePage("home");
}


function fieldValidation(element){
	let input = $(element)[0].value;
	let name=$(element)[0].name;
	let temp = $(element)[0];
	let label = $(temp).parent().find(".formLabel").text();
	if(!(input.match(validationPatterns[name]))){
		validationFlag = false;
		if(input==""){
			setErrorMsg(temp,label+" is required");
		}
		else{
			setErrorMsg(temp,"Invalid "+label);
		}
	}
	else{
		resetErrorMsg(temp);
	}
}

function setErrorMsg(element,msg){
	$(element).parent().find(".errorMsg").text(msg);
}

function resetErrorMsg(element){
	$(element).parent().find(".errorMsg").text("");
}

function resetErrorMsgs(elementId){
	$("#"+elementId).find(".errorMsg").each(function(){
		$(this).text("");
	})
}

function setContactObj(values){
	for(let i=0;i<values.length;i++){
		let key = values[i].name;
		contactObj[key] = values[i].value;
	}
}

function setContactTileValues(contactTile){
	for(var key in contactObj){
		if(contactTile.find("."+key).length != 0){
			contactTile.find("."+key).text(contactObj[key]);
			contactTile.find("."+key).parent().children(".tooltipText").text(contactObj[key]);
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
	validationFlag=true;
	fields.each(function(){
		fieldValidation(this);
	})
	return validationFlag;

}

function changePage(elementId){
	$("#navigationContainer").find(".active").removeClass("active");
	$("#"+elementId).addClass("active");
	if(elementId == "addContact")
	{
		showForm(elementId);
	}
}


$("#addContact").one("click",markRequiredFields("contactForm"));
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
		closeForm();
	}
		
}

function cancelForm(){
	if(confirm("Your changes will not be saved")){
		closeForm();
	}
}

$("#contactsSection").on("click",".contactTile",function(){
	$(".contactTile.active").removeClass("active");
	$(this).addClass("active");
	let id = $(this).attr("id");
	setContactDetailsSectionValues(id);
})

function openEditContactForm(element){
	let id = $(".contactTile.active")[0].getAttribute("id");
	setInputFieldsValues(id);
	showForm(element);
}

function deleteContact(){
	if(confirm("Are you sure, you want to delete this contact")){
		let id = $(".contactTile.active")[0].getAttribute("id");
		$(".contactTile.active")[0].remove();
		delete contacts[id];
		$("#contactDetailsSection").addClass("hide");

		let contactTiles = $("#contactsSection").children(".contactTile");
		if(contactTiles.length>=1){
			for(var i=0;i<contactTiles.length;i++){
				if(contactTiles[i].getAttribute("id")>id){
					contactTiles[i].click();
					break;
				}
			}
			if(i==contactTiles.length){
				contactTiles[i-1].click();
			}
		}
			
	}
}

function updateContact(){
	if(formValidation("contactForm")){
		let id = $(".contactTile.active")[0].getAttribute("id");
		let values = $("#contactForm :input").serializeArray();
		setContactObj(values);
		contacts[id] = JSON.stringify(contactObj);
		closeForm();
		let contactTile = $(".contactTile.active");
		setContactTileValues(contactTile);
		contactTile.click();
	}
}