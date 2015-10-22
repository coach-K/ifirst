$(function(){

	var theUser = new User();
	var theSession = new Session();

		if(theSession.isUser()){
			theSession.routeTo("profile");
		}

	//LOGIN BUTTON
	$("#loginForm").submit(function(e){
		var userObject = $(this).serializeObject();
		var loginPromise = theUser.authWithPassword(userObject);
		e.preventDefault();
		theUser.handleAuthResponse(loginPromise, 'profile');
	});

	//TYPED EFFECT
    $("#typed").typed({
        strings: [" excitment...", " ^1000 happiness...", " true ^1000 feelings...", "self..."],
        typeSpeed: 40,
        backDelay: 500,
        loop: true,
        contentType: 'html', // or text
        loopCount: false
    });
    $("#typedagain").typed({
        strings: ["bought yourself a smart Ferarri ^2000", "find yourself a super stunning wife ^3000", "throw yourself a million dollar birthday party ^2000", "hop on the plane and fly to paris ^4000", "seal that multi-million dollar project ^2000", "do something supercoooOOOL ^5000"],
        typeSpeed: 30,
        backDelay: 500,
        loop: true,
        contentType: 'html', // or text
        loopCount: false
    });

    //--

});