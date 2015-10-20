/*
	THIS IS A LOGIN CLASS, IT SHOULD BE INHERITED.
	NB: DO NOT ADD TO THIS CLASS OR FILE UNLESS YOU ARE AUTHORIZED TO.
*/

var User = function(){
	//first inherit Ifirst class
	Ifirst.call(this);

	this.login = function(){
		return "LOGIN";
	};
};