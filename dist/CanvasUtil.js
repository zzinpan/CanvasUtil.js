(function(){
	
	/****************************************************************
	 * 접근 제한 변수 
	 ****************************************************************/
	var canvas						= null,	//적용캔버스
		ctx							= null,	//캔버스 컨텍스트
		scale						= 1,	//확대 배율
		x							= 0,	//그리는 시작점X
		y							= 0,	//그리는 시작점Y
		userDrawFunc				= null;	//사용자 변형적용 그리기 함수
		userDrawFuncNoTransform		= null;	//사용자 변형미적용 그리기 함수
	
	
	
	/****************************************************************
	 * 접근 제한 메서드
	 ****************************************************************/
		
	//변형적용 그리기
	function transformDraw(){
		if( typeof userDrawFunc !== "function" ){
			return;
		}
		ctx.save();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.translate(-canvas.width/2 *scale, -canvas.height/2 *scale);
		ctx.scale( scale, scale );
		ctx.translate( canvas.width/2 /scale +x, canvas.height/2 /scale +y);
		userDrawFunc( ctx );
		ctx.restore();
	}
	
	//변형 미적용 그리기
	function noTransformDraw(){
		if( typeof userDrawFuncNoTransform !== "function" ){
			return;
		}
		ctx.save();
		userDrawFuncNoTransform( ctx );
		ctx.restore();
	}
	
	//모두 그리기
	function drawAll(){
		transformDraw();
		noTransformDraw();
	}
	
	//확대
	function scaleUp(){
		scale += scale/10;
	}
	
	//축소
	function scaleDown(){
		scale -= scale/10;
	}
	
	function getScale(){
		return scale;
	}
	
	//이동
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
		
		//캔버스를 선언
		setCanvas: function( _canvas ){
			canvas	= _canvas;
			ctx 	= canvas.getContext("2d");
		},
		
		//사용자 그리기 함수 등록
		draw: function( _userDrawFunc, _userDrawFuncNoTransform ){
			userDrawFunc = _userDrawFunc;
			userDrawFuncNoTransform = _userDrawFuncNoTransform;
			drawAll();
		},
		
		//사용자에게 현재 스케일 값 전달
		getScale: getScale,
		
		//확대
		scaleUp: function(){
			scaleUp();
			drawAll();
		},
		
		//축소
		scaleDown: function(){
			scaleDown();
			drawAll();
		},
		
		//이동
		move: function( distX, distY ){
			move( distX, distY );
			drawAll();
		}
		
	};
	
})();