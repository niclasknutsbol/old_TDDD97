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
   setupProfile();
};

setupProfile = function()
{
   var temp_token = localStorage.getItem( "token" ); 
   var response = serverstub.getUserDataByToken(temp_token);

   document.getElementById("profile_name").innerHTML = response.data.firstname;
   document.getElementById("profile_family").innerHTML = response.data.familyname;
   document.getElementById("profile_gender").innerHTML = response.data.gender;
   document.getElementById("profile_country").innerHTML = response.data.country;
   document.getElementById("profile_city").innerHTML = response.data.city;
   document.getElementById("profile_email").innerHTML = response.data.email;
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
            localStorage.setItem( "email", email );
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

      var new_password = document.getElementById("password4").value;
      var ctr_new_password = document.getElementById("password5");
  
     if( new_password != ctr_new_password.value )
      {
         ctr_new_password.setCustomValidity("Your must write your new password twice!");
         return false;
      }
      else
      {
         ctr_new_password.setCustomValidity("");  
      }

      var old_password = document.getElementById("password3");
      var temp_token = localStorage.getItem( "token" ); 

      var response = serverstub.changePassword( temp_token, old_password.value, new_password );

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


    document.getElementById("post_button").onclick = function()
    {
        var token   = localStorage.getItem( "token" );
       	var message = document.getElementById("message_post").value;
        var email   = localStorage.getItem( "email" );

        if( message !== "" )
        {
            serverstub.postMessage( token, message+'\n', email ); 
            //serverstub.postMessage( token, '\n',  email );

	    document.getElementById("message_post").value = "";
            
            document.getElementById("update_wall").click();    
        }
        
    };


  document.getElementById("update_wall").onclick = function()
    {
      var token = localStorage.getItem("token");
      var response = serverstub.getUserMessagesByToken( token );
      if( response.success === true )
      {
         document.getElementById("message_read").value = response.data[1].content + '\n'; //TODO ERROR RETURN OBJECTS
      }
  };

   document.getElementById("lookup_profile").onsubmit = function() 
   {
      var email = document.getElementById("email4").value;      
      var token = localStorage.getItem( "token" );

      var response = serverstub.getUserDataByEmail( token, email ); 
      if(response.success === true ) //email exist!
      {
         localStorage.setItem( "browse_email", email ); //stored for posting and reading
 
         document.getElementById("update_wall_browse").click();    
      }      
  };


   document.getElementById("post_button_browse").onclick = function()
    {
        var token   = localStorage.getItem( "token" );
       	var message = document.getElementById("message_post_browse").value;
        var email   = localStorage.getItem("browse_email");

       if( message !== "" )
        {
            serverstub.postMessage( token, message+'\n', email ); 
            //serverstub.postMessage( token, '\n',  email );

	    document.getElementById("message_post_browse").value = "";
            
            document.getElementById("update_wall_browse").click(); 
        } 
    };



   document.getElementById("update_wall_browse").onclick = function()
    {
      var token = localStorage.getItem("token");
      var email = localStorage.getItem("browse_email");
      var response = serverstub.getUserMessagesByToken( token, email );  //load by email
      if( response.success === true )
      {
        var messages = "";
        for (var i = 0; i < response.data.length ; i++) {
            messages += response.data[i].writer+'\n';
            messages += response.data[i].content;
          }
        document.getElementById("message_read_browse").value = messages; //TODO ERROR RETURN OBJECTS
      }
   };


}; //PROFILE VIEW


//WHEN ONE REFESH
window.onload = function()
{
   if( localStorage.getItem( "token" ) === null || localStorage.getItem( "token" ) === undefined )
   {
      current_view = "welcomeview";
      displayView(current_view);
      init_welcome_functions();
   }
   else
   {
      current_view = "profileview";
      displayView(current_view);
      window.location.href = "#home_panel";
      init_profile_functions();
      setupProfile();
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



