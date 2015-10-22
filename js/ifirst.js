/*
	THIS IS A BASE CLASS, IT SHOULD BE INHERITED.
	NB: NO CODE SHOULD BE ADDED TO THIS CLASS OR FILE.
*/
var Ifirst = function(){
	var ref = new Firebase("https://ifirst.firebaseio.com");

	//Returns Firebase Reference
	this.getRef = function(){ return ref; };

	this.routeTo = function(route) { window.location.href = '/' + route; };

};