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
   init_profile_functions();
};

SignOut = function()
{
   localStorage.removeItem( "token" );
   current_view = "welcomeview";
   displayView( current_view );
   init_welcome_functions();
}

init_welcome_functions = function()
{

   //SIGN-IN
   document.getElementById("sign-in").onsubmit = function() 
   {
      var data_object = 
      {
         email: document.getElementById("email1").value,
         password: document.getElementById("password1").value
      };

      var response = serverstub.signIn( data_object.email, data_object.password );
      var input = document.getElementById('email1');
     
         if( response.success === false )
         {
            console.log(response.message);
            input.setCustomValidity( response.message ); 
         } 
         else
         {
            localStorage.setItem( "token", response.data );
            input.setCustomValidity("");
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
};

//WHEN ONE REFESH
window.onload = function()
{
   console.log( localStorage.getItem("token") );
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


validateSignIn = function() 
{
   var psw = document.getElementById("password1");

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
