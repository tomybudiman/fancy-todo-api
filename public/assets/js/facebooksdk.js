// Onclick login button
function facebookLogin(scope,callback){
    FB.login(function(response){
      callback(response);
    },{scope:scope});
}

function statusChangeCallback(response){
    if(response.status === "connected"){
        // Jika user sudah mengijinkan web untuk mengakses akun facebook mereka
    }else{
        // Jika user belum melakukan mingijinkan web untuk mengakses akun facebook mereka
    }
}

function checkLoginState(){
    FB.getLoginStatus(function(response){
        statusChangeCallback(response);
    });
}

// First Initialize
window.fbAsyncInit=function(){
    FB.init({
        appId      : 130688440929491,
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : "v2.11" // use graph api version 2.8
    });
    FB.getLoginStatus(function(response){
        statusChangeCallback(response);
    });
};

//==> Load SDK
(function(doc,tag,id){
    var js, fjs = doc.getElementsByTagName(tag)[0];
    if (doc.getElementById(id)) return;
    js = doc.createElement(tag); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document,"script","facebook-jssdk"));
