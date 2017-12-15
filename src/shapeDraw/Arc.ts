class Arc extends egret.DisplayObjectContainer{

	/**舞台背景 */
	private _bgInfo:egret.Shape;

	/**文本提示信息 */
    private _txInfo:egret.TextField;

	private _count:number = 0;

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
		this.addChild( this._bgInfo);//放在最底层  

		//信息提示文本
		this._txInfo = new egret.TextField();
		this._txInfo.text = "轻触屏幕出现不同的花瓣形状";
		this._txInfo.size = 30;//文本字号大小	
		this._txInfo.x = (this.stage.stageWidth - this._txInfo.width)/2;	
		this._txInfo.y = 20;
		this._txInfo.type = egret.TextFieldType.DYNAMIC;
		this._txInfo.textAlign = egret.HorizontalAlign.CENTER;
		this._txInfo.textColor = 0x000000;
		this._txInfo.lineSpacing = 6;
		this._txInfo.multiline = true;
		this.addChild(this._txInfo);
		//本示例相关代码     
        // this.drawFl();
        // this.changeGraphics();
		let dot = new egret.Shape();	
		dot.graphics.clear();
        dot.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));	
		dot.graphics.drawCircle(this.stage.stageWidth / 2,this.stage.stageHeight / 2,5);
		this.addChild(dot);
		let shape  = new egret.Shape();
		let x = this.stage.stageWidth / 2;
        let y = this.stage.stageHeight / 2;
		shape.graphics.clear();
        shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
		shape.graphics.drawArc(x,y,50,0,Math.PI,true);
		this.addChild(shape);

    }

	//轻触修改属性
    private changeGraphics(): void {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent) {
            this.drawFl();
        }, this);
    }

	private drawFl():void {
        this.removeChildren();//移除当前实例下所有子对象
		//移除当前实例下所有子对象(只保留舞台背景和文本提示信息)
		// for (let i:number = this.numChildren - 1; i > 1; i--) {
		// 	this.removeChildAt(i);
		// }
        
        let nums:Array<number> = [18, 15, 12, 10, 9, 6, 5, 4, 3];
        let num:number = nums[this._count++];
		console.debug("num:"+num);
        this._count %= nums.length;
		console.debug("this._count:"+this._count);
        let singleAng:number = 180 / num;
		console.debug("singleAng:"+singleAng);
        
        let r1 = 150;
		console.debug("r1:"+r1);
        let r2 = r1 * Math.sin(singleAng * Math.PI / 180);
		console.debug("r2:"+r2);
        let r3 = r1 * Math.cos(singleAng * Math.PI / 180);
		console.debug("r3:"+r3);
        
        for (let i:number = 0; i < num; i++) {
            let shape  = new egret.Shape();
            this.addChild(shape);
            shape.x = this.stage.stageWidth / 2;
            shape.y = this.stage.stageHeight / 2;			
            
            shape.graphics.clear();
            shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
            
            let ang = -singleAng / 2 + i * 2 * singleAng;
			console.debug(i+":"+ang);
			console.debug(i+":x->"+r3 * Math.cos(ang * Math.PI / 180)+",y->"+r3 * Math.sin(ang * Math.PI / 180)+",r->"+r2+",start->"+(ang + 90) * Math.PI / 180+",end->"+(ang - 90) * Math.PI / 180);
            shape.graphics.drawArc(r3 * Math.cos(ang * Math.PI / 180), 
                r3 * Math.sin(ang * Math.PI / 180), r2, (ang + 90) * Math.PI / 180, (ang - 90) * Math.PI / 180, true);
			break;
        }
    }
}