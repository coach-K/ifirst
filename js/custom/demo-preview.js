(function( $, window, undefined ) {
  $.danidemo = $.extend( {}, {
    
    addLog: function(id, status, str){
      var d = new Date();
      var li = $('<li />', {'class': 'demo-' + status});
       
      var message = '[' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '] ';
      
      message += str;
     
      li.html(message);
      
      $(id).prepend(li);
    },
    
    addFile: function(id, i, file){
		var template = '<div style="display: inline-block" id="demo-file' + i + '">' +
		                   '<img src="http://placehold.it/48.png" class="demo-image-preview" width="100" />' +
		                   '<div class="progress progress-striped active" style="width: 100px; height:5px;">'+
		                       '<div class="progress-bar" role="progressbar" style="width: 0%;">'+
		                           '<span class="sr-only">0% Complete</span>'+
		                       '</div>'+
		                   '</div>'+
		               '</div>';
		               
		var i = $(id).attr('file-counter');
		if (!i){
			$(id).empty();
			
			i = 0;
		}
		
		i++;
		
		$(id).attr('file-counter', i);
		
		$(id).prepend(template);
	},
	
	updateFileStatus: function(i, status, message){
		$('#demo-file' + i).find('span.demo-file-status').html(message).addClass('demo-file-status-' + status);
	},
	
	updateFileProgress: function(i, percent){
		$('#demo-file' + i).find('div.progress-bar').width(percent);
		
		$('#demo-file' + i).find('span.sr-only').html(percent + ' Complete');
	},
	
	humanizeSize: function(size) {
      var i = Math.floor( Math.log(size) / Math.log(1024) );
      return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    }

  }, $.danidemo);
})(jQuery, this);

