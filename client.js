var current_view = "welcomeview";
var min_passw_length = 5;
var token;

displayView = function(view) 
{
   document.getElementById("content").innerHTML = document.getElementById(view).innerHTML;
};


signIn = function()
{
   current_view = "profileview";
   displayView(current_view);
   window.location.href = "#home_panel";
   init_profile_functions();
};

SignOut = function()
{
   localStorage.removeItem( "token" );
   current_view = "welcomeview";
   displayView( current_view );
   window.location.href = "";
   init_welcome_functions();
}

init_welcome_functions = function()
{

   //SIGN-IN
   document.getElementById("sign-in").onsubmit = function() 
   {

      var email = document.getElementById("email1").value;
      var password = document.getElementById("password1").value;

      var response = serverstub.signIn( email, password );
     
         if( response.success === false )
         {
            console.log(response.message);
            email1.setCustomValidity( response.message ); 
         } 
         else
         {
            localStorage.setItem( "token", response.data );
            email1.setCustomValidity(""); //This line is probaly unnessery
            signIn();
         }
      return false;
   };
   

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
         var input = document.getElementById('email2');

         if( response.success === false )
         {
            console.log(response.message);
            input.setCustomValidity( response.message ); //TODO  
         } 

         else
         {
            localStorage.setItem( "token", response.data );
            input.setCustomValidity("");
            signIn();
         }

      return false;	
   };
};//INIT_WELCOME_FUNCTIONS

init_profile_functions = function()
{
   document.getElementById("logout").onclick = function()
   {
      SignOut();
   };


   document.getElementById("change_psw").onsubmit = function()
   {
      console.log("#1");

      var new_password = document.getElementById("password4").value;
      var ctr_new_password = document.getElementById("password5");
  
     if( new_password != ctr_new_password.value )
      {
         console.log("#1.1");
         ctr_new_password.setCustomValidity("Your must write your new password twice!");
         return false;
      }
      else
      {
         console.log("#1.2");
         ctr_new_password.setCustomValidity("");  
      }
      console.log("#2");
      var old_password = document.getElementById("password3");
      var temp_token = localStorage.getItem( "token" ); 

      var response = serverstub.changePassword( temp_token, old_password.value, new_password );
      console.log( response.success );
      if( response.success === false )
      {
         old_password.setCustomValidity( "Old password is incorrect" );
         return false;
      }
      else
      {
         old_password.setCustomValidity( "" ); 
      }

      return false;
   };

};


//WHEN ONE REFESH
window.onload = function()
{
   if( localStorage.getItem( "token" ) === null || localStorage.getItem( "token" ) ===undefined )
   {
      current_view = "welcomeview";
      displayView(current_view);
      init_welcome_functions();
   }
   else
   {
      current_view = "profileview";
      displayView(current_view);
      init_profile_functions();
   }
};


validateSignUp = function()
{  
   var psw = document.getElementById("password2");
   var repeat_psw = document.getElementById("repeat_psw");

   psw.setCustomValidity("");
   repeat_psw.setCustomValidity("");

   if(psw.value.length < min_passw_length)
   {
      psw.setCustomValidity("Too short! It must be at least "+min_passw_length.toString()+" characters");
      return false;
   }
   else if(psw.value !== repeat_psw.value)
   {
      repeat_psw.setCustomValidity("Please enter the same password as above");
      return false;
   }
   else
   {
     return true;
   }
 };


validateSignIn = function( psw ) 
{
   //http://stackoverflow.com/questions/11151157/jquery-same-function-for-multiple-ids

   //var psw = document.getElementById("password1");

   if(psw.value.length < min_passw_length)
   {
      psw.setCustomValidity("Too short! It must be at least "+min_passw_length.toString()+" characters");
      return false;
   }
   else
   {
     psw.setCustomValidity("");
     return true;
   }
};


