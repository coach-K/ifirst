/*
	THIS IS A SESSION CLASS, IT SHOULD BE INHERITED.
	NB: DO NOT ADD TO THIS CLASS OR FILE UNLESS YOU ARE AUTHORIZED TO.
*/

var Session = function(){
	//first inherit Ifirst/base class
	Ifirst.call(this);

 	//Check the current user
    var user = this.getRef().getAuth();
    var userRef;

    this.isUser = function(){
    	if (user) {
	        return true;
	    } else {
	    	return false;
	    }
    };

};