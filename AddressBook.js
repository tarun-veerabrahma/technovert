var contacts = {};
var uniqueId = 0;

//navBar
$("document").ready(function(){
	$("#addNav").click(function(){
		$(".link.active").removeClass("active");
		$(this).addClass("active");
		//$(".navigation").addClass("disable");
		$(".addContainer").removeClass("hide");
	})

	$("#homeNav").click(function(){
		$(".link.active").removeClass("active");
		$(this).addClass("active");
		//$(".navigation").addClass("disable");
		$(".page").addClass("hide");
		$(".home").removeClass("hide");
	})
})




var contactTileLayout = `<div class="contactTile">
					<div class="name"></div>
					<div class="details">
						<div><span class="email"></span></div>
						<div><span class="mobile"></span></div>
					</div>
				</div>`;

var contactObj = {};


$("document").ready(function(){
	$(".add .rightChild .button").click(function(){
		var values = $("#addForm :input").serializeArray();
		for(let i=0;i<values.length;i++){
			let key = values[i].name;
			contactObj[key] = values[i].value;
		}
		let t=$(contactTileLayout).appendTo(".contactTileSection");
		t.find(".name").html(contactObj.name);
		t.find(".email").html(contactObj.mailId);
		t.find(".mobile").html(contactObj.mobile);
		let temp = t[0];
		temp.setAttribute("id",++uniqueId);
		contacts[uniqueId]=JSON.stringify(contactObj);
		$(".link.active").removeClass("active");
		$("#homeNav").addClass("active");
		//$(".navigation").addClass("disable");
		$("#addForm").trigger("reset");
		$(".page").addClass("hide");
		$(".home").removeClass("hide");

	})

	$(".contactTileSection").on("click",".contactTile",function(){
		$(".contactTile.active").removeClass("active");
		$(this).addClass("active");
		let key = $(this).attr("id");
		let temp = JSON.parse(contacts[key]);
		$(".contactDetails #name").html(temp.name);
		$(".contactDetails #email").html("Email: "+temp.mailId);
		$(".contactDetails #mobile").html("Mobile: "+temp.mobile);
		$(".contactDetails #landline").html("Landline: "+temp.landline);
		$(".contactDetails #website").html("Website:"+temp.website);
		$(".contactDetails #addrValue").html(temp.address);
		$(".detailsSection.hide").removeClass("hide");
	})

	$("#edit").click(function (){
		let id = $(".contactTile.active")[0].getAttribute("id");
		let values = $("#editForm :input");
		let object = JSON.parse(contacts[id]);
		let temp = Object.values(object);
		for(let i=0;i<temp.length;i++){
			values[i].value = temp[i];
		}
		
		$(".editContainer").removeClass("hide");
	})

	$("#delete").click(function (){
		let id = $(".contactTile.active")[0].getAttribute("id");
		$(".contactTile.active")[0].remove();
		delete contacts[id];
		console.log(contacts); 
		$(".detailsSection").addClass("hide");

	})

	$("#save").click(function (){
		let id = $(".contactTile.active")[0].getAttribute("id");
		let values = $("#editForm :input").serializeArray();
		
		let contactObj={};
		for(let i=0;i<values.length;i++){
			let key = values[i].name;

			contactObj[key] = values[i].value;
		}
		console.log(contactObj);
		contacts[id] = JSON.stringify(contactObj);
		$("#editForm").trigger("reset");
		$(".editContainer").addClass("hide");
		let temp = contactObj;
		let t = $(".contactTile.active");
		t.find(".name").html(contactObj.name);
		t.find(".email").html(contactObj.mailId);
		t.find(".mobile").html(contactObj.mobile);
		$(".contactDetails #name").html(temp.name);
		$(".contactDetails #email").html("Email: "+temp.mailId);
		$(".contactDetails #mobile").html("Mobile: "+temp.mobile);
		$(".contactDetails #landline").html("Landline: "+temp.landline);
		$(".contactDetails #website").html("Website:"+temp.website);
		$(".contactDetails #addrValue").html(temp.address);
	})

})
