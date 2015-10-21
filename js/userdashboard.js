NB// THIS DASHBOARD HAVE BEEN CREATED TO WORK AND OBTAIN DATA DIRECTLY FROM FIREBASE
function registerUser() {
  this.register = function(email, password, username, showMessages) {
    var newMessage = showMessages;
    var ref = new Firebase("https://ifirst.firebaseio.com/")
    ref.createUser({
      email : email,
      password : password
    }, function(error, userData) {
      if (error) {
        switch (error.code) {
          case "EMAIL_TAKEN":
          newMessage.text("The new user account cannot be created because the specified email address is already in use.");
          break;
          case "INVALID_EMAIL":
          newMessage.text("The specified email is not a valid email.");
          break;
          default:
          newMessage.text ("Error creating user:" + error);
        }
      } else {
        window.location = "";
        newMessage.text ("Successfully created user account with uid:" + userData.uid);
        var usersReference = ref.child("users")
        var usersRef = usersReference.push();
        usersRef.set({
          email : email,
          password : password,
          username: username,
          uid : userData.uid
        });
      }
    });
  };

  this.login = function(email, password, showMessage ) {
    var message = showMessage;
    var ref = new Firebase("https://ifirst.firebaseio.com");
    ref.authWithPassword({
      email    : email,
      password : password
    }, function(error, authData) {
      if (error) {
        switch (error.code) {
          case "INVALID_EMAIL":
          message.text("The specified user account email is invalid.");
          case "INVALID_PASSWORD":
          message.text("The specified user account password is incorrect.");
          break;
          case "INVALID_USER":
          message.text("The specified user account does not exist.");
          break;
          default:
          message.text("Error logging user in:" + error);
        }
      } else {
        window.location = "";
        message.text("Authenticated successfully" + authData);
      }
    });
  };
  // user facebook login authentication this prompt the user to login and then invoke the Facebook login popup
  this.facebookLogin = function(showFacebookMessage) {
    var facebookMessage = showFacebookMessage;
    var ref = new Firebase("https://ifirst.firebaseio.com");
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        facebookMessage.text("Login Failed!", error);
      } else {
        facebookMessage.text("Authenticated successfully with payload:" + authData);
      }
    });
    //facebookloginauntentication with a full browser page redirect
    ref.authWithOAuthRedirect("facebook", function(error) {
      if (error) {
        facebookMessage.text("Login Failed!" + error);
      } else {
        // We'll never get here, as the page will redirect on success.
      }
    });
  }

  // user twitter login authentication this prompt the user to login and then invoke the twitter login popup
  this.twitterLogin = function(showTwitterMessage) {
    var twitterMessage = showTwitterMessage;
    var ref = new Firebase("https://ifirst.firebaseio.com");
    ref.authWithOAuthPopup("twitter", function(error, authData) {
      if (error) {
        twitterMessage.text("Login Failed!" + error);
      } else {
        twitterMessage.text("Authenticated successfully with payload:" +authData);
      }
    });
    //twitterloginauntentication with a full browser page redirect
    ref.authWithOAuthRedirect("twitter", function(error) {
      if (error) {
        twitterMessage.text("Login Failed!" + error);
      } else {
        // We'll never get here, as the page will redirect on success.
      }
    });
  }

  this.googleLogin = fuction(showGoogleMessage) {
    var googleMessage = showGoogleMessage;
    var ref = new Firebase("https://ifirst.firebaseio.com");
    ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        googleMessage.text("Login Failed!" + error);
      } else {
        googleMessage.text("Authenticated successfully with payload:" + authData);
      }
    });
    //googlelogin auntentication with a full browser page redirect
    ref.authWithOAuthRedirect("google", function(error) {
      if (error) {
        googleMessage.text("Login Failed!" + error);
      } else {
        // We'll never get here, as the page will redirect on success.
      }
    }
  }

  //controls users alret box for sign in and signup sections
  $(document).ready(function(){
    var message = $("#messagebox");
    var newMessage = $("#messagebox");
    var facebookMessage = $("#messagebox");
    var twitterMessage = $("#messagebox");
    var googleMessage = $("#messagebox");

    //controls the signup function
    $("#signupsubmit").click(function(){
      var useremail = $("#signupemail").val();
      var userpassword = $("#signuppassword").val();
      var username = $("#username").val();
      var userRegistration = new registerUser();
      userRegistration.register(useremail, userpassword, username, newMessage);
    });

    //control signin functions
    $("#signinsubmit").click(function(){
      var useremail = $("#signinusername").val();
      var userpassword = $("#signinpassword").val();
      var userSignin = new registerUser();
      userSignin.login(useremail, userpassword, message);
    });

    //controls faceebook signin function
    $("#facebooksignin").click(function(){

      //work in progress
    });


  });


  //ensures that a user should only be able to add their own entry.
  //when auntenticated with any of the social networks
  // ermm still work in progress please add to these and correct all errors
  {
    people: {
      $userid: {
        ".write": $userid == auth.id
      }
    }
  }
  // ensures users have there feeds in each of there feed buckets
  {
    users: {
      $userid: {
        ".write": $userid == auth.id,
        videos: {},
        stories: {},
        generalfeed: {},
        following: {},
        followers: {}
      }
    }
  }
// allow user followers post stories to users dashboard
{
  feed: {
    "$postid": {
       ".write":
       root.child('users/' + $userid + '/following').hasChild(auth.id) &&
       root.child('sparks/' + $ifirstid + '/author').val() == auth.id
     }
   }
 }

 //validates the list of followers and enables followers to write to users dashboard
 {
   following: {
     $userid: {
       ".validate": root.child('people').hasChild($userid)
     }
   },
   followers: {
     $userid: {
       ".write": $userid == auth.id
     }
   }
 }

 // defining each users rules users can also add to there posts
 {
   userfeeds: {
     $postid: {
       ".write": !data.exists(),
       ".validate": newData.hasChildren(['author', 'content']),
       author: {
         ".validate": newData.val() == auth.id
       },
       content: {
         ".validate": newData.isString()
       }
     }
   }
 }

// WORK IN PROGRESS
 //defining the rules of users generalfeed in IFIRST apply
 /* var userid = ; //
 var postRef = firebase.child("post").push();
 var postRefId = postRef.name();

 // Add post to global feed.
 postRef.set(post);

 // Add  user ID to user's list on each post by user.
 var currentUser = firebase.child("post").child(userid);
 currentUser.child("post").child(postRefId).set(true);

 // Add user ID to the feed of everyone following this user.
 currentUser.child("followers").once("value", function(list) {
   list.forEach(function(follower) {
     var childRef = firebase.child("users").child(follower.name());
     childRef.child("feed").child(postRefId).set(true);
   });
 });
//requirement for display feed of a particular user
 var feed = firebase.child("users").child(userid).child("feed");
 feed.on("child_added", function(snapshot) {
   var postID = snapshot.name();
   var postRef = firebase.child("post").child(postID);
   postRef.on("value", function(post) {
     // this will place snaspshost post into the user's feed.
   });
 })
 /*
