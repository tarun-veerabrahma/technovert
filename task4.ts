interface obj{
    [key:string]:string
};
interface contactObjType {
    [key:number]:string
};

var contacts:contactObjType = {};
var contactObj:obj={
	name:"",
	email:"",
	mobile:"",
	landline:"",
	website:"",
	address:""
};

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


var validationPatterns:obj = {
	"name": "^[A-za-z ]{3,}$",
	"email": "^[A-Za-z0-9._%+-]+@[A-Za-z0-9\.-]+\.[A-Za-z]{2,3}$",
	"mobile": "^(([\+][(][0-9]{1,3}[)])|([\+][0-9]{1,3}))?( )?[0-9]{10}$",
	"landline": "^[0-9]{2,4}[(\-) ]?[0-9]{6,8}$",
	"website": "^(((http|https)://)|(w{3}\.))$",
	"address": "[0-9A-Za-z\.(\-)\/: \n]+$",
};
var validationFlag:boolean;

var requiredFieldsIndicator='<span class="requiredFieldsIndicator">*</span>';

function markRequiredFields(elementId:string):any{
	$("#"+elementId).find(":input").each(function(){
		if($(this).attr("required") == "required"){
			$(this).parent().find(".formLabel").after(requiredFieldsIndicator);
		}
	})

}

function showForm(elementId:string){
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


function fieldValidation(element:HTMLElement){
	let input:string = (<HTMLInputElement>$(element)[0]).value;
	let name:string=(<HTMLInputElement>$(element)[0]).name;
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

function setErrorMsg(element:HTMLElement,msg:string){
	$(element).parent().find(".errorMsg").text(msg);
}

function resetErrorMsg(element:HTMLElement){
	$(element).parent().find(".errorMsg").text("");
}

function resetErrorMsgs(elementId:string){
	$("#"+elementId).find(".errorMsg").each(function(){
		$(this).text("");
	})
}

function setContactObj(values:JQuery.NameValuePair[]){
	for(let i=0;i<values.length;i++){
		let key = values[i].name;
		contactObj[key] = values[i].value;
	}
	
}

function setContactTileValues(contactTile:JQuery<HTMLElement>){
	for(var key in contactObj){
		if(contactTile.find("."+key).length != 0){
			contactTile.find("."+key).text(contactObj[key]);
			contactTile.find("."+key).parent().children(".tooltipText").text(contactObj[key]);
		}
	}
}

function setContactDetailsSectionValues(id:number){
	contactObj = JSON.parse(contacts[id]);
	for(var key in contactObj){
		if($("#"+key).length !=0){
			$("#"+key).text(contactObj[key]);
		}
	}
	$("#contactDetailsSection.hide").removeClass("hide");
}

function setInputFieldsValues(id:number){
	let values = $("#contactForm :input");
	contactObj = JSON.parse(contacts[id]);
	let temp = Object.keys(contactObj).map(function(e){
        return contactObj[e];
    });
	for(let i=0;i<temp.length;i++){
		(<HTMLInputElement>values[i]).value = temp[i];
	}
}



function formValidation(elementId:string){
	let fields = $("#"+elementId).find(":input");
	let values = fields.serializeArray();
	validationFlag=true;
	fields.each(function(){
		fieldValidation(this);
	})
	return validationFlag;

}

function changePage(elementId:string){
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
		temp.setAttribute("id",String(++uniqueId));
		contacts[uniqueId]=JSON.stringify(contactObj);
		newContactTile.trigger("click");
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
    if(typeof id!=undefined)
	setContactDetailsSectionValues(Number(id));
})

function openEditContactForm(elementId:string){
	let id = $(".contactTile.active")[0].getAttribute("id");
	if(typeof id != null)
    setInputFieldsValues(Number(id));
	showForm(elementId);
}

function deleteContact(){
	if(confirm("Are you sure, you want to delete this contact")){
		let id = $(".contactTile.active")[0].getAttribute("id");
		if(id!=null){
			$(".contactTile.active")[0].remove();
		delete contacts[Number(id)];
		$("#contactDetailsSection").addClass("hide");

		let contactTiles = $("#contactsSection").children(".contactTile");
		if(contactTiles.length>=1){
			for(var i=0;i<contactTiles.length;i++){
                let contactTile = <HTMLElement>contactTiles[i];
                var tileId = <string>contactTile.getAttribute("id");
                
                if(tileId>id){
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
}

function updateContact(){
	if(formValidation("contactForm")){
		let id = $(".contactTile.active")[0].getAttribute("id");
		let values = $("#contactForm :input").serializeArray();
		setContactObj(values);
		if(typeof id !=null)
		contacts[Number(id)] = JSON.stringify(contactObj);
		closeForm();
		let contactTile = $(".contactTile.active");
		setContactTileValues(contactTile);
		contactTile.trigger("click");
	}
}
