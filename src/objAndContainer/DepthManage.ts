class DepthManage extends egret.DisplayObjectContainer{

	/**舞台背景 */
	private _bgInfo:egret.Shape;	
	/**左边的白鹭小鸟 */
    private _leftBird:egret.Bitmap;
	/**中间的白鹭小鸟 */
    private _middleBird:egret.Bitmap;
	/**右边的白鹭小鸟 */
    private _rightBird:egret.Bitmap;
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
		let imgLoader:egret.ImageLoader = event.currentTarget;
		let imgData:egret.BitmapData = imgLoader.data;
		//中间的白鹭小鸟
		this._middleBird = new egret.Bitmap(imgData);		
		this._middleBird.x = (this.stage.stageWidth -  this._middleBird.width)/ 2;
		this._middleBird.y = (this.stage.stageHeight - this._middleBird.height) / 2;
		this._middleBird.pixelHitTest = true;
		this._middleBird.touchEnabled = true;
		this.addChild(this._middleBird);

		//左边的白鹭小鸟
		this._leftBird = new egret.Bitmap(imgData);		
		this._leftBird.x = 50;
        this._leftBird.y = (this.stage.stageHeight - this._leftBird.height) / 2;
		this._leftBird.pixelHitTest = true;
		this._leftBird.touchEnabled = true;
		this.addChild(this._leftBird);

		//右边的白鹭小鸟
		this._rightBird = new egret.Bitmap(imgData);		
		this._rightBird.x = this.stage.stageWidth  - this._leftBird.x - this._middleBird.width;
        this._rightBird.y = (this.stage.stageHeight - this._rightBird.height) / 2;
		this._rightBird.touchEnabled = true;
		this._rightBird.pixelHitTest = true;
		this.addChild(this._rightBird);

		/*** 以下代码三个按钮添加监听事件 ***/
        this._leftBird.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            /*** 本示例关键代码段开始 ***/
            this.setChildIndex(this._leftBird, this.numChildren - 1);
            /*** 本示例关键代码段结束 ***/
        }, this );      
        
        this._middleBird.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            /*** 本示例关键代码段开始 ***/
            this.setChildIndex(this._middleBird, this.numChildren - 1);
            /*** 本示例关键代码段结束 ***/
        }, this );      
        
        this._rightBird.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            /*** 本示例关键代码段开始 ***/
            this.setChildIndex(this._rightBird, this.numChildren - 1);
            /*** 本示例关键代码段结束 ***/
        }, this); 

        /// 提示信息
		this._txInfo = new egret.TextField();
        this._txInfo.size = 30;
        this._txInfo.textAlign = egret.HorizontalAlign.CENTER;
        this._txInfo.textColor = 0x843900;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.text = "点击不同白鹭小鸟提升到最上层";
        this._txInfo.x = this.stage.stageWidth/2 - this._txInfo.width/2;
        this._txInfo.y = 10;
        this.addChild( this._txInfo );


	}
}