var contactDetails = {};

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
					<div>
						<span class="email"></span>
						<span class="mobile"></span>
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
		console.log(contactObj);
		let t=$(contactTileLayout).appendTo(".contactTileSection");
		t.find(".name").html(contactObj.contactName);
		t.find(".email").html(contactObj.mailId);
		t.find(".mobile").html(contactObj.contactMobile);
		contactDetails[contactObj.contactName]=JSON.stringify(contactObj);
		$(".link.active").removeClass("active");
		$("#homeNav").addClass("active");
		//$(".navigation").addClass("disable");
		$(".page").addClass("hide");
		$(".home").removeClass("hide");

	})

	$(".contactTileSection").on("click",".contactTile",function(){
		$(".contactTile.active").removeClass("active");
		$(this).addClass("active");
		let name = $(this).find(".name").html();
		let temp = JSON.parse(contactDetails[name]);
		$(".contactDetails .name").html(temp.contactName);
		$(".contactDetails .email").html("Email: "+temp.mailId);
		$(".contactDetails .mobile").html("Mobile: "+temp.contactMobile);
		$(".contactDetails .landline").html("Landline: "+temp.contactLandline);
		$(".contactDetails .website").html("Website: "+temp.contactWebsite);
		$(".contactDetails .addrValue").html(temp.contactAddress);

		console.log(temp);
	})
})