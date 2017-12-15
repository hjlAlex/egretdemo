class BellsCurve extends egret.DisplayObjectContainer{

	/**舞台背景 */
	private _bgInfo:egret.Shape;

	/**文本提示信息 */
    private _txInfo:egret.TextField;

	///贝尔塞曲线
	private _shape:egret.Shape;

	///贝尔塞曲线的3个点
	private _startShape:egret.Shape;
    private _control:egret.Shape;
    private _anchor:egret.Shape;

	///当前拖动的点
	private drapShape:egret.Shape;

	public constructor() {
		super();
		this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}

	private onAddToStage(event:egret.Event):void{
		///绘制整个舞台的背景为白底
		this._bgInfo = new egret.Shape();             
        this._bgInfo.graphics.clear();
        this._bgInfo.graphics.beginFill( 0xffffff );
        this._bgInfo.graphics.drawRect( 0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this._bgInfo.graphics.endFill();
		this.addChild( this._bgInfo);//放在最底层  

		//信息提示文本
		this._txInfo = new egret.TextField();
		this._txInfo.text = "贝塞尔曲线(可以随时拖动3个点)";
		this._txInfo.size = 30;//文本字号大小	
		this._txInfo.x = (this.stage.stageWidth - this._txInfo.width)/2;	
		this._txInfo.y = 20;
		this._txInfo.type = egret.TextFieldType.DYNAMIC;
		this._txInfo.textAlign = egret.HorizontalAlign.CENTER;
		this._txInfo.textColor = 0x000000;
		this._txInfo.lineSpacing = 6;
		this._txInfo.multiline = true;
		this.addChild(this._txInfo);
		//示例主要代码相关
		this._shape = new egret.Shape();
        this.addChild(this._shape);
        
        this.init();
                
        this.initGraphics();
	}

	//初始化赋值
    private initGraphics(): void {
        //let shape: egret.Shape = this._shape;

        /*** 本示例关键代码段开始 ***/
        // shape.graphics.lineStyle(3, 0xff0ff0);
        // shape.graphics.moveTo(140, 400);
        // shape.graphics.curveTo(340, 200, 480, 500);
		this.resetCure();
        /*** 本示例关键代码段结束 ***/
    }

	private init():void{
		this._startShape = this.initShape(140, 400, 0xffff00);
        this._control = this.initShape(340, 200, 0xff0000);
        this._anchor = this.initShape(480, 500, 0x000ff0);
	}

	private initShape(x:number, y:number, color:number):egret.Shape {
        let shape:egret.Shape = new egret.Shape();
        shape.graphics.beginFill(color);
        shape.graphics.drawCircle(0, 0, 20);
        shape.graphics.endFill();        
        shape.x = x;
        shape.y = y;
        shape.touchEnabled = true;
        shape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);
		this.addChild(shape);
        return shape;
    }

	private onBeginHandler(event:egret.TouchEvent):void {
        event.stopImmediatePropagation();
        
        this.drapShape = <egret.Shape>event.currentTarget;
        this.drapShape.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);
        
        this.drapShape.touchEnabled = false;
        
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onEndHandler, this);
    }    
    
    private onMoveHandler(event:egret.TouchEvent):void {
        this.drapShape.x = event.stageX;
        this.drapShape.y = event.stageY;
        
        this.resetCure();
    }
    
    private onEndHandler(event:egret.TouchEvent):void {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEndHandler, this);
        
        this.drapShape.touchEnabled = true;
        
        this.drapShape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);
    }

	 private resetCure():void {
        let shape: egret.Shape = this._shape;
        /*** 本示例关键代码段开始 ***/
        shape.graphics.clear();
        shape.graphics.lineStyle(3, 0xff0ff0);
        shape.graphics.moveTo(this._startShape.x, this._startShape.y);
        shape.graphics.curveTo(this._control.x, this._control.y, this._anchor.x, this._anchor.y);
        /*** 本示例关键代码段结束 ***/
    }
}