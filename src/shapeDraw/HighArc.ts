class HighArc extends egret.DisplayObjectContainer{

	/**舞台背景 */
	private _bgInfo:egret.Shape;

	/**文本提示信息 */
    private _txInfo:egret.TextField;

	private _shape: egret.Shape;

	public constructor() {
		super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(event: egret.Event):void {   
		///绘制整个舞台的背景为白底
		this._bgInfo = new egret.Shape();             
        this._bgInfo.graphics.clear();
        this._bgInfo.graphics.beginFill( 0xffffff );
        this._bgInfo.graphics.drawRect( 0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this._bgInfo.graphics.endFill();
		//this.addChild( this._bgInfo);//放在最底层  

		//信息提示文本
		this._txInfo = new egret.TextField();
		this._txInfo.text = "本示例基于画弧api，实现圆形遮罩功能";
		this._txInfo.size = 30;//文本字号大小	
		this._txInfo.x = (this.stage.stageWidth - this._txInfo.width)/2;	
		this._txInfo.y = 20;
		this._txInfo.type = egret.TextFieldType.DYNAMIC;
		this._txInfo.textAlign = egret.HorizontalAlign.CENTER;
		this._txInfo.textColor = 0x000000;
		this._txInfo.lineSpacing = 6;
		this._txInfo.multiline = true;
		//this.addChild(this._txInfo);
		//本示例相关代码     
        this.initGraphics();

        this.changeGraphics();

    }

	//初始化赋值
    private initGraphics(): void {
        let shape: egret.Shape = this._shape = new egret.Shape();
        shape.x = this.stage.stageWidth / 2;
        shape.y = this.stage.stageHeight / 2;
		// shape.graphics.clear();     
		// shape.graphics.lineStyle( 0x000000 )
        // shape.graphics.beginFill( this.getRdmClr() );  
		// shape.graphics.drawCircle(0,0,50);
		// shape.graphics.endFill();
        this.addChild(shape);
        
        let bitmap:egret.Bitmap = new egret.Bitmap();
        this.addChild(bitmap);
        bitmap.width = 228;
        bitmap.height = 380;
        bitmap.x = shape.x - bitmap.width / 2;
        bitmap.y = shape.y - bitmap.height / 2;
        
        bitmap.mask = shape;
        
        let loader:egret.ImageLoader = new egret.ImageLoader();
        loader.addEventListener(egret.Event.COMPLETE, function (e:egret.Event) {
            let bitmapData:egret.BitmapData = loader.data;            
            bitmap.bitmapData = bitmapData;
        }, this);
        
        loader.load( "resource/assets/bird.png" );
    }

	private changeGraphics(): void {
        let shape: egret.Shape = this._shape;
        
        /*** 本示例关键代码段开始 ***/
        let angle:number = 0;
        let i:number = 1;
        egret.startTick(function (timeStamp:number):boolean {
            changeGraphics(angle);
            angle += 1;
            if (angle >= 360) {
                angle = angle % 360;
                //i *= -1;
            }
            return false;
        }, this);

        function changeGraphics(angle:number):void {
            shape.graphics.clear();			
            shape.graphics.beginFill(0x00ffff,1);
            shape.graphics.moveTo(0, 0);
            shape.graphics.lineTo(200, 0);
            shape.graphics.drawArc(0, 0, 200, 0, angle * Math.PI / 180, false);
            shape.graphics.lineTo(0, 0);
            shape.graphics.endFill();
        }
        /*** 本示例关键代码段结束 ***/
    }

	/**获取随机颜色 */
	private getRdmClr():number{
		 return ( Math.floor( Math.random() * 0xff ) << 16 )
            + ( Math.floor( Math.random() * 0xff ) << 8 )
            + Math.floor( Math.random() * 0xff ) ;
	}
}