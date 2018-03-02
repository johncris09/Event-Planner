//Event Planner

//_Global Variable
var LoginUserNow 			= localStorage.LoginUserNow;
var clickcountGuest 		= localStorage.getItem(LoginUserNow+"_clickcountGuest");
var selectedEventValueNow 	= localStorage.selectedEventValueNow;

//SideBar

function openNav(){
	document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
	document.getElementById("sidebar-wrapper").style.width = "250px";
	//document.getElementById("page-content-wrapper").style.marginLeft = "400";
}

function closeNav() {
	document.getElementById("sidebar-wrapper").style.width = "0";
	//document.getElementById("page-content-wrapper").style.marginLeft= "0";
	document.body.style.backgroundColor = "white";
}

function profile(){
	location.href='profile.html';
	
}
function changeprofile(){
	
	var lastname 			= document.getElementById('lastname');
	var firstname 			= document.getElementById('firstname');
	var username 			= document.getElementById('username');
	
	if(lastname.value && firstname.value && username.value){
		
		localStorage.setItem(LoginUserNow+'_Lastname',lastname.value);
		localStorage.setItem(LoginUserNow+'_Firstname',firstname.value);
		localStorage.setItem(LoginUserNow+'_Username',username.value);
		
		$('#recordsavemodal').fadeIn();
				
	}else{
		
		$('#recordnotsavemodal').fadeIn();
	
	}
	
}

function checkpassword(){
	var current_password 	= document.getElementById('current_password');
	var password_use 		= localStorage.getItem(LoginUserNow+'_Password');
	var message 			= document.getElementById('message');
	
	if(current_password.value == password_use){
		document.getElementById('newPassword').style.display	= "block";
		document.getElementById('currentpass').style.display	= "none";
		$('#new_password').focus();
		
	}else{
		
		$('#checkcurrentpasswordmodal').fadeIn();
	}
	
}

function changepassword(){
	var current_password 	= document.getElementById('current_password');
	var new_password 		= document.getElementById('new_password');
	var confirm_password 	= document.getElementById('confirm_password');
	
	if(new_password.value && current_password.value){
		if(!(current_password.value == new_password.value )){
			if(new_password.value == confirm_password.value){
				
				localStorage.setItem(LoginUserNow+'_Password', confirm_password.value);
				
				$('#passwordsuccessfullychange').fadeIn();
				
			}else{
				$('#passworddoestnotmatch').fadeIn();
				
			}
		}else{
			
			$('#passwordshouldnotbethesame').fadeIn();
		}
	}else{
		
		$('#recordnotsavemodal').fadeIn();
	
	}
}

function logout(){
	localStorage.removeItem('selectedEventValueNow');
	localStorage.removeItem('LoginUserNow');
	location.href='index.html';	
}


//Index

function signup(){
			
	var firstname 		= document.getElementById('firstname');
	var lastname 		= document.getElementById('lastname');
	var username 		= document.getElementById('uname');
	var password 		= document.getElementById('pword');
	var result		 	= false; 
	if(firstname.value && lastname.value && username.value && password.value){
		//Generate click count in creating an Account
		if (localStorage.clickcountAccount) {
			localStorage.clickcountAccount = Number(localStorage.clickcountAccount)+1;
		} else {
			localStorage.clickcountAccount = 1;
		}
		
		//save the user information in the Storage
		var NumberOfAccount =  localStorage.clickcountAccount;
		localStorage.setItem( NumberOfAccount + '_Firstname',firstname.value);
		localStorage.setItem( NumberOfAccount + '_Lastname' ,lastname.value );
		localStorage.setItem( NumberOfAccount + '_Username' ,username.value );
		localStorage.setItem( NumberOfAccount + '_Password' ,password.value );
		
		
		//clear all fields after saving
		firstname.value	= "" ; 
		lastname.value	= "" ;
		username.value	= "" ;
		password.value	= "" ;	
		
		$('#recordsavemodal').fadeIn();
		
	}else{
		$('#recordnotsavemodal').fadeIn();
		
	}
	
}


function login(){
	
	var username 			= document.getElementById('username');
	var password 			= document.getElementById('password');
	var clickcountAccount 	= localStorage.clickcountAccount;
	var msg 				= 0;
	var index 				= 0;
	
	if(localStorage.length > 0){
		
		if(username.value && password.value){
			
			//check if the username and password is exist in the storage
			for(var i = 0; i < localStorage.length; i++ ){
				//check if the username and password is correct and then stop looping
				if(username.value == localStorage.getItem( i +'_Username') && password.value == localStorage.getItem(i +'_Password') ){
					msg = 1;
					break;
				}else{
					msg = 0;
					continue;
				}
			}
			
			
			if(msg == 1) {
				for(var i = 1; i <= localStorage.clickcountAccount; i++){
					if(username.value == localStorage.getItem( i +'_Username') && password.value == localStorage.getItem(i +'_Password') ){
						index += i;
						break;
					}else{
						continue;
					}
				}
				
				//To identify if who is the user of the app
				localStorage.LoginUserNow = index;
				
				
				$('#LoginSuccess').fadeIn();
				
				
				//Clear Fields after Login
				username.value	= "";
				password.value	= "";
				
				//go to home.html
				location.href	=	"home.html";
				
				
			}else{
				$('#LoginError').fadeIn();
			}
		}else{
			$('#LoginError').fadeIn();
			
		}
	}else{
		
		//failed to login
		$('#LoginError').fadeIn();
	}
}


//Home Page

function select(){
	
	var selectedEvent 	= document.getElementById("display_all_event");
	var index 			= 0;
	var display_key 	= '';
	var result 			= '';
	var clickcountEvent = localStorage.getItem(LoginUserNow+"_clickcountEvent");

	for(var i = 1 ; i <= clickcountEvent; i++){
		if(localStorage.getItem(LoginUserNow +"_"+i+"_EventName")){
			result = true;
			break;
		}else{
			continue;
		}
	}
	
	if(result){
		for(var i = 0; i<localStorage.length; i++){
			var key = localStorage.key(i);
			var value= localStorage.getItem(key);
			if(selectedEvent.value==value){
				index = i;
			}
		}
		
		for(var i = 0; i<localStorage.length; i++){
			var key = localStorage.key(i);
			if(i == index){
				display_key = key;
				break;
			}
		}
		
		var countclickEventNumber = display_key.charAt(2);
		
		localStorage.setItem('selectedEventValueNow',LoginUserNow + '_' + countclickEventNumber + '_' + selectedEvent.value);
		
		
		progress();					//Display the Progess of the Event
		display_budget();			//Display the Budget of the Event
		getAge();					//Display the Guest Age of the Event
		getGender();				//Display the Guest Gender of the Event
	}
}
		
function progress(){

	var checkselectedEventValueNow 	= localStorage.getItem('selectedEventValueNow');
	var totalofAllTodoList			= localStorage.getItem(checkselectedEventValueNow+"_totalofAllTodoList");
	var totalofAllTodoListCompleted = localStorage.getItem(checkselectedEventValueNow+"_totalofAllTodoListCompleted");
	var display_progress 			= document.getElementById("display_progress");
	
	if(totalofAllTodoList){
		//get the percentage of all todo list of the Event
		percentage_progess 				= parseFloat(parseInt(totalofAllTodoListCompleted )/parseInt(totalofAllTodoList)).toFixed(2) * 100;
		display_progress.style.width	= percentage_progess+"%";
		display_progress.innerHTML 		= totalofAllTodoListCompleted + ' / ' + totalofAllTodoList;
	}else{
		display_progress.style.width	= "0%";
		display_progress.innerHTML 		= "0%";
	}
	
	
}
		
		
function display_budget(){
	
	
	var selectedEventValueNow 		= localStorage.selectedEventValueNow;
	var display_budget_total		= document.getElementById("display_budget_total");
	var display_budget_paid 		= document.getElementById("display_budget_paid");
	var display_budget_due_to_pay 	= document.getElementById("display_budget_due_to_pay");
	
	if( localStorage.getItem(selectedEventValueNow+"_BudgetListAllTotalAmount")){
		display_budget_total.innerHTML 		= localStorage.getItem(selectedEventValueNow+"_BudgetListAllTotalAmount");
		display_budget_paid.innerHTML		= localStorage.getItem(selectedEventValueNow+"_BudgetListAllTotalPaidAmount");
		display_budget_due_to_pay.innerHTML = localStorage.getItem(selectedEventValueNow+"_BudgetListAllTotalDueToPayAmount");
	}else{
		display_budget_total.innerHTML		= '0.00';
		display_budget_paid.innerHTML 		= '0.00';
		display_budget_due_to_pay.innerHTML = '0.00';
	}
	
	display_budget_total.style		= "text-decoration:underline; ";
	display_budget_paid.style		= "text-decoration:underline; ";
	display_budget_due_to_pay.style	= "text-decoration:underline; ";
}
		
function getAge(){
	var selectedEventValueNow 	= localStorage.selectedEventValueNow;
	var selectAge				= document.getElementById("selectAge");
	var total_gender 			= document.getElementById("total-gender");
	var total_male 				= document.getElementById("total-male");
	var total_female 			= document.getElementById("total-female");
	var total_invited 			= document.getElementById("total-invited");
	var total_rsvp 				= document.getElementById("total-rsvp");
	var total_attending 		= document.getElementById("total-attending");
	var total_decline 			= document.getElementById("total-decline");
	var total_male_invited 		= document.getElementById("total-male-invited");
	var total_male_rsvp 		= document.getElementById("total-male-rsvp");
	var total_male_atteding 	= document.getElementById("total-male-attending");
	var total_male_decline 		= document.getElementById("total-male-decline");
	var total_female_invited 	= document.getElementById("total-female-invited");
	var total_female_rsvp 		= document.getElementById("total-female-rsvp");
	var total_female_atteding 	= document.getElementById("total-female-attending");
	var total_female_decline 	= document.getElementById("total-female-decline");
	var GuestTotalGender 		= localStorage.getItem(selectedEventValueNow+"_GuestTotalGender");
	var totalGender		 		= 0;
	var totalFemaleGender	 	= 0;
	var totalMaleGender		 	= 0
	//all record
	var invited		 			= 0;
	var rsvp	 				= 0;
	var attending	 			= 0;
	var decline		 			= 0;
	//male record
	var male_invited	 		= 0;
	var male_rsvp 				= 0;
	var male_attending	 		= 0;
	var male_decline	 		= 0;
	//female record 
	var female_invited	 		= 0;
	var female_rsvp 			= 0;
	var female_attending	 	= 0;
	var female_decline 			= 0;
	
	if(localStorage.getItem(selectedEventValueNow+"_GuestTotalGender")){
			
			if(selectAge.value == "All" ){
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender")){
						totalGender += 1;
					}else{
						continue;
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
						totalMaleGender += 1;
						
					}else{
						continue;
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
						totalFemaleGender += 1;
					}else{
						continue;
					}
				}
				
				//Invited Guest
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited") == '1' ){
						invited += 1;
					}else{
						continue;
					}
				}
				
				//Rsvo Guest
				for(var i = 1; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp") == '1' ){
						rsvp += 1;
					}else{
						continue;
					}
				}
				
				//Attending Guest
				for(var i = 1; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '1' ){
						attending += 1;
					}else{
						continue;
					}
				}
				
				//Decline Guest
				for(var i = 1; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '0' ){
						decline += 1;
					}else{
						continue;
					}
				}
				
				for(var i = 1; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited") == '1' ){
							male_invited += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i = 1; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp") == '1' ){
							male_rsvp += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i = 1; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '1' ){
							male_attending += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i = 1; i<= parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '0' ){
							male_decline += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i = 1; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited") == '1' ){
							female_invited += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i = 1; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp") == '1' ){
							female_rsvp += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i = 1; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '1' ){
							female_attending += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i = 1; i<= parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '0' ){
							female_decline += 1;
						}else{
							continue;
						}
					}
				}
			}
			
			
			if(selectAge.value=="Children"){
			
				for(var i = 1; i<= parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender")){
							totalGender += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
							totalMaleGender += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
							totalFemaleGender  += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited") == '1' ){
							invited += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp") == '1' ){
							rsvp += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '1' ){
							attending += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '0' ){
							decline+= 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited") == '1' ){
								male_invited += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp") == '1' ){
								male_rsvp += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '1' ){
								male_attending += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '0' ){
								male_decline += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited") == '1' ){
								female_invited += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp") == '1' ){
								female_rsvp += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '1' ){
								female_attending += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '0' ){
								female_decline+= 1;
							}else{
								continue;
							}
						}
					}
				}
				
			}
			
			
			if(selectAge.value=="Teenagers"){
				
				for(var i = 1; i<= parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender")){
							totalGender += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
							totalMaleGender += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
							totalFemaleGender  += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited") == '1' ){
							invited += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp") == '1' ){
							rsvp += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '1' ){
							attending += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '0' ){
							decline+= 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited") == '1' ){
								male_invited += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp") == '1' ){
								male_rsvp += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '1' ){
								male_attending += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '0' ){
								male_decline+= 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited") == '1' ){
								female_invited += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp") == '1' ){
								female_rsvp += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '1' ){
								female_attending += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '0' ){
								female_decline+= 1;
							}else{
								continue;
							}
						}
					}
				}
				
			}
			
			
			if(selectAge.value=="Adults"){
				for(var i = 1; i<= parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender")){
							totalGender += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
							totalMaleGender += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
							totalFemaleGender  += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited") == '1' ){
							invited += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp") == '1' ){
							rsvp += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '1' ){
							attending += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '0' ){
							decline+= 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited") == '1' ){
								male_invited += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp") == '1' ){
								male_rsvp += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '1' ){
								male_attending += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '0' ){
								male_decline+= 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited") == '1' ){
								female_invited += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp") == '1' ){
								female_rsvp += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '1' ){
								female_attending += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '0' ){
								female_decline+= 1;
							}else{
								continue;
							}
						}
					}
				}
			}
			
			if(selectAge.value=="Seniors"){
				for(var i = 1; i<= parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender")){
							totalGender += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
							totalMaleGender += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
							totalFemaleGender  += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited") == '1' ){
							invited += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp") == '1' ){
							rsvp += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '1' ){
							attending += 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '0' ){
							decline+= 1;
						}else{
							continue;
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited") == '1' ){
								male_invited += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp") == '1' ){
								male_rsvp += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '1' ){
								male_attending += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '0' ){
								male_decline+= 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited") == '1' ){
								female_invited += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp") == '1' ){
								female_rsvp += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '1' ){
								female_attending += 1;
							}else{
								continue;
							}
						}
					}
				}
				
				for(var i =1 ; i<=parseInt(clickcountGuest); i++){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
							if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == '0' ){
								female_decline+= 1;
							}else{
								continue;
							}
						}
					}
				}
				
				
			}
		total_gender.innerHTML 			= totalGender;
		total_male.innerHTML 			= totalMaleGender;
		total_female.innerHTML 			= totalFemaleGender;
		
		total_invited.innerHTML 		= invited;
		total_rsvp.innerHTML			= rsvp;
		total_attending.innerHTML 		= attending;
		total_decline.innerHTML 		= decline;
		total_male_invited.innerHTML 	= male_invited;
		total_male_rsvp.innerHTML 		= male_rsvp;
		total_male_atteding.innerHTML 	= male_attending;
		total_male_decline.innerHTML 	= male_decline;
		
		total_female_invited.innerHTML	= female_invited;
		total_female_rsvp.innerHTML 	= female_rsvp;
		total_female_atteding.innerHTML = female_attending;
		total_female_decline.innerHTML 	= female_decline;
		
			
	
	}else{
		total_gender.innerHTML 			= totalGender;
		total_male.innerHTML 			= totalMaleGender;
		total_female.innerHTML 			= totalFemaleGender;
		
		total_invited.innerHTML 		= invited;
		total_rsvp.innerHTML			= rsvp;
		total_attending.innerHTML 		= attending;
		total_decline.innerHTML 		= decline;
		total_male_invited.innerHTML 	= male_invited;
		total_male_rsvp.innerHTML 		= male_rsvp;
		total_male_atteding.innerHTML 	= male_attending;
		total_male_decline.innerHTML 	= male_decline;
		
		total_female_invited.innerHTML 	= female_invited;
		total_female_rsvp.innerHTML 	= female_rsvp;
		total_female_atteding.innerHTML = female_attending;
		total_female_decline.innerHTML 	= female_decline;
	}
	
	
}

function getGender(){
	var selectedEventValueNow 		= localStorage.selectedEventValueNow;
	var select_gender		 		= document.getElementById("select_gender");
	var total_gender 				= document.getElementById("total_gender");
	var total_invited				= document.getElementById("total_invited");
	var total_rsvp 					= document.getElementById("total_rsvp");
	var total_attednding			= document.getElementById("total_attednding");
	var total_decline 				= document.getElementById("total_decline");
	var total_children 				= document.getElementById("total_children");
	var total_children_invited 		= document.getElementById("total_children_invited");
	var total_children_rsvp 		= document.getElementById("total_children_rsvp");
	var total_children_attending 	= document.getElementById("total_children_attending");
	var total_children_decline 		= document.getElementById("total_children_decline");
	var total_teenagers 			= document.getElementById("total_teenagers");
	var total_teenagers_invited 	= document.getElementById("total_teenagers_invited");
	var total_teenagers_rsvp 		= document.getElementById("total_teenagers_rsvp");
	var total_teenagers_attending 	= document.getElementById("total_teenagers_attending");
	var total_teenagers_decline 	= document.getElementById("total_teenagers_decline");
	var total_adults 				= document.getElementById("total_adults");
	var total_adults_invited 		= document.getElementById("total_adults_invited");
	var total_adults_rsvp 			= document.getElementById("total_adults_rsvp");
	var total_adults_attending 		= document.getElementById("total_adults_attending");
	var total_adults_decline 		= document.getElementById("total_adults_decline");
	var total_seniors 				= document.getElementById("total_seniors");
	var total_seniors_invited 		= document.getElementById("total_seniors_invited");
	var total_seniors_rsvp 			= document.getElementById("total_seniors_rsvp");
	var total_seniors_attending 	= document.getElementById("total_seniors_attending");
	var total_seniors_decline 		= document.getElementById("total_seniors_decline");
	var totalGender					= 0;
	var totalGenderInvited			= 0;
	var totalGenderRsvp				= 0;
	var totalGenderAttending		= 0;
	var totalGenderDecline			= 0;
	var totalGenderChildren 		= 0;
	var totalGenderChildrenInvited 	= 0;
	var totalGenderChildrenRsvp 	= 0;
	var totalGenderChildrenAttending= 0;
	var totalGenderChildrenDecline 	= 0;
	var totalGenderTeenagers 		= 0;
	var totalGenderTeenagersInvited = 0;
	var totalGenderTeenagersRsvp 	= 0;
	var totalGenderTeenagersAttending= 0;
	var totalGenderTeenagersDecline = 0;
	var totalGenderAdults 			= 0;
	var totalGenderAdultsInvited 	= 0;
	var totalGenderAdultsRsvp 		= 0;
	var totalGenderAdultsAttending 	= 0;
	var totalGenderAdultsDecline 	= 0;
	var totalGenderSeniors			= 0;
	var totalGenderSeniorsInvited 	= 0;
	var totalGenderSeniorsRsvp 		= 0;
	var totalGenderSeniorsAttending = 0;
	var totalGenderSeniorsDecline 	= 0;
	var totalMaleChildren			= 0;
	
	if(localStorage.getItem(selectedEventValueNow+"_GuestTotalGender")){
	
		if(select_gender.value == "All"){
			
			for(var i =1 ; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge")){
					totalGender += 1;
				}else{
					continue;
				}
			}
			
			for(var i =1 ; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited") == 1){
					totalGenderInvited += 1;
				}else{
					continue;
				}
			}
			
			for(var i =1 ; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp") == 1){
					totalGenderRsvp += 1;
				}else{
					continue;
				}
			}
			
			for(var i =1 ; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == 1){
					totalGenderAttending += 1;
				}else{
					continue;
				}
			}
			
			for(var i =1 ; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == 0){
					totalGenderDecline += 1;
				}else{
					continue;
				}
			}
			
			
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
					totalGenderChildren += 1;
				}else{
					continue;
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited") == 1){
						totalGenderChildrenInvited += 1;
					}else{
						continue;
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp") == 1){
						totalGenderChildrenRsvp+= 1;
					}else{
						continue;
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == 1){
						totalGenderChildrenAttending+= 1;
					}else{
						continue;
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == 0){
						totalGenderChildrenDecline+= 1;
					}else{
						continue;
					}
				}
			}
			
			//
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
					totalGenderTeenagers+= 1;
				}else{
					continue;
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited") == 1){
						totalGenderTeenagersInvited+= 1;
					}else{
						continue;
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp") == 1){
						totalGenderTeenagersRsvp+= 1;
					}else{
						continue;
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == 1){
						totalGenderTeenagersAttending+= 1;
					}else{
						continue;
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == 0){
						totalGenderTeenagersDecline+= 1;
					}else{
						continue;
					}
				}
			}
			
			//
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
					totalGenderAdults+= 1;
				}else{
					continue;
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited") == 1){
						totalGenderAdultsInvited+= 1;
					}else{
						continue;
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp") == 1){
						totalGenderAdultsRsvp+= 1;
					}else{
						continue;
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == 1){
						totalGenderAdultsAttending+= 1;
					}else{
						continue;
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == 0){
						totalGenderAdultsDecline+= 1;
					}else{
						continue;
					}
				}
			}
			
			//
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
					totalGenderSeniors+= 1;
				}else{
					continue;
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited") == 1){
						totalGenderSeniorsInvited+= 1;
					}else{
						continue;
					}
				}
					
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp") == 1){
						totalGenderSeniorsRsvp+= 1;
					}else{
						continue;
					}
				}
					
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == 1){
						totalGenderSeniorsAttending+= 1;
					}else{
						continue;
					}
				}
					
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending") == 0){
						totalGenderSeniorsDecline+= 1;
					}else{
						continue;
					}
				}
					
			}
		}
		
		
		if(select_gender.value == "Male"){
		
			for(var i =1 ; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					totalGender+=1;
				}else{
					continue;
				}
					
			
			}
			
			for(var i =1 ; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited")==1){
						totalGenderInvited+=1;
					}else{
						continue;
					}
				}
					
			
			}
			
			for(var i =1 ; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp")==1){
						totalGenderRsvp+=1;
					}else{
						continue;
					}
				}
					
			
			}
			
			
			for(var i =1 ; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending")==1){
						totalGenderAttending+=1;
					}else{
						continue;
					}
				}
					
			
			}
			
			for(var i =1 ; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending")==0){
						totalGenderDecline+=1;
					}else{
						continue;
					}
				}
					
			
			}
			
			//
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						totalGenderChildren+= 1;
					}else{
						continue;
					}
					
				}
				
					
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited")==1){
							totalGenderChildrenInvited+= 1;
						}else{
							continue;
						}
					}
					
				}
				
					
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp")==1){
							totalGenderChildrenRsvp+= 1;
						}else{
							continue;
						}
					}
					
				}
				
					
			}
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending")==1){
							totalGenderChildrenAttending+= 1;
						}else{
							continue;
						}
					}
					
				}
				
					
			}
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending")==0){
							totalGenderChildrenDecline+= 1;
						}else{
							continue;
						}
					}
				}
			}
			
			
			//
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						totalGenderTeenagers+= 1;
					}else{
						continue;
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited")==1){
							totalGenderTeenagersInvited+= 1;
						}else{
							continue;
						}
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp")==1){
							totalGenderTeenagersRsvp+= 1;
						}else{
							continue;
						}
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending")==1){
							totalGenderTeenagersAttending+= 1;
						}else{
							continue;
						}
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending")==0){
							totalGenderTeenagersDecline	+= 1;
						}else{
							continue;
						}
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						totalGenderAdults+= 1;
					}else{
						continue;
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited")==1){
							totalGenderAdultsInvited+= 1;
						}else{
							continue;
						}
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp")==1){
							totalGenderAdultsRsvp+= 1;
						}else{
							continue;
						}
					}
				}
			}
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending")==1){
						
							totalGenderAdultsAttending+= 1;
						}else{
							continue;
						}
					}
				}
			}
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending")==0){
							totalGenderAdultsDecline	+= 1;
						}else{
							continue;
						}
					}
				}
			}
			
			//
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						totalGenderSeniors+= 1;
					}else{
						continue;
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited")==1){
							totalGenderSeniorsInvited+= 1;
						}else{
							continue;
						}
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp")==1){
							totalGenderSeniorsRsvp+= 1;
						}else{
							continue;
						}
					}
				}
			}
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending")==1){
							totalGenderSeniorsAttending+= 1;
						}else{
							continue;
						}
					}
				}
			}
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Male"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending")==0){
							totalGenderSeniorsDecline	+= 1;
						}else{
							continue;
						}
					}
					
				}
				
					
			}
			
		}if(select_gender.value == "Female"){
		
			for(var i =1 ; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					totalGender+=1;
				}else{
					continue;
				}
			}
			
			for(var i =1 ; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited")==1){
						totalGenderInvited+=1;
					}else{
						continue;
					}
				}
			}
			
			for(var i =1 ; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp")==1){
						totalGenderRsvp+=1;
					}else{
						continue;
					}
				}
			}
			
			
			for(var i =1 ; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending")==1){
						totalGenderAttending+=1;
					}else{
						continue;
					}
				}
					
			
			}
			
			for(var i =1 ; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending")==0){
						totalGenderDecline+=1;
					}else{
						continue;
					}
				}
			}
			
			//
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						totalGenderChildren+= 1;
					}else{
						continue;
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited")==1){
							totalGenderChildrenInvited+= 1;
						}else{
							continue;
						}
					}
					
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp")==1){
							totalGenderChildrenRsvp+= 1;
						}else{
							continue;
						}
					}
					
				}
				
					
			}
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending")==1){
							totalGenderChildrenAttending+= 1;
						}else{
							continue;
						}
					}
				}
			}
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Children"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending")==0){
							totalGenderChildrenDecline+= 1;
						}else{
							continue;
						}
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						totalGenderTeenagers+= 1;
					}else{
						continue;
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited")==1){
							totalGenderTeenagersInvited+= 1;
						}else{
							continue;
						}
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp")==1){
							totalGenderTeenagersRsvp+= 1;
						}else{
							continue;
						}
					}
				}
			}
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending")==1){
							totalGenderTeenagersAttending+= 1;
						}else{
							continue;
						}
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Teenager"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending")==0){
							totalGenderTeenagersDecline	+= 1;
						}else{
							continue;
						}
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						totalGenderAdults+= 1;
					}else{
						continue;
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited")==1){
							totalGenderAdultsInvited+= 1;
						}else{
							continue;
						}
					}
				}
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp")==1){
							totalGenderAdultsRsvp+= 1;
						}else{
							continue;
						}
					}
					
				}
				
					
			}
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending")==1){
							totalGenderAdultsAttending+= 1;
						}else{
							continue;
						}
					}
					
				}
				
					
			}
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Adult"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending")==0){
							totalGenderAdultsDecline	+= 1;
						}else{
							continue;
						}
					}
					
				}
				
					
			}
			
			//
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						totalGenderSeniors+= 1;
					}else{
						continue;
					}
					
				}
				
					
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestInvited")==1){
							totalGenderSeniorsInvited+= 1;
						}else{
							continue;
						}
					}
					
				}
				
					
			}
			
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestRsvp")==1){
							totalGenderSeniorsRsvp+= 1;
						}else{
							continue;
						}
					}
					
				}
				
					
			}
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending")==1){
							totalGenderSeniorsAttending+= 1;
						}else{
							continue;
						}
					}
					
				}
				
					
			}
			for(var i = 1; i<=parseInt(clickcountGuest); i++){
				if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestGender") == "Female"){
					if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAge") == "Senior"){
						if(localStorage.getItem(selectedEventValueNow+"_"+i+"_GuestAttending")==0){
							totalGenderSeniorsDecline	+= 1;
						}else{
							continue;
						}
					}
					
				}
				
					
			}
			
		}
		
		total_gender.innerHTML 				= totalGender;
		total_invited.innerHTML 			= totalGenderInvited;
		total_rsvp.innerHTML  				= totalGenderRsvp;
		total_attednding.innerHTML  		= totalGenderAttending;
		total_decline.innerHTML  			= totalGenderDecline;
		
		total_children.innerHTML  			= totalGenderChildren;
		total_children_invited.innerHTML  	= totalGenderChildrenInvited;
		total_children_rsvp.innerHTML  		= totalGenderChildrenRsvp;
		total_children_attending.innerHTML  = totalGenderChildrenAttending;
		total_children_decline.innerHTML  	= totalGenderChildrenDecline;
		
		total_teenagers.innerHTML  			= totalGenderTeenagers;
		total_teenagers_invited.innerHTML  	= totalGenderTeenagersInvited;
		total_teenagers_rsvp.innerHTML 		= totalGenderTeenagersRsvp;
		total_teenagers_attending.innerHTML = totalGenderTeenagersAttending;
		total_teenagers_decline.innerHTML  	= totalGenderTeenagersDecline;
		
		total_adults.innerHTML  			= totalGenderAdults;
		total_adults_invited.innerHTML  	= totalGenderAdultsInvited;
		total_adults_rsvp.innerHTML  		= totalGenderAdultsRsvp;
		total_adults_attending.innerHTML  	= totalGenderAdultsAttending;
		total_adults_decline.innerHTML  	= totalGenderAdultsDecline;
		
		total_seniors.innerHTML  			= totalGenderSeniors;
		total_seniors_invited.innerHTML 	= totalGenderSeniorsInvited;
		total_seniors_rsvp.innerHTML  		= totalGenderSeniorsRsvp;
		total_seniors_attending.innerHTML  	= totalGenderSeniorsAttending;
		total_seniors_decline.innerHTML  	= totalGenderSeniorsDecline;

	
	}else{
	
		total_gender.innerHTML 				= totalGender;
		total_invited.innerHTML 			= totalGenderInvited;
		total_rsvp.innerHTML  				= totalGenderRsvp;
		total_attednding.innerHTML  		= totalGenderAttending;
		total_decline.innerHTML  			= totalGenderDecline;
		
		total_children.innerHTML 	 		= totalGenderChildren;
		total_children_invited.innerHTML  	= totalGenderChildrenInvited;
		total_children_rsvp.innerHTML  		= totalGenderChildrenRsvp;
		total_children_attending.innerHTML  = totalGenderChildrenAttending;
		total_children_decline.innerHTML  	= totalGenderChildrenDecline;
		
		total_teenagers.innerHTML  			= totalGenderTeenagers;
		total_teenagers_invited.innerHTML  	= totalGenderTeenagersInvited;
		total_teenagers_rsvp.innerHTML  	= totalGenderTeenagersRsvp;
		total_teenagers_attending.innerHTML = totalGenderTeenagersAttending;
		total_teenagers_decline.innerHTML  	= totalGenderTeenagersDecline;
		
		total_adults.innerHTML  			= totalGenderAdults;
		total_adults_invited.innerHTML 		= totalGenderAdultsInvited;
		total_adults_rsvp.innerHTML  		= totalGenderAdultsRsvp;
		total_adults_attending.innerHTML  	= totalGenderAdultsAttending;
		total_adults_decline.innerHTML  	= totalGenderAdultsDecline;
		
		total_seniors.innerHTML  			= totalGenderSeniors;
		total_seniors_invited.innerHTML 	= totalGenderSeniorsInvited;
		total_seniors_rsvp.innerHTML  		= totalGenderSeniorsRsvp;
		total_seniors_attending.innerHTML  	= totalGenderSeniorsAttending;
		total_seniors_decline.innerHTML  	= totalGenderSeniorsDecline;
	}	
}

function refresh(){
	select();
	
}

//Event Page
function addEvent(){
	location.href="add_event.html";
}


function deleteguestlistinselectedEvent(deleteid){
	
	var clickcountGuest 		= localStorage.getItem(LoginUserNow+'_clickcountGuest');
	var event_name 				= localStorage.getItem(deleteid+'EventName');
	var idtodeleteguest 		= deleteid + event_name + '_';
	
	var GuestListKeys 			= [
		'GuestName',
		'GuestGender',
		'GuestAge',
		'GuestEmail',
		'GuestInvited',
		'GuestRsvp',
		'GuestAttending',
		'GuestNote'
		
	]
	var GuestListKeysforRecords	= [
		'GuestTotalFemale',
		'GuestTotalGender',
		'GuestTotalMale'
	]
	
	
	//deleting list of guest in selected event
	for(var i = 1; i <= clickcountGuest; i++ ){
		for( var x = 0; x<GuestListKeys.length; x++ ){
			localStorage.removeItem(idtodeleteguest+i+'_'+GuestListKeys[x]);
		}
	}
	
	//deleting record list of guest in selected event
	for(var i = 0; i < GuestListKeysforRecords.length ; i++){
		localStorage.removeItem(idtodeleteguest+GuestListKeysforRecords[i]);
	}
	
}

function deletetodolistinselectedEvent(deleteid){
	
	var clickcountTodoList 		= localStorage.getItem(LoginUserNow+'_clickcountTodoList');
	var event_name 				= localStorage.getItem(deleteid+'EventName');
	var idtodeletegtodolist 	= deleteid + event_name + '_';
	
	var TodoListKeys 			= [
		'TodoListName',
		'TodoListCompleted',
		'TodoListNote'
	]
	
	var TodoListKeysforRecords = [
		'totalofAllTodoListCompleted',
		'totalofAllTodoList',
		'totalofAllTodoListNotCompleted'
	]
	
	//deleting list of todo list in selected event
	for(var i = 1; i <= clickcountTodoList; i++ ){
		for( var x = 0; x<TodoListKeys.length; x++ ){
			localStorage.removeItem(idtodeletegtodolist+i+'_'+TodoListKeys[x]);
		}
	}
	
	//deleting record list of todo list in selected event
	for(var i = 0; i < TodoListKeysforRecords.length ; i++){
		localStorage.removeItem(idtodeletegtodolist+TodoListKeysforRecords[i]);
	}
	
	
}

function deleteShoppinglistinselectedEvent(deleteid){
	
	var clickcountShoppingList 		= localStorage.getItem(LoginUserNow+'_clickcountShoppingList');
	var event_name 					= localStorage.getItem(deleteid+'EventName');
	var idtodeletegshoppinglist 	= deleteid + event_name + '_';
	
	var ShoppingListKeys 			= [
		'ShoppingListName',
		'ShoppingListPurchased',
		'ShoppingListPrice','ShoppingListTotalQuantity','ShoppingListNote','ShoppingListTotalPrice'
	]
	
	var ShoppingListKeysforRecords 	= [
		'ShoppingListAllTotalAmount',
		'ShoppingListRemainingAmount',
		'ShoppingListSpentAmount'
	] 
	
	//deleting list of shopping list in selected event
	for(var i = 1; i <= clickcountShoppingList; i++ ){
		for( var x = 0; x<ShoppingListKeys.length; x++ ){
			localStorage.removeItem(idtodeletegshoppinglist+i+'_'+ShoppingListKeys[x]);
		}
	}
	
	//deleting record list of shopping list in selected event
	for(var i = 0; i < ShoppingListKeysforRecords.length ; i++){
		localStorage.removeItem(idtodeletegshoppinglist+ShoppingListKeysforRecords[i]);
	}
	
	
}

function deleteBudgetlistinselectedEvent(deleteid){
	
	var clickcountBudget 		= localStorage.getItem(LoginUserNow+'_clickcountBudget');
	var event_name 				= localStorage.getItem(deleteid+'EventName');
	var idtodeletegbudgetlist 	= deleteid + event_name + '_';
	
	var BudgetListKeys 			= [
		'BudgetName',
		'BudgetAmount',
		'BudgetPaidAmount',
		'BudgetNote',
		'BudgetDifferenceAmount'
	]
	
	var BudgetListKeysforRecords = [
		'BudgetListAllTotalAmount',
		'BudgetListAllTotalPaidAmount',
		'BudgetListAllTotalDueToPayAmount'
	] 
	
	//deleting list of shopping list in selected event
	for(var i = 1; i <= clickcountBudget; i++ ){
		for( var x = 0; x<BudgetListKeys.length; x++ ){
			localStorage.removeItem(idtodeletegbudgetlist+i+'_'+BudgetListKeys[x]);
		}
	}
	
	//deleting record list of shopping list in selected event
	for(var i = 0; i < BudgetListKeysforRecords.length ; i++){
		localStorage.removeItem(idtodeletegbudgetlist+BudgetListKeysforRecords[i]);
	}
	
	
}

function deleteEvent(){
	var LoginUserNow 		= localStorage.LoginUserNow;
	var deleteEventtKeyNow 	= localStorage.getItem(LoginUserNow+'_deleteEventtKeyNow');
	var EventListKeys 		= [
		'EventName',
		'EventLocation',
		'EventDate',
		'EventNote'
	]
	
	
	deleteguestlistinselectedEvent(deleteEventtKeyNow);							//a function that delete list of the guest in selected event
	deletetodolistinselectedEvent(deleteEventtKeyNow);							//a function that delete list of the to do list in selected event
	deleteShoppinglistinselectedEvent(deleteEventtKeyNow);						//a function that delete list of the shopping in selected event
	deleteBudgetlistinselectedEvent(deleteEventtKeyNow);						//a function that delete list of the budget in selected event
	
	
	//deleting selected Event
	for(var i = 0; i < EventListKeys.length; i++){
		localStorage.removeItem(deleteEventtKeyNow+EventListKeys[i]);
	}
}

//Add Event

function saveEvent(){
	
	var event_name 		= document.getElementById('event-name');
	var event_location 	= document.getElementById('event-location');
	var event_date 		= document.getElementById('event-date');
	var event_note 		= document.getElementById('event-note');
	
	if(event_name.value && event_location.value && event_date.value){
		
		//Generate click count on adding Event
		if (localStorage.LoginUserNow + 'clickcountEvent') {
			localStorage.setItem(LoginUserNow+'_clickcountEvent',Number(localStorage.getItem(LoginUserNow+'_clickcountEvent'))+1);
			
		} else {
			
			localStorage.setItem(LoginUserNow+'_clickcountEvent',1);
		}
		
		localStorage.setItem(LoginUserNow + '_' + localStorage.getItem(LoginUserNow + '_clickcountEvent') + '_EventName', event_name.value);
		localStorage.setItem(LoginUserNow + '_' + localStorage.getItem(LoginUserNow + '_clickcountEvent') + '_EventLocation', event_location.value);
		localStorage.setItem(LoginUserNow + '_' + localStorage.getItem(LoginUserNow + '_clickcountEvent') + '_EventDate', event_date.value);
		localStorage.setItem(LoginUserNow + '_' + localStorage.getItem(LoginUserNow + '_clickcountEvent') + '_EventNote', event_note.value);
		
		event_name.value 		= '';
		event_location.value	= ''; 
		event_date.value		= ''; 
		event_note.value		= ''; 
		
		
		$('#recordsavemodal').fadeIn();
		
	}else{
		
		$('#recordnotsavemodal').fadeIn();
		
	}
	
}

function getEvent(){
	
	var editEventKeyNow		= localStorage.getItem(LoginUserNow + '_editEventKeyNow');
	var editKey				= ['EventName','EventLocation','EventDate','EventNote'];
	
	//getting the ID of input fields
	var EditEventName 		= document.getElementById('event-name');
	var EditEventLocation 	= document.getElementById('event-location');
	var EditEventDate	 	= document.getElementById('event-date');
	var EditEventNote 		= document.getElementById('event-note');
	
	//passing the value to input fields
	EditEventName.value 	= localStorage.getItem(editEventKeyNow + editKey[0]);
	EditEventLocation.value = localStorage.getItem(editEventKeyNow + editKey[1]);
	EditEventDate.value		= localStorage.getItem(editEventKeyNow + editKey[2]);
	EditEventNote.value		= localStorage.getItem(editEventKeyNow + editKey[3]);
}

function updateEvent(){
	
	var editEventKeyNow		= localStorage.getItem(LoginUserNow + '_editEventKeyNow');
	var editKey				= ['EventName','EventLocation','EventDate','EventNote'];
	var NewEventName 		= document.getElementById('event-name');
	var NewEventLocation 	= document.getElementById('event-location');
	var NewEventDate 		= document.getElementById('event-date');
	var NewEventNote 		= document.getElementById('event-note');
	
	if(NewEventName.value && NewEventLocation.value && NewEventDate.value){
		//updating the value
		localStorage.setItem(editEventKeyNow + editKey[0], NewEventName.value);
		localStorage.setItem(editEventKeyNow + editKey[1], NewEventLocation.value);
		localStorage.setItem(editEventKeyNow + editKey[2], NewEventDate.value);
		localStorage.setItem(editEventKeyNow + editKey[3], NewEventNote.value);
	
		//message after update
		$('#recordsavemodal').fadeIn();
		
	
	}else{
		
		$('#recordnotsavemodal').fadeIn();
		
	}
	
}

//Guest Page
function checkselectedEventfirst(){
	if(!(localStorage.getItem(LoginUserNow+'_clickcountEvent') == undefined)){	
		for(var i = 0; i<=parseInt(localStorage.getItem(LoginUserNow+'_clickcountEvent')); i++){
			if(localStorage.getItem(LoginUserNow+'_'+i+'_EventName') && localStorage.selectedEventValueNow){
				return true;
			}
			
		}
	}
	return false
}
function addGuest(){
	if(checkselectedEventfirst()){
		location.href='add_guest.html'
	}else{
		$('#addGuestmodal').fadeIn();
	}
}

function deleteGuest(){
	
	var deleteGuest 	= localStorage.getItem(LoginUserNow+"_deleteGuestKeyNow");
	var deleteGuestKeys = [
		'GuestName',
		'GuestGender',
		'GuestAge',
		'GuestEmail',
		'GuestInvited',
		'GuestRsvp',
		'GuestAttending',
		'GuestNote'
	];
	
	for(var i = 0; i < deleteGuestKeys.length; i++){
		localStorage.removeItem(deleteGuest+deleteGuestKeys[i]);
	}
	
}

//Add Guest

function displayRSVP(){
	
	var guest_invited 	= document.getElementById('guest-invited');
	var guest_rsvp 		= document.getElementById('guest-rsvp');
	var guest_attending = document.getElementById('guest-attending');
	var rsvp 			= document.getElementById('rsvp');
	var attending 		= document.getElementById('attending');
	if(guest_invited.checked){
	
		rsvp.style.display	= "block";	
	
	}else{
		
		rsvp.style.display		= "none";
		guest_rsvp.checked 		= false;
		attending.style.display	= "none";
		guest_attending.checked	= false;
	
	}
	
}

function displayAttending(){
	
	var guest_rsvp 		= document.getElementById('guest-rsvp');
	var guest_attending = document.getElementById('guest-attending');
	var rsvp 			= document.getElementById('rsvp');
	var attending 		= document.getElementById('attending');
	
	if(guest_rsvp.checked){
	
		attending.style.display	= "block";
		
	}else{
		
		attending.style.display	= "none";
		guest_attending.checked	= false;
		
	}
	
}


function saveGuest(){
	
	
	var guest_name 				= document.getElementById('guest-name');
	var guest_gender 			= document.getElementById('guest-gender');
	var guest_age				= document.getElementById('guest-age');
	var guest_email				= document.getElementById('guest-email');
	var guest_invited 			= document.getElementById('guest-invited');
	var guest_rsvp				= document.getElementById('guest-rsvp');
	var guest_attending			= document.getElementById('guest-attending');
	var guest_note				= document.getElementById('guest-note');
	
	if( guest_name.value){
		
		//Generate click count on adding Guest
		if (localStorage.LoginUserNow + '_clickcountGuest') {
			
			localStorage.setItem(LoginUserNow+'_clickcountGuest',Number(localStorage.getItem(LoginUserNow+'_clickcountGuest'))+1);
			
		} else {
			
			localStorage.setItem(LoginUserNow+'_clickcountGuest',1);
		
		}
		
		var clickcountGuest = localStorage.getItem(LoginUserNow + '_clickcountGuest');
		
		localStorage.setItem( selectedEventValueNow + '_' + clickcountGuest + '_GuestName', guest_name.value);
		localStorage.setItem( selectedEventValueNow + '_' + clickcountGuest + '_GuestGender', guest_gender.value);
		localStorage.setItem( selectedEventValueNow + '_' + clickcountGuest + '_GuestAge', guest_age.value);
		localStorage.setItem( selectedEventValueNow + '_' + clickcountGuest + '_GuestEmail', guest_email.value);
		
		if(guest_invited.checked){
			localStorage.setItem( selectedEventValueNow + '_' + clickcountGuest + '_GuestInvited',1);
		}else{
			localStorage.setItem( selectedEventValueNow + '_' + clickcountGuest + '_GuestInvited',0);
		}
		
		if(guest_rsvp.checked){
			localStorage.setItem( selectedEventValueNow + '_' + clickcountGuest + '_GuestRsvp',1);
		}else{
			localStorage.setItem( selectedEventValueNow + '_' + clickcountGuest + '_GuestRsvp',0);
		}
		
		if(guest_attending.checked){
			localStorage.setItem( selectedEventValueNow + '_' + clickcountGuest + '_GuestAttending',1);
		}else{
			localStorage.setItem( selectedEventValueNow + '_' + clickcountGuest + '_GuestAttending',0);
		}
		
		localStorage.setItem( selectedEventValueNow + '_' + clickcountGuest + '_GuestNote',guest_note.value);
		
		guest_name.value ='';
		guest_email.value ='';	
		guest_invited.checked = false;	 
		guest_rsvp.checked = false;	
		guest_attending.checked = false;
		document.getElementById('rsvp').style.display='none';
		document.getElementById('attending').style.display='none';;
		guest_note.value ='';					
		
		$('#recordsavemodal').fadeIn();
		
	}else{
		
		$('#recordnotsavemodal').fadeIn();
		
	}
}

//Edit Guest

function getGuest(){

	
	var selectedEditGuestKeyNow = localStorage.getItem(LoginUserNow+'_editGuestKeyNow');
	var editKey					= [
		'GuestName',
		'GuestGender',
		'GuestAge',
		'GuestEmail',
		'GuestInvited',
		'GuestRsvp',
		'GuestAttending',
		'GuestNote'
	];
	
	//Getting the ID of input fields
	var edit_guest_name 		= document.getElementById('guest-name');
	var edit_guest_gender 		= document.getElementById('guest-gender');
	var edit_guest_age			= document.getElementById('guest-age');
	var edit_guest_email		= document.getElementById('guest-email');
	var edit_guest_invited 		= document.getElementById('guest-invited');
	var edit_guest_rsvp			= document.getElementById('guest-rsvp');
	var edit_guest_attending	= document.getElementById('guest-attending');
	var edit_guest_note			= document.getElementById('guest-note');
	var rsvp 					= document.getElementById('rsvp');
	var attending 				= document.getElementById('attending');
	
	edit_guest_name.value 		= localStorage.getItem(selectedEditGuestKeyNow+editKey[0]);
	edit_guest_gender.value		= localStorage.getItem(selectedEditGuestKeyNow+editKey[1]);
	edit_guest_age.value 		= localStorage.getItem(selectedEditGuestKeyNow+editKey[2]);
	edit_guest_email.value 		= localStorage.getItem(selectedEditGuestKeyNow+editKey[3]);
	
	if(parseInt(localStorage.getItem(selectedEditGuestKeyNow+editKey[4]))==1){
		if(parseInt(localStorage.getItem(selectedEditGuestKeyNow+editKey[5]))==1){
			if(parseInt(localStorage.getItem(selectedEditGuestKeyNow+editKey[6]))==1){
				rsvp.style.display				= "block";
				attending.style.display			= "block";
				edit_guest_invited.checked		= true;
				edit_guest_rsvp.checked			= true;
				edit_guest_attending.checked	= true;
			}else{
				rsvp.style.display				= "block";
				attending.style.display			= "block";
				edit_guest_invited.checked		= true;
				edit_guest_rsvp.checked 		= true;
				edit_guest_attending.checked	= false;
			}
		}else{
			rsvp.style.display				= "block";
			attending.style.display			= "none";
			edit_guest_invited.checked		= true;
			edit_guest_rsvp.checked			= false;
			edit_guest_attending.checked	= false;
		}
	}else{
		rsvp.style.display				= "none";
		attending.style.display			= "none";
		edit_guest_invited.checked		= false;
		edit_guest_rsvp.checked			= false;
		edit_guest_attending.checked	= false;
	}
	
	edit_guest_note.value = localStorage.getItem(selectedEditGuestKeyNow+editKey[7]);
}

function displayRSVP(){
	
	var guest_invited 	= document.getElementById('guest-invited');
	var guest_rsvp 		= document.getElementById('guest-rsvp');
	var guest_attending = document.getElementById('guest-attending');
	var rsvp 			= document.getElementById('rsvp');
	var attending 		= document.getElementById('attending');
	
	if(guest_invited.checked){
		rsvp.style.display="block";	
	}else{
		rsvp.style.display="none";
		guest_rsvp.checked = false;
		attending.style.display="none";
		guest_attending.checked=false;
	}
}
function displayAttending(){
	var guest_rsvp 		= document.getElementById('guest-rsvp');
	var guest_attending = document.getElementById('guest-attending');
	var rsvp 			= document.getElementById('rsvp');
	var attending 		= document.getElementById('attending');
	
	if(guest_rsvp.checked){
		attending.style.display	= "block";	
	}else{
		attending.style.display	= "none";
		guest_attending.checked	= false;
	}
	
}

function updateGuest(){
	
	var selectedEditGuestKeyNow = localStorage.getItem(LoginUserNow+'_editGuestKeyNow');
	var editKey					= [
		'GuestName',
		'GuestGender',
		'GuestAge',
		'GuestEmail',
		'GuestInvited',
		'GuestRsvp',
		'GuestAttending',
		'GuestNote'
	];
	var new_guest_name 		= document.getElementById('guest-name');
	var new_guest_gender 	= document.getElementById('guest-gender');
	var new_guest_age		= document.getElementById('guest-age');
	var new_guest_email		= document.getElementById('guest-email');
	var new_guest_invited 	= document.getElementById('guest-invited');
	var new_guest_rsvp		= document.getElementById('guest-rsvp');
	var new_guest_attending	= document.getElementById('guest-attending');
	var new_guest_note		= document.getElementById('guest-note');
	
	if(new_guest_name.value){
		
		localStorage.setItem(selectedEditGuestKeyNow+editKey[0], new_guest_name.value);
		localStorage.setItem(selectedEditGuestKeyNow+editKey[1], new_guest_gender.value);
		localStorage.setItem(selectedEditGuestKeyNow+editKey[2], new_guest_age.value);
		localStorage.setItem(selectedEditGuestKeyNow+editKey[3], new_guest_email.value);
		
		
		if(new_guest_invited.checked){
			localStorage.setItem(selectedEditGuestKeyNow+editKey[4],1);
		}else{
			localStorage.setItem(selectedEditGuestKeyNow+editKey[4],0);
		}
		
		if(new_guest_rsvp.checked){
			localStorage.setItem(selectedEditGuestKeyNow+editKey[5],1);
		}else{
			localStorage.setItem(selectedEditGuestKeyNow+editKey[5],0);
		}
		
		if(new_guest_attending.checked){
			localStorage.setItem(selectedEditGuestKeyNow+editKey[6],1);
		}else{
			localStorage.setItem(selectedEditGuestKeyNow+editKey[6],0);
		}
		
		localStorage.setItem(selectedEditGuestKeyNow+editKey[7], new_guest_note.value);
		
		$('#recordsavemodal').fadeIn();
		
	
	}else{
		
		$('#recordnotsavemodal').fadeIn();
		
	}
}

//TodoList Page

function addToDoList(){
	if(checkselectedEventfirst()){
		location.href='add_list.html'
	}else{
		$('#addTodoListmodal').fadeIn();
	}
	
	
}

function deleteTodoList(){
	var LoginUserNow 		= localStorage.getItem("LoginUserNow");
	var deleteTodoList 		= localStorage.getItem(LoginUserNow+"_deleteTodoListKeyNow");
	var deleteTodoListKeys 	= [
		'TodoListName',
		'TodoListCompleted',
		'TodoListNote'
	];
	
	for(var i = 0; i < deleteTodoListKeys.length; i++){
		localStorage.removeItem(deleteTodoList+deleteTodoListKeys[i]);
	}
}

//Add TodoList Page

function saveToDoList(){
	
	var todolist_task_name 		= document.getElementById('task-name');
	var todolist_task_completed = document.getElementById('task-completed');
	var todolist_task_note 		= document.getElementById('task-note');
	
	
	if(todolist_task_name.value){
		
		//Generate click count on adding Guest
		if (localStorage.LoginUserNow + '_clickcountTodoList') {
			
			localStorage.setItem(LoginUserNow+'_clickcountTodoList',Number(localStorage.getItem(LoginUserNow+'_clickcountTodoList'))+1);
			
		} else {
			
			localStorage.setItem(LoginUserNow+'_clickcountTodoList',1);
		
		}
		
		var clickcountTodoList = localStorage.getItem(LoginUserNow + '_clickcountTodoList');
		
		localStorage.setItem( selectedEventValueNow + '_' + clickcountTodoList + '_TodoListName', todolist_task_name.value);
		
		if(todolist_task_completed.checked){
			localStorage.setItem( selectedEventValueNow + '_' + clickcountTodoList + '_TodoListCompleted', 1);
		}else{
			localStorage.setItem( selectedEventValueNow + '_' + clickcountTodoList + '_TodoListCompleted', 0);
		}
		
		localStorage.setItem( selectedEventValueNow + '_' + clickcountTodoList + '_TodoListNote', todolist_task_note.value );
		localStorage.setItem( selectedEventValueNow + '_' + clickcountTodoList + '_TodoListNote', todolist_task_note.value );
		
		
		
		todolist_task_name.value		= ''; 
		todolist_task_completed.checked	= false;
		todolist_task_note.value		= '';
		
		//message after saving the data
		$('#recordsavemodal').fadeIn();
		
	
	}else{
		
		$('#recordnotsavemodal').fadeIn();
		
	}
		
}


//Edit TodoList Page

function getTodoList(){

	var selectededitTodoListKeyNow 	= localStorage.getItem(LoginUserNow+'_editTodoListKeyNow');
	var editKey						= [
		'TodoListName',
		'TodoListCompleted',
		'TodoListNote',
	];
	
	//Getting the ID of input fields
	var edit_todolist_name 			= document.getElementById('task-name');
	var edit_todolist_completed 	= document.getElementById('task-completed');
	var edit_todolist_note			= document.getElementById('task-note');
	
	
	edit_todolist_name.value = localStorage.getItem(selectededitTodoListKeyNow+editKey[0]);
	
	if(parseInt(localStorage.getItem(selectededitTodoListKeyNow+editKey[1]))==1){
		edit_todolist_completed.checked = true;
	}else{
		edit_todolist_completed.checked = false;
	}
	
	edit_todolist_note.value = localStorage.getItem(selectededitTodoListKeyNow+editKey[2]);
	
	
}

function updateTodoList(){

	var selectededitTodoListKeyNow 	= localStorage.getItem(LoginUserNow+'_editTodoListKeyNow');
	var editKey						= [
		'TodoListName',
		'TodoListCompleted',
		'TodoListNote',
	];
	var new_todolist_name 			= document.getElementById('task-name');
	var new_todolist_completed 		= document.getElementById('task-completed');
	var new_todolist_note			= document.getElementById('task-note');
	
	if(new_todolist_name.value){
		
		localStorage.setItem(selectededitTodoListKeyNow+editKey[0], new_todolist_name.value);
		
		if(new_todolist_completed.checked){
			localStorage.setItem(selectededitTodoListKeyNow+editKey[1],1);
		}else{
			localStorage.setItem(selectededitTodoListKeyNow+editKey[1],0);
		}
		
		localStorage.setItem(selectededitTodoListKeyNow+editKey[2], new_todolist_note.value);
		
		$('#recordsavemodal').fadeIn();
		
	
	}else{
		
		$('#recordnotsavemodal').fadeIn();
		
	}
		
}

//Shopping List Page


function checkShoppingListAmountRecord(){

	if(localStorage.getItem(selectedEventValueNow+"_ShoppingListAllTotalAmount") == 0.00){
		
		localStorage.setItem(selectedEventValueNow+"_ShoppingListSpentAmount",parseFloat(ShoppingListSpentAmount).toFixed(2));

	}
	
}

function addShoppingList(){
	
	if(checkselectedEventfirst()){
		location.href='add_shoppinglist.html'
	}else{
		$('#addShopingListmodal').fadeIn();
	}
	
}

function deleteShoppingList(){
	
	var LoginUserNow 			= localStorage.getItem("LoginUserNow");
	var deleteShoppingList 		= localStorage.getItem(LoginUserNow+"_deleteShoppingListKeyNow");
	var deleteShoppingListKeys 	= [
		'ShoppingListName',
		'ShoppingListPurchased',
		'ShoppingListPrice',
		'ShoppingListTotalQuantity',
		'ShoppingListTotalPrice',
		'ShoppingListNote'
	];
	
	for(var i = 0; i < deleteShoppingListKeys.length; i++){
		localStorage.removeItem(deleteShoppingList+deleteShoppingListKeys[i]);
	}
}

//Add Shopping List Page

function saveShoppingList(){
	
	var shoppinglist_itemname 		= document.getElementById('shoppinglist-itemname');
	var shoppinglist_purchased 		= document.getElementById('shoppinglist-purchased');
	var shoppinglist_price			= document.getElementById('shoppinglist-price');
	var shoppinglist_totalquantity	= document.getElementById('shoppinglist-totalquantity');
	var shoppinglist_note 			= document.getElementById('shoppinglist-note');
	var saveShoppingListKeys		= [
		'ShoppingListName',
		'ShoppingListPurchased',
		'ShoppingListPrice',
		'ShoppingListTotalQuantity',
		'ShoppingListNote',
		'ShoppingListTotalPrice'
	];
	
	if( shoppinglist_itemname.value && shoppinglist_price.value && shoppinglist_totalquantity.value ){
		//Generate Click count event
		if (localStorage.LoginUserNow + '_clickcountShoppingList') {
			localStorage.setItem(LoginUserNow+'_clickcountShoppingList',Number(localStorage.getItem(LoginUserNow+'_clickcountShoppingList'))+1);
		} else {
			localStorage.setItem(LoginUserNow+'_clickcountShoppingList',1);
		}
		
		var clickcountShoppingList = localStorage.getItem(LoginUserNow + '_clickcountShoppingList');
		
		localStorage.setItem( selectedEventValueNow + '_' + clickcountShoppingList + '_' + saveShoppingListKeys[0], shoppinglist_itemname.value);
		if(shoppinglist_purchased.checked){
			localStorage.setItem( selectedEventValueNow + '_' + clickcountShoppingList + '_' + saveShoppingListKeys[1],1);
		}else{
			localStorage.setItem( selectedEventValueNow + '_' + clickcountShoppingList + '_' + saveShoppingListKeys[1],0);
		}
		localStorage.setItem( selectedEventValueNow + '_' + clickcountShoppingList + '_' + saveShoppingListKeys[2], parseFloat(shoppinglist_price.value).toFixed(2));
		localStorage.setItem( selectedEventValueNow + '_' + clickcountShoppingList + '_' + saveShoppingListKeys[3], shoppinglist_totalquantity.value);
		localStorage.setItem( selectedEventValueNow + '_' + clickcountShoppingList + '_' + saveShoppingListKeys[4], shoppinglist_note.value);
		localStorage.setItem( selectedEventValueNow + '_' + clickcountShoppingList + '_' + saveShoppingListKeys[5],	parseFloat(shoppinglist_price.value * shoppinglist_totalquantity.value).toFixed(2));
		
		shoppinglist_itemname.value 		= ''; 
		shoppinglist_purchased.checked		= false; 
		shoppinglist_price.value 			= '';				
		shoppinglist_totalquantity.value 	= '';	
		shoppinglist_note.value 			= '';
	
		
		$('#recordsavemodal').fadeIn();
		
	
	}else{
		
		$('#recordnotsavemodal').fadeIn();
		
	}
}

//Edit Shopping List

function getShoppingList(){

	var selectededitShoppingListKeyNow 	= localStorage.getItem(LoginUserNow+'_editShoppingListKeyNow');
	var editKey							= [
		'ShoppingListName',
		'ShoppingListPurchased',
		'ShoppingListPrice',
		'ShoppingListTotalQuantity',
		'ShoppingListNote',
		'ShoppingListTotalPrice'
	];
	
	//Getting the ID of input fields
	var edit_shoppinglist_itemname 		= document.getElementById('shoppinglist-itemname');
	var edit_shoppinglist_purchased 	= document.getElementById('shoppinglist-purchased');
	var edit_shoppinglist_price			= document.getElementById('shoppinglist-price');
	var edit_shoppinglist_totalquantity	= document.getElementById('shoppinglist-totalquantity');
	var edit_shoppinglist_note			= document.getElementById('shoppinglist-note');
	
	
	edit_shoppinglist_itemname.value = localStorage.getItem(selectededitShoppingListKeyNow+editKey[0]);
	
	if(parseInt(localStorage.getItem(selectededitShoppingListKeyNow+editKey[1]))==1){
		edit_shoppinglist_purchased.checked = true;
	}else{
		edit_shoppinglist_purchased.checked = false;
	}
	
	edit_shoppinglist_price.value 			= localStorage.getItem(selectededitShoppingListKeyNow+editKey[2]);
	edit_shoppinglist_totalquantity.value 	= localStorage.getItem(selectededitShoppingListKeyNow+editKey[3]);
	edit_shoppinglist_note.value 			= localStorage.getItem(selectededitShoppingListKeyNow+editKey[4]);
	
}


function updateShoppingList(){

	var selectededitShoppingListKeyNow 	= localStorage.getItem(LoginUserNow+'_editShoppingListKeyNow');
	var editKey							= [
		'ShoppingListName',
		'ShoppingListPurchased',
		'ShoppingListPrice',
		'ShoppingListTotalQuantity',
		'ShoppingListNote',
		'ShoppingListTotalPrice'
	];
	
	var new_shoppinglist_itemname 		= document.getElementById('shoppinglist-itemname');
	var new_shoppinglist_purchased 		= document.getElementById('shoppinglist-purchased');
	var new_shoppinglist_price			= document.getElementById('shoppinglist-price');
	var new_shoppinglist_totalquantity	= document.getElementById('shoppinglist-totalquantity');
	var new_shoppinglist_note			= document.getElementById('shoppinglist-note');
	
	if(new_shoppinglist_itemname.value && new_shoppinglist_price.value && new_shoppinglist_totalquantity.value ){
		
		localStorage.setItem(selectededitShoppingListKeyNow+editKey[0], new_shoppinglist_itemname.value);
		
		
		if(new_shoppinglist_purchased.checked){
			localStorage.setItem(selectededitShoppingListKeyNow+editKey[1],1);
		}else{
			localStorage.setItem(selectededitShoppingListKeyNow+editKey[1],0);
		}
		
		localStorage.setItem(selectededitShoppingListKeyNow+editKey[2], parseFloat(new_shoppinglist_price.value).toFixed(2));
		localStorage.setItem(selectededitShoppingListKeyNow+editKey[3], new_shoppinglist_totalquantity.value);
		localStorage.setItem(selectededitShoppingListKeyNow+editKey[4], new_shoppinglist_note.value);
		localStorage.setItem(selectededitShoppingListKeyNow+editKey[5], parseFloat(new_shoppinglist_price.value * new_shoppinglist_totalquantity.value).toFixed(2));
		
		$('#recordsavemodal').fadeIn();
		
	}else{
		$('#recordnotsavemodal').fadeIn();
		
	}
		
}

//Budget Page

function addBudget(){
	
	if(checkselectedEventfirst()){
		location.href='add_budget.html'
	}else{
		$('#addBudgetmodal').fadeIn();
	}
	
}

function deleteBudgetList(){
	
	var deleteBudgetListKeyNow 	= localStorage.getItem(LoginUserNow+"_deleteBudgetListKeyNow");
	var deleteBudgetListKeys 	= [
		'BudgetName',
		'BudgetAmount',
		'BudgetPaidAmount',
		'BudgetNote'
	];
	
	for(var i = 0; i < deleteBudgetListKeys.length; i++){
		localStorage.removeItem(deleteBudgetListKeyNow+deleteBudgetListKeys[i]);
	}

}

//Add Budget Page

function saveBudget(){
	
	var budget_name				= document.getElementById('budget-name');
	var budget_amount 			= document.getElementById('budget-amount');
	var budget_paid_amount 		= document.getElementById('paid-amount');
	var budget_note 			= document.getElementById('note');
	var saveBudgetListKeys		= [
		'BudgetName',
		'BudgetAmount',
		'BudgetPaidAmount',
		'BudgetNote',
		'BudgetDifferenceAmount'
	];
	
	
	if(budget_amount.value && budget_name.value && budget_paid_amount.value){
		
		//Generate Click count event
		if (localStorage.LoginUserNow + '_clickcountBudget') {
			localStorage.setItem(LoginUserNow+'_clickcountBudget',Number(localStorage.getItem(LoginUserNow+'_clickcountBudget'))+1);
		} else {
			localStorage.setItem(LoginUserNow+'_clickcountBudget',1);
		}
		
		var clickcountBudget = localStorage.getItem(LoginUserNow + '_clickcountBudget');
		
		localStorage.setItem( selectedEventValueNow + '_' + clickcountBudget + '_' + saveBudgetListKeys[0], budget_name.value);
		localStorage.setItem( selectedEventValueNow + '_' + clickcountBudget + '_' + saveBudgetListKeys[1], parseFloat(budget_amount.value).toFixed(2));
		localStorage.setItem( selectedEventValueNow + '_' + clickcountBudget + '_' + saveBudgetListKeys[2], parseFloat(budget_paid_amount.value).toFixed(2));
		localStorage.setItem( selectedEventValueNow + '_' + clickcountBudget + '_' + saveBudgetListKeys[3], budget_note.value);
		localStorage.setItem( selectedEventValueNow + '_' + clickcountBudget + '_' + saveBudgetListKeys[4], parseFloat(parseFloat(budget_amount.value).toFixed(2) - parseFloat(budget_paid_amount.value).toFixed(2)).toFixed(2));
		
		budget_amount.value			= '';
		budget_name.value			= '';
		budget_note.value			= '';
		budget_paid_amount.value	= '';
		
		$('#recordsavemodal').fadeIn();
		
	
	}else{
		
		$('#recordnotsavemodal').fadeIn();
		
	}

}


function getBudgetList(){
	
	var selectededitBudgetListKeyNow 	= localStorage.getItem(LoginUserNow+'_editBudgetListKeyNow');
	var editKey							= [
		'BudgetName',
		'BudgetAmount',
		'BudgetPaidAmount',
		'BudgetNote',
		'BudgetDifferenceAmount'
	];
	
	//Getting the ID of input fields
	var edit_budget_name		= document.getElementById('budget-name');
	var edit_budget_amount 		= document.getElementById('budget-amount');
	var edit_budget_paid_amount	= document.getElementById('paid-amount');
	var edit_budget_note		= document.getElementById('note');
	
	
	edit_budget_name.value 			= localStorage.getItem(selectededitBudgetListKeyNow+editKey[0]);
	edit_budget_amount.value		= localStorage.getItem(selectededitBudgetListKeyNow+editKey[1]);
	edit_budget_paid_amount.value	= localStorage.getItem(selectededitBudgetListKeyNow+editKey[2]);
	edit_budget_note.value			= localStorage.getItem(selectededitBudgetListKeyNow+editKey[3]);
}

function updateBudgetList(){
	var selectededitBudgetListKeyNow 	= localStorage.getItem(LoginUserNow+'_editBudgetListKeyNow');
	var editKey							= [
		'BudgetName',
		'BudgetAmount',
		'BudgetPaidAmount',
		'BudgetNote',
		'BudgetDifferenceAmount'
	];
	
	var new_budget_name 		= document.getElementById('budget-name');
	var new_budget_amount 		= document.getElementById('budget-amount');
	var new_budget_paid_amount	= document.getElementById('paid-amount');
	var new_budget_note			= document.getElementById('note');
	
	if(new_budget_name.value && new_budget_amount.value && new_budget_paid_amount.value ){
		
		localStorage.setItem(selectededitBudgetListKeyNow+editKey[0], new_budget_name.value);
		localStorage.setItem(selectededitBudgetListKeyNow+editKey[1], parseFloat(new_budget_amount.value).toFixed(2));
		localStorage.setItem(selectededitBudgetListKeyNow+editKey[2], parseFloat(new_budget_paid_amount.value).toFixed(2));
		localStorage.setItem(selectededitBudgetListKeyNow+editKey[3], new_budget_note.value);
		localStorage.setItem(selectededitBudgetListKeyNow+editKey[4], parseFloat(parseFloat(new_budget_amount.value).toFixed(2) - parseFloat(new_budget_paid_amount.value).toFixed(2)).toFixed(2));
		
		$('#recordsavemodal').fadeIn();
		
	
	}else{
		
		$('#recordnotsavemodal').fadeIn();
		
	}
}

