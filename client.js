var current_view = "welcomeview";
var min_passw_length =3;

displayView = function(view) 
{
   document.getElementById("content").innerHTML = document.getElementById(view).innerHTML;
};

window.onload = function()
{
   displayView(current_view);


   //SIGN-IN
   document.getElementById("sign-in").onsubmit = function() 
   {	
      if(validateSignIn() == true)
      {
         current_view = "profileview";
         displayView(current_view);
      }
      return false;
   };
   /*
      //TODO SIGN-OUT
      document.getElementById("logout").onclick
      {
         current_view = "welcomeview";
         displayView( current_view );
      }
   */

   //SIGN-UP
   document.getElementById("sign-up").onsubmit = function() 
   {
      var data_object = 
      {
         email: document.getElementById("email2").value,
         password: document.getElementById("password2").value,
         firstname: document.getElementById("firstname").value,
         familyname: document.getElementById("familyname").value, 
         gender: document.getElementById("gend").value,
         city: document.getElementById("city").value,
         country: document.getElementById("country").value
      };

      var response = serverstub.signUp(data_object);
      if( response.success === false )
      {
         var input = document.getElementById('email2');
         input.setCustomValidity( response.message ); //TODO  
      } 
      return false;	
   };



};

/*
validateSignUp = function()
{
   //concole.log("Sign up validated");

   //We also need to check if the email has been registrated before!
   if ( 
 document.getElementById("password2").value.length >= min_passw_length)  //password > minimum lenth
      {
         return true;
      } 
      else
      {
         return false;
      }
 };
*/

validateSignIn = function() 
{
   
};
