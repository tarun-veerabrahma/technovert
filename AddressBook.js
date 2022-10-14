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
	"landline": "^[0-9]{2,4}[- ]?[0-9]{6,8}$",
	"website": "^((http|https):\/\/)?([w]{3}.)?[A-Za-z]+([A-Za-z0-9_(\-)%:\.\/])+$",
	"address": "[0-9A-Za-z\.(\-)\/: \n]*$"
}


function formValidation(This){
	let fields = $("#"+This).find(":input");
	let values = fields.serializeArray();
	console.log(fields[0].value);
	console.log(values);
	let count=0;
	fields.each(function(index){
		let input = $(this)[0].value;
		let name=$(this)[0].name;
		let ele = $(this)[0];
		let label = $(ele).parent().find(".label").text();
		if(input==""){
			$(ele).parent().find(".validationMsg").text(label+" is required");
		}
		else{
			if(!(input.match(validationPatterns[name]))){
				$(ele).parent().find(".validationMsg").text("Invalid "+name);
			}
			else{
				$(ele).parent().find(".validationMsg").text("");
				count++;
			}
		}

	})
	if(fields.length == count){
		return true;
	}
	else{ return false;}

}

function changePage(This){
	console.log(This);
	$("#navigationContainer").find(".active").removeClass("active");
	$("#"+This).addClass("active");
	if(This == "addContact")
	{
		unhideForm(This);
	}
	else{
		hideForm();	
	}
}

function unhideForm(This){
	if(This=="addContact"){
		//$("#navigationContainer, #contactsSection").addClass("disable");
		$("#formContainer").find(".buttons").addClass("hide");
		$("#addContactSectionButtons").removeClass("hide");
		$("#formContainer").removeClass("hide");
	}
	if(This=="editOption"){
		//$("#navigationContainer, #contactsSection").addClass("disable");
		$("#formContainer").find(".buttons").addClass("hide");
		$("#editContactSectionButtons").removeClass("hide");
		$("#formContainer").removeClass("hide");
	}
}

function hideForm(){
	$("#formContainer").addClass("hide");
	$("#contactDetailsForm").trigger("reset");
	//$("#navigationContainer, #contactsSection").removeClass("disable");
}



function addContact(){
	var values = $("#contactDetailsForm :input").serializeArray();
	if(formValidation("contactDetailsForm")){
		console.log("approved");
		for(let i=0;i<values.length;i++){
			let key = values[i].name;
			contactObj[key] = values[i].value;
		}
		let t=$(contactTileLayout).appendTo("#contactsSection");
		t.find(".name").html(contactObj.name);
		t.find(".email").html(contactObj.email);
		t.find(".mobile").html(contactObj.mobile);
		let temp = t[0];
		temp.setAttribute("id",++uniqueId);
		let id=uniqueId;
		let elements = $("#"+String(id)).find("span");
		contacts[uniqueId]=JSON.stringify(contactObj);
		hideForm();
	}
		
}

$("#contactsSection").on("click",".contactTile",function(){
	$(".contactTile.active").removeClass("active");
	$(this).addClass("active");
	let key = $(this).attr("id");
	let temp = JSON.parse(contacts[key]);
	$("#name").html(temp.name);
	$("#email").html(temp.email);
	$("#mobile").html(temp.mobile);
	$("#landline").html(temp.landline);
	$("#website").html(temp.website);
	$("#addressValue").html(temp.address);
	$("#contactDetailsSection.hide").removeClass("hide");
})

function editDetails(This){
	let id = $(".contactTile.active")[0].getAttribute("id");
	let values = $("#contactDetailsForm :input");
	let object = JSON.parse(contacts[id]);
	let temp = Object.values(object);
	for(let i=0;i<temp.length;i++){
		values[i].value = temp[i];
	}
	unhideForm(This);
}

function deleteContact(){
	let id = $(".contactTile.active")[0].getAttribute("id");
	$(".contactTile.active")[0].remove();
	delete contacts[id];
	$("#contactDetailsSection").addClass("hide");

}

function updateDetails(){
	let id = $(".contactTile.active")[0].getAttribute("id");
	let values = $("#contactDetailsForm :input").serializeArray();
	
	let contactObj={};
	for(let i=0;i<values.length;i++){
		let key = values[i].name;
		contactObj[key] = values[i].value;
	}
	contacts[id] = JSON.stringify(contactObj);
	hideForm();
	let temp = contactObj;
	let t = $(".contactTile.active");
	t.find(".name").html(contactObj.name);
	t.find(".email").html(contactObj.email);
	t.find(".mobile").html(contactObj.mobile);
	$("#name").html(temp.name);
	$("#email").html(temp.email);
	$("#mobile").html(temp.mobile);
	$("#landline").html(temp.landline);
	$("#website").html(temp.website);
	$("#addrValue").html(temp.address);
}
