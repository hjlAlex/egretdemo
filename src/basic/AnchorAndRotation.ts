/**
 * 锚点是对显示对象进行操作的重要概念，切水果游戏中的水果旋转，是围绕其中心
 * 点旋转的。这个中心点就是我们所谓的锚点。
 * 锚点设置了一个基准点或者说中心点。显示对象的旋转和缩放均以锚点为基准。
 */
class AnchorAndRotation extends egret.DisplayObjectContainer{

	//舞台背景
    private _bgInfo:egret.Shape;

	//文本提示信息
	private _txInfo:egret.TextField;	

	///变化的小鸟
	private _bird:egret.Bitmap;

	/// 用于记录当前的模式，模式切换通过触摸舞台触发
    private _iAnimMode:number;
    private _nScaleBase:number;

	/// 旋转及缩放步长设定
    private static STEP_ROT:number = 3;
    private static STEP_SCALE:number = .03;

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
		this._bird = new egret.Bitmap(imgData); 		
        this.addChild(this._bird);
		/// 为定位设置基准点(即锚点),设置为图像中间点
		this._bird.anchorOffsetX = this._bird.width * 0.5;
		this._bird.anchorOffsetY = this._bird.height * 0.5;
		/// 图像坐标为舞台正中央
		this._bird.x = this.stage.stageWidth * 0.5;
        this._bird.y = this.stage.stageHeight * 0.5;

		//设置文本提示信息
		/// 提示信息
		this._txInfo = new egret.TextField();
        this.addChild( this._txInfo );		
        this._txInfo.size = 30;//文本字号大小		
		this._txInfo.y = 50;
		this._txInfo.textAlign = egret.HorizontalAlign.CENTER;//文本水平对其方式
		this._txInfo.textColor = 0x000000;
		this._txInfo.type = egret.TextFieldType.DYNAMIC;//文本字段的类型。 以下 TextFieldType 常量中的任一个：TextFieldType.DYNAMIC（指定用户无法编辑的动态文本字段），或 TextFieldType.INPUT（指定用户可以编辑的输入文本字段）。
		this._txInfo.lineSpacing = 6;
		this._txInfo.multiline = true;	

		this.launchAnimations();
	}

	private launchAnimations():void {
        
        this._iAnimMode = AnimModes.ANIM_ROT;
        this.stage.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            this._iAnimMode = ( this._iAnimMode + 1 ) % 3;
        }, this );

        this._nScaleBase = 0;
        
        /// 根据当前模式调整旋转度数或缩放正弦基数形成相应动画
        this.addEventListener( egret.Event.ENTER_FRAME, ( event:egret.Event )=>{

            /*** 本示例关键代码段开始 ***/
            switch ( this._iAnimMode ){
                case AnimModes.ANIM_ROT:        /// 仅旋转
                    this._bird.rotation += AnchorAndRotation.STEP_ROT;
                    break;
                case AnimModes.ANIM_SCALE:        /// 仅缩放，缩放范围 0.5~1
                    this._bird.scaleX = this._bird.scaleY = 0.5 + 0.5 * Math.abs( Math.sin( this._nScaleBase += AnchorAndRotation.STEP_SCALE ) );
                    break;
            }
            /*** 本示例关键代码段结束 ***/

            this._txInfo.text = 
                  "旋转角度:" + this._bird.rotation 
                +"\n缩放比例:" + this._bird.scaleX.toFixed(2)
                +"\n\n轻触进入" +(["缩放","静止","旋转"][this._iAnimMode])+ "模式";
			this._txInfo.x = (this.stage.stageWidth - this._txInfo.width)*0.5;
            return false;  /// 友情提示： startTick 中回调返回值表示执行结束是否立即重绘
        }, this );
    }
}

class AnimModes{
    public static ANIM_ROT:number = 0;
    public static ANIM_SCALE:number = 1;
}