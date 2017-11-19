if(localStorage.login_token != null){
  // Jika login token ditemukan pada localStorage
  const loginToken={token:localStorage.login_token};
  $.ajax({
    url:"http://localhost:3000/user/verify",
    method:"POST",
    dataType:"json",
    data:loginToken,
    success:function(fromServer){
      if(fromServer.status){
        console.log("Login successful!");
      }else{
        console.log(fromServer.msg);
        localStorage.removeItem("login_token");
      }
    },
    error:function(){
      console.log("Something went wrong! Code 1.2");
    }
  });
}

function clickLoginFb(){
  // Execute facebookLogin function with email scope
  facebookLogin("email",function(response){
    if(response.status === "connected"){
      $.ajax({
        url:"http://localhost:3000/user/add",
        method:"POST",
        dataType:"json",
        data:response.authResponse,
        success:function(fromServer){
          if(fromServer.status){ // Jika server mereturn true
            localStorage.setItem("login_token",fromServer.data);
            window.location.reload();
          }else{ // Jika server mereturn false
            console.log(fromServer.msg);
          }
        },
        error:function(){
          console.log("Something went wrong! Code 1.1");
        }
      });
    }
  });
}
