$(document).ready(function(){
		
		$("#rockButton").on({
			   mouseenter: function(){
			    $('#rockIcon').attr('src','images/rock-hover.png');
			  },
			  mouseleave: function(){
			    $('#rockIcon').attr('src','images/rock.png');
			  }
			  });
		
		$("#paperButton").on({
			   mouseenter: function(){
			    $('#paperIcon').attr('src','images/paper-hover.png');
			  },
			  mouseleave: function(){
			    $('#paperIcon').attr('src','images/paper.png');
			  }
			  });
		
		$("#scissorsButton").on({
			   mouseenter: function(){
			    $('#scissorsIcon').attr('src','images/scissors-hover.png');
			  },
			  mouseleave: function(){
			    $('#scissorsIcon').attr('src','images/scissors.png');
			  }
			  });
  
	});
