(function(){
	
	/****************************************************************
	 * 접근 제한 변수 
	 ****************************************************************/
	var canvas		= null,
		ctx			= null,
		scale		= 1,
		x			= 0,
		y			= 0,
		userDrawFunc	= null;
	
	
	
	/****************************************************************
	 * 접근 제한 메서드
	 ****************************************************************/
	function draw(){
		if( typeof userDrawFunc !== "function" ){
			return;
		}
		ctx.save();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.translate(-canvas.width/2 *scale, -canvas.height/2 *scale);
		ctx.scale( scale, scale );
		ctx.translate( canvas.width/2 /scale +x, canvas.height/2 /scale +y);
		userDrawFunc( canvas, ctx );
		ctx.restore();
	}
	
	function scaleUp(){
		scale++;
	}
	
	function scaleDown(){
		if( scale < 2 ){
			return;
		}
		scale--;
	}
	
	function move( distX, distY ){
		if( typeof userDrawFunc !== "function" ){
			return;
		}
		x = (x + distX/scale);
		y = (y + distY/scale);
	}
	
	
	
	/****************************************************************
	 * 접근 메서드
	 ****************************************************************/
	if( typeof window.CanvasUtil !== "undefined" ){
		throw "window.CanvasUtil이 이미 정의 되어있습니다.";
	}
	
	window.CanvasUtil = {
		setCanvas: function( _canvas ){
			canvas	= _canvas;
			ctx 	= canvas.getContext("2d");
		},
		draw: function( _userDrawFunc ){
			userDrawFunc = _userDrawFunc;
			if( typeof userDrawFunc === "function" ){
				userDrawFunc( canvas, ctx );
			}
		},
		scaleUp: function(){
			scaleUp();
			draw();
		},
		scaleDown: function(){
			scaleDown();
			draw();
		},
		move: function( distX, distY ){
			move( distX, distY );
			draw();
		}
	};
	
})();