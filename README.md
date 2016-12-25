# CanvasUtil.js
###캔버스에 간단하게 이동/확대/축소를 적용 시킵니다.

###사용방법

####1.CanvasUtil.js 불러오기
```html
<script type="text/javascript" src="CanvasUtil.js"></script>
```

####2.캔버스 정의
```javascript
var canvas = document.getElementById( "canvas" );
CanvasUtil.setCanvas( canvas );
```

####3.그리기
```javascript
CanvasUtil.draw(function( canvas, ctx ){
	
	// 첫번째 함수는 transform(이동,확대,축소)을 적용합니다.
	
	ctx.fillRect( 0,0, 200,200 );
	
	//...
	
}, function( canvas, ctx ){

	// 두번째 함수는 transform(이동,확대,축소)을 적용하지 않습니다.
	
	ctx.fillRect( 0,0, 200,200 );

	//...

});
```

####4.이동
```javascript
CanvasUtil.move( 50, 100 );
```

####5.확대
```javascript
CanvasUtil.scaleUp();
```

####6.축소
```javascript
CanvasUtil.scaleDown();
```
####7.ETC
```javascript
//현재 적용된 배율값을 전달합니다.
CanvasUtil.getScale();

//적용되었던 transform을 초기화합니다.
CanvasUtil.initTransform();
```

<br><br>
####Sample - https://zzinpan.github.io/CanvasUtil.js/sample/main.html
<br><br>



