class MaskTest extends egret.DisplayObjectContainer{
	/**舞台背景 */
	private _bgInfo:egret.Shape;
	/**遮罩层 */
	private _shpBeMask:egret.Shape;
	/**展示的白鹭小鸟 */
    private _bird:egret.Bitmap;
	/**文本提示信息 */
    private _txInfo:egret.TextField;

	public constructor() {
		super();
        this.once( egret.Event.ADDED_TO_STAGE, this.onAddToStage, this );
	}

	private onAddToStage(event:egret.Event):void{
		///绘制整个舞台的背景为白底
		this._bgInfo = new egret.Shape();
        this.addChild( this._bgInfo);//放在最底层       
        this._bgInfo.graphics.clear();
        this._bgInfo.graphics.beginFill( 0xffffff );
        this._bgInfo.graphics.drawRect( 0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this._bgInfo.graphics.endFill();

		let imgLoader:egret.ImageLoader = new egret.ImageLoader();
        imgLoader.once( egret.Event.COMPLETE, this.imgLoadHandler, this);
        imgLoader.load( "resource/assets/bird.png" );
	}

	private imgLoadHandler(event:egret.Event):void{

		/// 用以被遮罩的形状
		this._shpBeMask = new egret.Shape();
        this._shpBeMask.graphics.lineStyle( 0x000000 )
        this._shpBeMask.graphics.beginFill( this.getRdmClr() );
        this._shpBeMask.graphics.drawEllipse( 0, 0, 200, 300 );
        this._shpBeMask.graphics.endFill();
        this._shpBeMask.x = ( this.stage.stageWidth - this._shpBeMask.width ) / 2;
        this._shpBeMask.y = ( this.stage.stageHeight - this._shpBeMask.height ) / 2;
        this.addChild( this._shpBeMask );

		let imgLoader:egret.ImageLoader = event.currentTarget;
		let imgData:egret.BitmapData = imgLoader.data;
		/// 展示用显示对象： 白鹭小鸟
		this._bird = new egret.Bitmap(imgData);
		this.addChild(this._bird);
		
		/// 为定位设置基准点(即锚点),设置为图像中间点
		this._bird.anchorOffsetX = this._bird.width * 0.5;
		this._bird.anchorOffsetY = this._bird.height * 0.5;
		/// 给一个随机的初始位置
        this._bird.x = this._bird.anchorOffsetX + ( this.stage.stageWidth - this._bird.anchorOffsetX * 2 ) * Math.random() ;
        this._bird.y = this._bird.anchorOffsetY + ( this.stage.stageHeight - this._bird.anchorOffsetY * 2 ) * Math.random() ;

		/// 提示信息
		this._txInfo = new egret.TextField();
        this.addChild( this._txInfo);

        this._txInfo.size = 30;        
        this._txInfo.width = this.stage.stageWidth - 100;
        this._txInfo.textAlign = egret.HorizontalAlign.CENTER;
        this._txInfo.textColor = 0x000000;
        this._txInfo.type = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.touchEnabled = true;
        this._txInfo.text = "接触屏幕后白鹭小鸟将变为椭圆形状的遮罩区域，可以移动手指（白鹭小鸟）并观察椭圆在遮罩下的显示变化";
		this._txInfo.x = (this.stage.stageWidth - this._txInfo.width)* 0.5;
        this._txInfo.y = 50;

		this.launchMask();
	}

	/**侦听点击开始事件 */
	private launchMask():void {
        this.stage.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this );
    }

	private touchHandler( evt:egret.TouchEvent ){
        switch ( evt.type ){
            case egret.TouchEvent.TOUCH_MOVE:
                this.updateBird( evt.stageX, evt.stageY );
                break;
            case egret.TouchEvent.TOUCH_BEGIN:
                this.stage.addEventListener( egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this );
                this.stage.once( egret.TouchEvent.TOUCH_END, this.touchHandler, this );

                /*** 本示例关键代码段开始 ***/
                this._shpBeMask.mask = this._bird;
                /*** 本示例关键代码段结束 ***/
                
                this.updateBird( evt.stageX, evt.stageY );
                break;
            case egret. TouchEvent.TOUCH_END:
                this.stage.removeEventListener( egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this );
                //this.stage.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this );
                
                this._shpBeMask.mask = null;
                this._bird.$maskedObject = null;
                break;
        }
    }

	/**小鸟同步手指位置 */
	private updateBird( stageX:number, stageY:number ):void {        
        this._bird.x = stageX;
        this._bird.y = stageY;

    }

	/**获取随机颜色 */
	private getRdmClr():number{
		 return ( Math.floor( Math.random() * 0xff ) << 16 )
            + ( Math.floor( Math.random() * 0xff ) << 8 )
            + Math.floor( Math.random() * 0xff ) ;
	}
}