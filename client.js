
var current_view = "welcomeview";
var min_passw_length = 5;

displayView = function(view) {
	document.getElementById("content").innerHTML = document.getElementById(view).innerHTML;
};

window.onload = function() {
	displayView(current_view);
	document.getElementById("sign-in").onsubmit = function() 
	{	
		if(validateSignIn() == true)
		{
			current_view = "profileview";
			displayView(current_view);

		}

		return false;

	};

	document.getElementById("sign-up").onsubmit = function() 
	{	
		if(validateSignUp() == true)
		{
			var data_object = 
			{
				"email": document.getElementById("email").value,
				"password": document.getElementById("password2").value,
				"firstname": document.getElementById("firstname").value,
				"familyname": document.getElementById("familyname").value,
				"gender": document.getElementById("gend").value,
				"city": document.getElementById("city").value,
				"country": document.getElementById("country").value
			};

			var response = serverstub.signUp(data_object);
			alert(response.message);
		}
	
		return false;

	};
};

validateSignUp = function() {
	//concole.log("Sign up validated");
	if (document.getElementById("password2").value === document.getElementById("repeat_psw").value 
		&& document.getElementById("password2").value.length >= min_passw_length)
 		return true;
 	else
 	{
 		document.getElementById("password2").focus();
 		return false;
	}
 };


validateSignIn = function() {

	return document.getElementById("password1").value.length >= min_passw_length;
};


