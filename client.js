var current_view = "welcomeview";
var min_passw_length = 5;

displayView = function(view) 
{
   document.getElementById("content").innerHTML = document.getElementById(view).innerHTML;
};


signIn = function()
{
   current_view = "profileview";
   displayView(current_view);
};

window.onload = function()
{
   displayView(current_view);


   //SIGN-IN
   document.getElementById("sign-in").onsubmit = function() 
   {	
      signIn();

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
         var input = document.getElementById('email2');

         if( response.success === false )
         {
            console.log(response.message);
            input.setCustomValidity( response.message ); //TODO  
         } 

         else
         {
            input.setCustomValidity("");
            signIn();
         }

      return false;	
   };

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
