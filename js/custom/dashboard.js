var theUser = new User();
var theSession = new Session();
var currentUser = "";

	if(!theSession.isUser()){
		theSession.routeTo("../");
	} else {
		currentUser = theUser.getRef().getAuth();
			//SET PRIMARY USER--------------
			
			var profile_information = theUser.getRef().child("users").child(currentUser.uid).child("profile_information");
				profile_information.on("value",function(snapshot){

					var primaryuser = snapshot.val();
					theUser.setPrimaryUser(primaryuser);
					setPagePrimaryUser(theUser.getPrimaryUser());
					setPageSecondaryUser(theUser.getPrimaryUser());

					//FETCH USER POSTS
					var timeline = $("#timeline");
					//timeline.html("");
					//timeline.prepend('<h1 style="text-align: center; color: #e1e1e1;">No Feeds Available</h1>');
					
					var random_post = theUser.getRef().child("posts").child(theUser.getPrimaryUser().uid);
						random_post.on("child_added",function(snapshot){
							var postKey = snapshot.key();
							var postVal = snapshot.val();
							//timeline.html("");
							var holder = {};
							if(postVal != undefined){
								//ORGANIZE POST
								$.each(postVal,function(key,value){

									if(key === "title" && value != undefined){
										holder.title = htmlDecode(value);
									};

									if(key === "description" && value != undefined){
										var desc = htmlDecode(value);
										holder.description = (desc.length > 300 ) ? '<p>' + desc.substring(0,300) + '</p> <a id="continue-reading-' + postKey + '" href="#" data-uid="' + holder.uid + ' data-post="' + postKey + '" class="btn btn-primary btn-xs pull-right">continue reading...</a>' : '<p>' + desc + '</p>';
									};

									if(key === "author" && value != undefined){
										holder.uid = value.uid;
										holder.name = value.name;
										holder.imageURL = value.imageURL;
									};

									var imagecount = 0;
									if(key === "media" && value != ""){						
										$.each(value, function(keyM,valueM){
											if (imagecount == 0) {	
												if(valueM.indexOf('mp4') != -1){
													holder.images = '<video class="img-responsive" controls><source src="' + valueM + '" type="video/mp4"></video>';
												} else {
													holder.images = '<img src="' + valueM + '" class="img-responsive">';											
												};									
											} else {
												if(valueM.indexOf('mp4') === -1){
													holder.images += '<video class="img-responsive" controls><source src="' + valueM + '" type="video/mp4"></video>';
												} else {
													holder.images += '<img src="' + valueM + '" class="img-responsive">';											
												};
											};
											imagecount += 1;
										});
									} else if(key === "media" && value === "") {
										holder.images = "";
									};

									if(key === "comments" && value != ''){
										var countC = Object.keys(value).length;
										var increaseC = 0;	
										var commentcount = 0;												
											if(countC > 0){
												holder.commentHeader = '<div class="view-all-comments"><a href="#"><i class="fa fa-comments-o"></i> View all</a> ' + countC + ' comments</div>';
												
												$.each(value, function(keyC,valueC){
													if(increaseC < 2){
													console.log(keyC + " : ");
													console.log(valueC);
													
														if(commentcount === 0){	
															holder.commentBody = '<li>' +
								                                '<div class="media">' +
								                                    '<a id="user-image" data-uid="' + valueC.author.uid + '" href="#" class="pull-left">' +
								                                        '<img src="' + valueC.author.imageURL + '" class="media-object">' +
								                                    '</a>' +
								                                    '<div class="media-body">' +
								                                        '<a id="user-name" data-uid="' + valueC.author.uid + '" href="#" class="comment-author">' + valueC.author.name + '</a>' +
								                                        '<span> ' + htmlDecode(valueC.comment) + '</span>' +
								                                        '<div class="comment-date">' + valueC.time + '</div>' +
								                                    '</div>' +
								                                '</div>' +
								                            '</li>'; 
														} else {
															holder.commentBody += '<li>' +
								                                '<div class="media">' +
								                                    '<a id="user-image" data-uid="' + valueC.author.uid + '" href="#" class="pull-left">' +
								                                        '<img src="' + valueC.author.imageURL + '" class="media-object">' +
								                                    '</a>' +
								                                    '<div class="media-body">' +
								                                        '<a id="user-name" data-uid="' + valueC.author.uid + '" href="#" class="comment-author">' + valueC.author.name + '</a>' +
								                                        '<span> ' + htmlDecode(valueC.comment) + '</span>' +
								                                        '<div class="comment-date">' + valueC.time + '</div>' +
								                                    '</div>' +
								                                '</div>' +
								                            '</li>'; 
														};	
															commentcount += 1;
													};
													increaseC += 1;
												});													
											}; 
										
									} else if(key === "comments" && value === ''){
										holder.commentBody = '';
										holder.commentHeader = '<div class="view-all-comments"><i class="fa fa-comments-o"></i> Be the first to comments</div>';
									};

									if(key === "likes" && value != ''){
											var countL = Object.keys(value).length;
											var increaseL = 0;
											var likecount = 0;
											if(countL > 0){
												holder.likeHeader = '<a onclick="return clickLike(this);" data-post="' + postKey + '" data-uid="' + holder.uid + '" class="user-count-circle">' + countL + '+</a>';
												if(increaseL < 3){
													$.each(value, function(keyL,valueL){
														if(likecount == 0){
															holder.likeBody = '<img id="like-image" src="' + valueL.imageURL + '" alt="' + valueL.name + '" class="img-circle" />';
														} else {
															holder.likeBody += '<img id="like-image" src="' + valueL.imageURL + '" alt="' + valueL.name + '" class="img-circle" />';
														};
														likecount += 1;
													});
													increaseL += 1;
												};
											} 
									} else if(key === "likes" && value === ''){
										holder.likeBody = '';
										holder.likeHeader = '<a onclick="return clickLike(this);" data-post="' + postKey + '" data-uid="' + holder.uid + '" class="user-count-circle">0+</a>';
									}; 
							
								});
									
									
									//BEGIN
									var postHtml = '<div class="timeline-block"><div class="panel panel-default">';
									//HEADER
									postHtml += '<div class="panel-heading">';
										postHtml += '<div class="media">' +
						                                '<a href="#" data-uid="' + holder.uid + '" class="pull-left">' +
						                                    '<img src="' + holder.imageURL + '" class="media-object">' +
						                                '</a>' +
						                                '<div class="media-body">' +
						                                	'<a href="#" class="pull-right text-muted"><i class="icon-reply-all-fill fa fa-2x "></i></a>' +
						                                    '<a href="#" data-uid="' + holder.uid + '" >' + holder.name + '</a>' +
						                                    '<span>' + holder.title + '</span>' +
						                                '</div>'+
					                                ' </div>';
				                    postHtml += '</div>';
				                    //IMAGES
				                    postHtml += '' + holder.images + '';
				                    //LIKES
				                    postHtml += '<div class="panel-body" id="likes-' + postKey + '">';
				                    	postHtml += '' + holder.likeBody + '' + holder.likeHeader;
				                    postHtml += '</div>';
				                    //DESCRIPTION
				                    postHtml += '<div class="panel-body">';
				                    postHtml += '' + holder.description + '';
				                    postHtml += '</div>';
				                    //COMMENTS
				                    postHtml += '' + holder.commentHeader + '';
				                    postHtml += '<ul id="comments-container-' + postKey + '" class="comments">';
				                    postHtml += '' + holder.commentBody + '';
				                    postHtml += '<li id="comment-form-' + postKey + '" class="comment-form">' +
					                                '<div class="input-group">' +
					                                    '<input id="comment-box-' + postKey + '" type="text" class="form-control" />' +
					                                    '<span class="input-group-addon">' +
					                                       '<a onclick="return clickComment(this);" data-post="' + postKey + '" data-uid="' + holder.uid + '" ><i class="fa fa-photo"></i></a>' +
					                                    '</span>' +
					                                '</div>' +
					                            '</li>';
				                    postHtml += '</ul>';
				                    postHtml += '</div>';
				                    postHtml += '</div>';

									//timeline.prepend(postHtml);
									


                			$(timeline).gridalicious('prepend', $(postHtml));
						    

							};//END IF POSTVAL
						});

				});

		//--------------------------------
	};

$('#postPhoto').hide();

$(function(){

	$("#timeline").each(function () {
        $(this).gridalicious({
            gutter: 15,
            width: 370,
            selector: '> div',
            animate: true,
            animationOptions: { 
		    speed: 200, 
		    duration: 300
		    },
        });
    });


	//LOGOUT
	$("#logout").click(function(event){
		theUser.getRef().unauth();
		theUser.setPrimaryUser({});
		theUser.setSecondaryUser({});
		theSession.routeTo("../");
	});

	//POST PROCESS
	$('#photoclick').click(function(event){
		$('#postPhoto').show();
	});
	$('#statusclick').click(function(event){
		$('#postPhoto').hide();
	});	
	//UPLOAD FILE
	 $('#drag-and-drop-zone').dmUploader(imageUploadSettings);
	//POST TO FIREBASE
	$("#postButton").click(function(event){
		var theBox = $("#postBox");
		if (theBox.val()) {
			var feelings = theBox.val();
			feelings = htmlEncode(feelings).trim();

			var newPost = {}, media = {}, title=feelings;
			if (feelings.length > 40) {title = feelings.substring(0,35) + "..."};
			newPost.title = title;
			newPost.description = feelings;
			newPost.author = theUser.getPrimaryUser();
			newPost.comments = "";
			newPost.likes = "";
			newPost.media = "";

			if(theUser.getPostImageURL()){			
				$.each(theUser.getPostImageURL(), function(key,value){
					media["image"+key] = value;
				});
				newPost.media = media;
			};

			theUser.getRef().child("posts").child(theUser.getPrimaryUser().uid).push(newPost, function(error){
				if (error === null) {
					showMessage({type:'success', title:'Yippy!', message: 'your excitement has been posted.'});
					//CLEAR POST
					theUser.resetPostImageURL();
					$("#postBox").val("");
					$("#demo-files").html("");
				} else {
					showMessage({type:'danger', title:'Oops!', message: 'your excitement was not posted.'});
				};				
			});
		};
	});



//END READY
});

imageUploadSettings = {
        url: 'server/php/upload.php',
        dataType: 'json',
        allowedTypes: 'image/png|image/jpg|image/jpeg|video/mp4',
        onNewFile: function(id, file){
          $.danidemo.addFile('#demo-files', id, file);
          if (typeof FileReader !== "undefined"){
            var reader = new FileReader();
            var img = $('#demo-files').find('.demo-image-preview').eq(0);

            reader.onload = function (e) {
            	if(String(e.target.result).indexOf('video/mp4') != -1){
              		img.attr('src', 'images/gallery.png');
            	} else {
              		img.attr('src', e.target.result);
            	};
            }
            reader.readAsDataURL(file);
          } else {
            $('#demo-files').find('.demo-image-preview').remove();
          }
        },
        onUploadProgress: function(id, percent){
          var percentStr = percent + '%';
          $.danidemo.updateFileProgress(id, percentStr);
        },
        onUploadSuccess: function(id, data){
          getImagePath(data.files[0]);

          var title = '<strong> ' + data.files[0].substring(data.files[0].lastIndexOf("/")+1,data.files[0].length) + ' </strong>';
          showMessage({type:'success', title:title, message: 'was uploaded successfully.'});

          $.danidemo.updateFileStatus(id, 'success', 'Upload Complete');
          $.danidemo.updateFileProgress(id, '100%');
        },
        onUploadError: function(id, message){
        	showMessage({type:'danger', title:'Oops!', message: message});

          $.danidemo.updateFileStatus(id, 'error', message);
        },
        onFileTypeError: function(file){
        	showMessage({type:'danger', title:'Oops!', message: 'cannot be added: must be an image.'});
        },
        onFileSizeError: function(file){
        	showMessage({type:'danger', title:'Oops!', message: 'cannot be added: size excess limit.'});
        }
      };

function getImagePath(value){
	theUser.setPostImageURL(value);
};

function htmlEncode(value){
    if (value) {
        return jQuery('<div />').text(value).html();
    } else {
        return '';
    }
};

function htmlDecode(value) {
    if (value) {
        return $('<div />').html(htmlEncode(value)).text();
    } else {
        return '';
    }
};

function clickLike(event){
	var like = $(event);
	var theLike = parseInt(like.text().replace('+',''));
	var forPost = like.data('post');
	var forUser = like.data('uid');
	var likeContainer = $("#likes-" + forPost);
	var likeBody = '<img id="like-image" src="' + theUser.getPrimaryUser().imageURL + '" alt="' + theUser.getPrimaryUser().name + '" class="img-circle" />';
	
	if(likeContainer.html().toString().indexOf( theUser.getPrimaryUser().name ) === -1 && likeContainer.html().toString().indexOf( theUser.getPrimaryUser().imageURL ) === -1){
		if (theLike<4) {			
			likeContainer.prepend(likeBody);
			theUser.getRef().child("posts").child(forUser).child(forPost).child("likes").child(theUser.getPrimaryUser().uid).set(theUser.getPrimaryUser(),function(error){
				if(error === null){			
					showMessage({type:'success', title:'Yippy!', message: 'like sent successfully.'});
				} else {
					if (theLike<4) {
						likeContainer.replace(likeBody,'');				
					};
					like.text('+'+(theLike-1));
					showMessage({type:'danger', title:'Oops!', message: 'like was not sent.'});
				};
			});
		};
		like.text('+'+(theLike+1));
	};
	
};

function clickComment(event){
	var comment = $(event);
	//var theComment = like.text().replace('+','');
	var forPost = comment.data('post');
	var forUser = comment.data('uid');
	var commentBox = $("#comment-box-"+forPost);
	var commentContainer = $("#comments-container-"+forPost);
	var commentForm = $("#comment-form-"+forPost);
	var commentBody = '';
	var commentSetup = {}
	if (commentBox.val().trim() != '') {
		commentSetup.author = theUser.getPrimaryUser();
		commentSetup.comment = htmlEncode(commentBox.val().trim());
		var d = new Date();
		var month = (d.getMonth()+1), year = d.getFullYear(), day = (d.getDay()+1), hours = d.getHours(), minutes = d.getMinutes(), seconds = d.getSeconds(), milliseconds = d.getMilliseconds();
		var datetime = relative_time(month+"/"+day+"/"+year+"/"+" "+hours+":"+minutes+":"+seconds);
		commentSetup.time = datetime;

		commentBody += '<li>' +
	        '<div class="media">' +
	            '<a id="user-image" data-uid="' + commentSetup.author.uid + '" href="#" class="pull-left">' +
	                '<img src="' + commentSetup.author.imageURL + '" class="media-object">' +
	            '</a>' +
	            '<div class="media-body">' +
	                '<a id="user-name" data-uid="' + htmlDecode(commentSetup.author.uid) + '" href="#" class="comment-author">' + commentSetup.author.name + '</a>' +
	                '<span> ' + commentSetup.comment + '</span>' +
	                '<div class="comment-date">' + commentSetup.time + '</div>' +
	            '</div>' +
	        '</div>' +
	    '</li>';

	    $(commentBody).insertBefore(commentForm);
	    commentBox.val('');
		theUser.getRef().child("posts").child(forUser).child(forPost).child("comments").push(commentSetup ,function(error){
			if(error === null){
				showMessage({type:'success', title:'Yippy!', message: 'comment sent successfully.'});
			} else {
				commentContainer.replace(commentBody,'');
				showMessage({type:'danger', title:'Oops!', message: 'like was not sent.'});
			};
		});
	};
};

function getOnLoad(){
	return theUser.getLoading();
};

function setOnLoad(value){
	theUser.setLoading(value);
};

function showMessage(obj){
	$.notify(
	{
		title: '<strong> ' + obj.title + ' </strong>',
		message: obj.message
	}, 
	{ 
		type: obj.type,
		allow_dismiss: true
	});
};

function relative_time(date_str) {
    if (!date_str) {return;}
    date_str = $.trim(date_str);
    date_str = date_str.replace(/\.\d\d\d+/,""); // remove the milliseconds
    date_str = date_str.replace(/-/,"/").replace(/-/,"/"); //substitute - with /
    date_str = date_str.replace(/T/," ").replace(/Z/," UTC"); //remove T and substitute Z with UTC
    date_str = date_str.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // +08:00 -> +0800
    var parsed_date = new Date(date_str);
    var relative_to = (arguments.length > 1) ? arguments[1] : new Date(); //defines relative to what ..default is now
    var delta = parseInt((relative_to.getTime()-parsed_date)/1000);
    delta=(delta<2)?2:delta;
    var r = '';
    if (delta < 60) {
    r = delta + ' seconds ago';
    } else if(delta < 120) {
    r = 'a minute ago';
    } else if(delta < (45*60)) {
    r = (parseInt(delta / 60, 10)).toString() + ' minutes ago';
    } else if(delta < (2*60*60)) {
    r = 'an hour ago';
    } else if(delta < (24*60*60)) {
    r = '' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
    } else if(delta < (48*60*60)) {
    r = 'a day ago';
    } else {
    r = (parseInt(delta / 86400, 10)).toString() + ' days ago';
    }
    return '' + r;
};

function setPagePrimaryUser(primaryUser){
	
	$("#headermenu").html('<img src="' + primaryUser.imageURL + '" alt="' + primaryUser.name + '" class="img-circle" width="40" /> ' + primaryUser.name + ' <span class="caret"></span>');

};

function setPageSecondaryUser(secondaryUser){
	
	$(".profile").html('<img src="' + secondaryUser.imageURL + '" alt="people" class="img-circle" width="100" /> <h4>' + secondaryUser.name + '</h4>');

	//SET ABOUT BASED ON PROVIDER-------
	switch(secondaryUser.provider){
		case "facebook":
			$(".list-about").html(' <li><i class="fa fa-map-marker"></i> Lagos </li> <li><i class="fa fa-user"></i>' + secondaryUser.gender + '</li> <li><i class="fa fa-facebook"></i> <a href="' + secondaryUser.profileURL + '">/' + secondaryUser.name + '</a></li> ');
			break;
		case "twitter":
			$(".list-about").html(' <li><i class="fa fa-map-marker"></i> Lagos </li> <li><i class="fa fa-user"></i>@' + secondaryUser.username + '</li> <li><i class="fa fa-twitter"></i> <a href="' + secondaryUser.profileURL + '">/' + secondaryUser.username + '</a></li> ');
			break;
	};
	
};

