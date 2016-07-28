


var achPhoto="";
var achPhoto2="";
var imageName = "";
var imageName2 = "";
var imagePathA="";
var imagePath2A="";

var latitude="";
var longitude="";
var upListFlag=0;



function getLocationInfoAch() {	
	var options = { enableHighAccuracy: false};	
	navigator.geolocation.getCurrentPosition(onSuccess, onError, options);				
	$(".errorChk").html("Confirming location. Please wait.");
}
// onSuccess Geolocation
function onSuccess(position) {
	$("#ach_lat").val(position.coords.latitude);
	$("#ach_long").val(position.coords.longitude);
	$(".errorChk").html("Location Confirmed");
}
// onError Callback receives a PositionError object
function onError(error) {
   $("#ach_lat").val(0);
   $("#ach_long").val(0);
   $(".errorChk").html("Failed to Confirmed Location.");
}

//---- online 
var apipath="http://a.businesssolutionapps.com/gpff/syncmobile/";

//--- local
//var apipath="http://127.0.0.1:8000/gpff2/syncmobile/";

 url ="";


$(document).ready(function(){
	if (localStorage.synced!='YES'){
			 url = "#pagesync";						
		}else{
			
			if (upListFlag==0){
				$("#ffUpDiv").html(localStorage.upazilaList);	
				upListFlag=1;
			}else{
				$('#ffUpDiv').empty();
				$('#ffUpDiv').append(localStorage.upazilaList).trigger('create');
			}
			
			/*--------compliance-----------*/
			$("#agr_type_con").hide();		
			$("#act_con").hide();
			$("#pta_con").hide();
			$("#drh").hide();
			$("#sa_report").hide();
			$("#isf").hide();
			$("#iaa").hide();
			$("#award_dist").hide();
			$("#arsenic").hide();
			$("#ins_tube").hide();
			$("#eacm").hide();
			$("#social_audit").hide();
			/*--------compliance-end----------*/
			
			url = "#homePage";
		}
	$.mobile.navigate(url);
	
	
});

function syncBasic() {
					
		var mobile=$("#mobile").val() ;
	 	var password=$("#password").val() ;
		
		if (mobile=="" || password==""){
			 $(".errorMsg").html("Required mobile no and password");	
		 }else{	
			 $('#syncBasic').hide();			 
			 $(".errorMsg").html("Sync in progress. Please wait...");
			if(localStorage.sync_code==undefined || localStorage.sync_code==""){
					localStorage.sync_code=0
				}
		
		 	//alert(apipath+'passwordCheck?cid=GPFF2&mobile='+mobile+'&password='+encodeURIComponent(password)+'&sync_code='+localStorage.sync_code);
			$.ajax({
			  url:apipath+'passwordCheck?cid=GPFF2&mobile='+mobile+'&password='+encodeURIComponent(password)+'&sync_code='+localStorage.sync_code,
			  success: function(result) {
				syncResult=result
				//alert(syncResult);
				var syncResultArray = syncResult.split('rdrd');
					localStorage.synced=syncResultArray[0];
					if (localStorage.synced=='YES'){	
						localStorage.sync_code=syncResultArray[1];
						//localStorage.upazilaList=syncResultArray[2];						
						
						localStorage.mobile_no=mobile;
						
						
						$(".errorMsg").html("Sync Successful");
						
						$('#syncBasic').show();
						
						
						url = "#homePage";
						$.mobile.navigate(url);
												
					}else{
						
						$(".errorMsg").html("Sync Failed. Authorization or Network Error.");
						$('#syncBasic').show();
					}
				
			  }//----/success f
			});//------/ajax
			
		 }//-----/field
			
	}
	

function menuClick(){
		$(".errorChk").text("");
		$(".sucChk").text("");
		
		$("#btn_take_pic").show();
		$("#btn_ach_lat_long").show();
		
		$('#up_list_search').val('');
		
		url = "#homePage";
		$.mobile.navigate(url);
	
	}
//----------------back button
function backClick(){
	$(".errorChk").text("");
	}


function agentList(){ 
	var agentListStr="";
	 	//alert(apipath+'agent_list?cid=GPFF2&sync_code='+localStorage.sync_code+'&mobile_no='+localStorage.mobile_no);
		$.ajax({
			  url:apipath+'agent_list?cid=GPFF2&sync_code='+localStorage.sync_code+'&mobile_no='+localStorage.mobile_no,
			  success: function(resStr) {	
				  agentListStr=resStr.split("<fd>");
				  //alert(agentListStr);
				  var agentListS='';
				  
				  for (i=0;i<agentListStr.length;i++){
					  agentList=agentListStr[i].split("<fdfd>");
					  
					  for (j=0;j<agentList.length;j++){
						  agentListS+='<li style="margin-bottom:1px;" onClick="agentListPage2(\''+agentList[0]+'\')" ><a>'+agentList[0]+'</a></li>' 
						  }
					  
				  	  				  				  
				  }	
				  
				  			  
				  $("#agentList").html(agentListS);
				  //localStorage.agentListS=agentListS;	
				  url="#first_page";					
				  $.mobile.navigate(url);
				  				  
			  }
			});
	
}


function agentListPage2(agent){
	localStorage.agent=agent;
	//alert(localStorage.agent);
	
	$("#showAgentName").html(localStorage.agent);
	url="#agentPage2";					
	$.mobile.navigate(url);

}

//===================	
function agentNextPage3(){	
	
	var festoon=$("input[name='festoon']:checked").val();
	var shop_screen=$("input[name='shop_screen']:checked").val();
	var identifier=$("input[name='identifier']:checked").val();
	var posm_materials=$("#posm_materials").val();
	
	if (festoon=="" ){
		$(".errorChk").text("Required festoon");
	}else if(shop_screen==""){
		$(".errorChk").text("Required shop screen");
	}else if (identifier=="" ){
		$(".errorChk").text("Required identifier");	
	
	}else{
			
			agentPage3="&festoon="+festoon+"&shop_screen="+shop_screen+"&identifier="+identifier+"&posm_materials="+posm_materials			
			
			//alert(agentPage3); 
					
			$(".errorChk").text("");
			
			url="#agentPage3"
			$.mobile.navigate(url);				
			
		}
	
	};	

//======shop
function get_pic_shop() {
	/*var tempTime = $.now();
	shop_image_name=tempTime.toString()+"_shop.jpg";
	$("#shop_image_name_hidden").val(shop_image_name);
	$("#shop_image_div_hidden").val(shop_image_name);*/
	navigator.camera.getPicture(onSuccessShop, onFailShop, { quality: 70,
		targetWidth: 450,
		destinationType: Camera.DestinationType.FILE_URI , correctOrientation: true });
}
function onSuccessShop(imageURI) {
	var image = document.getElementById('shop_image_div');
    image.src = imageURI;
    var hidden_path="shop_image_div_hidden";
	$("#"+hidden_path).val(imageURI);
	
}
function onFailShop(message) {
	imagePathA="";
    alert('Failed because: ' + message);
}


function uploadPhoto(imageURI, imageName) {
  var options = new FileUploadOptions();
  options.fileKey="upload";
//  options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
  options.fileName=imageName;
//	options.fileName = options.fileName
  options.mimeType="image/jpeg";

  var params = {};
  params.value1 = "test";
  params.value2 = "param";

  options.params = params;

  var ft = new FileTransfer();

 ft.upload(imageURI, encodeURI("http://a.businesssolutionapps.com/mrepimage/syncmobile/fileUploader/"),win,fail,options);
}
//===========


function agentNextPage4(){
		
		var poster=$("input[name='poster']:checked").val();
		var sticker=$("input[name='sticker']:checked").val();
		var bunting=$("input[name='bunting']:checked").val();
		var dangler=$("input[name='dangler']:checked").val();
		var other_posm_materials=$("#other_posm_materials").val();
		
		if (poster=="" ){
			$(".errorChk").text("Required poster");
		}else if (sticker=="" ){
			$(".errorChk").text("Required sticker");	
		}else if (bunting=="" ){
			$(".errorChk").text("Required bunting");	
		}else if (dangler=="" ){
			$(".errorChk").text("Required dangler");	
					
		}else{
			
			agentPage4="&poster="+poster+"&sticker="+sticker+"&bunting="+bunting+"&dangler="+dangler+"&other_posm_materials="+other_posm_materials
			
			//alert(agentPage4);
			 	
			$(".errorChk").text("");
						 
			url="#agentPage4";
			
			$.mobile.navigate(url);
			//$(location).attr('href',url);
			
		  } 
	
	};	



//======shop
/*function get_pic_shop_2() {
	var tempTime = $.now();
	shop_image_name=tempTime.toString()+"_shop.jpg";
	$("#shop_image_name_hidden").val(shop_image_name);
	$("#shop_image_div_hidden").val(shop_image_name);
	navigator.camera.getPicture(onSuccessShop, onFailShop, { quality: 70,
		targetWidth: 450,
		destinationType: Camera.DestinationType.FILE_URI , correctOrientation: true });
}
function onSuccessShop(imageURI) {
	var image = document.getElementById('shop_image_div');
    image.src = imageURI;
    var hidden_path="shop_image_div_hidden";
	$("#"+hidden_path).val(imageURI);
}
function onFailShop(message) {
	imagePathB="";
    alert('Failed because: ' + message);
}


function uploadPhoto(imageURI, imageName) {
  var options = new FileUploadOptions();
  options.fileKey="upload";
//  options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
  options.fileName=imageName;
//	options.fileName = options.fileName
  options.mimeType="image/jpeg";

  var params = {};
  params.value1 = "test";
  params.value2 = "param";

  options.params = params;

  var ft = new FileTransfer();

 ft.upload(imageURI, encodeURI("http://a.businesssolutionapps.com/mrepimage/syncmobile/fileUploader/"),win,fail,options);
}
//===========


*/






function agentSubmit(){
		
		var ava_stock=$("#ava_stock").val();
		var stock_req=$("#stock_req").val();
		var competitions_stock=$("#competitions_stock").val();
		
		try{
			if(ava_stock != ""){
				ava_stock=parseInt($("#ava_stock").val());
			}
		}catch(err){
			ava_stock=""
		}
		
		try{
			if(stock_req != ""){
				stock_req=parseInt($("#stock_req").val());
			}
		}catch(err){
			stock_req=""
		}
		
		try{
			if(competitions_stock != ""){
				competitions_stock=parseInt($("#competitions_stock").val());
			}
		}catch(err){
			competitions_stock=""
		}
		
		
		if (ava_stock=="" ){
			$(".errorChk").text("Required Available stock");
		}else if (stock_req=="" ){
			$(".errorChk").text("Required Stock request");	
		}else if (competitions_stock=="" ){
			$(".errorChk").text("Required Other Competitions Stock");
				
		}else{
			//alert(apipath+"submitData_visit_report?cid=GPFF2&mobile_no="+localStorage.mobile_no+"&syncCode="+localStorage.sync_code+'&ava_stock='+ava_stock+'&stock_req='+stock_req+'&competitions_stock='+competitions_stock+'&agentPage3='+agentPage3+'&agentPage4='+agentPage4);
			
			$.ajax({
					type: 'POST',
					url:apipath+"submitData_visit_report?cid=GPFF2&mobile_no="+localStorage.mobile_no+"&syncCode="+localStorage.sync_code+'&ava_stock='+ava_stock+'&stock_req='+stock_req+'&competitions_stock='+competitions_stock+'&agentPage3='+agentPage3+'&agentPage4='+agentPage4,
			
			
						success: function(result) {
						   if(result=='Success'){							
							//alert(result)
							
							$("#posm_materials").val("");
							$("#other_posm_materials").val("");
							$("#ava_stock").val("");
							$("#stock_req").val("");
							$("#competitions_stock").val("");						
							
							
							$(".sucChk").text('Successfully Submitted');
							$(".errorChk").text("");
							$("#btn_pmt_submit").show();						
						}else{
							$(".errorChk").text('Unauthorized Access');																	
							$("#btn_pmt_submit").show();
							}
							
					   }//end result
			});//end ajax
	
	}
			
		  } 
	


//==========================

function potentialAgent(){

	$(".errorChk").text("");
	url="#potentialAgentPage1";	
	$.mobile.navigate(url);

}


function potentialAgentNextPage2(){
		
		var agent_name=$("#agent_name").val();
		var agent_address=$("#agent_address").val();
		var agent_contactNo=$("#agent_contactNo").val();
		
		if (agent_name=="" ){
			$(".errorChk").text("Required Agent Name");
		}else if (agent_address=="" ){
			$(".errorChk").text("Required Agent Address");	
		}else if (agent_contactNo=="" ){
			$(".errorChk").text("Required Agent Contact No");	
					
		}else{
			
			potentialAgentPage1="&agent_name="+agent_name+"&agent_address="+agent_address+"&agent_contactNo="+agent_contactNo
			
			//alert(potentialAgentPage1);
			 	
			$(".errorChk").text("");
						 
			url="#potentialAgentPage2";
			
			$.mobile.navigate(url);
			//$(location).attr('href',url);
			
		  } 
	
	};
	
	
function potentialAgentNextPage3(){
		
		var reg_sch_visit_com=$("input[name='reg_sch_visit_com']:checked").val();
		var unSch_visit_com=$("input[name='unSch_visit_com']:checked").val();
		
		if (reg_sch_visit_com=="" ){
			$(".errorChk").text("Required Regular schedule visit");
		}else if (unSch_visit_com=="" ){
			$(".errorChk").text("Required Unscheduled visit");		
					
		}else{
			
			potentialAgentPage2="&reg_sch_visit_com="+reg_sch_visit_com+"&unSch_visit_com="+unSch_visit_com
			
			//alert(potentialAgentPage2);
			 	
			$(".errorChk").text("");
						 
			url="#potentialAgentPage3";
			
			$.mobile.navigate(url);
			//$(location).attr('href',url);
			
		  } 
	
	};
	
	
function potentialAgentNextPage4(){
		
		var tagging_problem=$("#tagging_problem").val();
		var pin_reset=$("#pin_reset").val();
		var technical_issue=$("#technical_issue").val();
		var other_issue=$("#other_issue").val();
		
		if (tagging_problem=="" ){
			$(".errorChk").text("Required Tagging Problem");
		}else if (pin_reset=="" ){
			$(".errorChk").text("Required PIN Reset");		
		}else if (technical_issue=="" ){
			$(".errorChk").text("Required Technical Issue");
		}else if (other_issue=="" ){
			$(".errorChk").text("Required Other Issue");
					
		}else{
			
			potentialAgentPage3="&tagging_problem="+tagging_problem+"&pin_reset="+pin_reset+"&technical_issue="+technical_issue+"&other_issue="+other_issue
			
			//alert(potentialAgentPage3);
			 	
			$(".errorChk").text("");
						 
			url="#potentialAgentPage4";
			
			$.mobile.navigate(url);
			//$(location).attr('href',url);
			
		  } 
	
	};	
	

function potentialAgentSubmit(){
		
		var ongoing_camp=$("#ongoing_camp").val();
		var trade_activity=$("#trade_activity").val();
		var new_service_launch=$("#new_service_launch").val();
		var other_market_info=$("#other_market_info").val();
		
		if (ongoing_camp=="" ){
			$(".errorChk").text("Required Ongoing Campaign");
		}else if (trade_activity=="" ){
			$(".errorChk").text("Required Trade Activity");		
		}else if (new_service_launch=="" ){
			$(".errorChk").text("Required New Service Launce");
		}else if (other_market_info=="" ){
			$(".errorChk").text("Required Other Market Information");
					
		}else{
			//alert(apipath+"potentialAgentSubmit?cid=GPFF2&mobile_no="+localStorage.mobile_no+"&syncCode="+localStorage.sync_code+'&ongoing_camp='+ongoing_camp+'&trade_activity='+trade_activity+'&new_service_launch='+new_service_launch+'&other_market_info='+other_market_info+'&potentialAgentPage1='+potentialAgentPage1+'&potentialAgentPage2='+potentialAgentPage2+'&potentialAgentPage3='+potentialAgentPage3);
			$.ajax({
					type: 'POST',
					url:apipath+"potentialAgentSubmit?cid=GPFF2&mobile_no="+localStorage.mobile_no+"&syncCode="+localStorage.sync_code+'&ongoing_camp='+ongoing_camp+'&trade_activity='+trade_activity+'&new_service_launch='+new_service_launch+'&other_market_info='+other_market_info+'&potentialAgentPage1='+potentialAgentPage1+'&potentialAgentPage2='+potentialAgentPage2+'&potentialAgentPage3='+potentialAgentPage3,
			
			
						success: function(result) {
						   if(result=='Success'){							
							//alert(result)
							
							$(".sucChk").text('Successfully Submitted');
							$(".errorChk").text("");
							$("#btn_agent_submit").show();						
						}else{
							$(".errorChk").text('Unauthorized Access');																	
							$("#btn_agent_submit").show();
							}
							
					   }//end result
			});//end ajax
	
	}
			
		  } 
			
			