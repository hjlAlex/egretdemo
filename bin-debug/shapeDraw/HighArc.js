var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var HighArc = (function (_super) {
    __extends(HighArc, _super);
    function HighArc() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    HighArc.prototype.onAddToStage = function (event) {
        ///绘制整个舞台的背景为白底
        this._bgInfo = new egret.Shape();
        this._bgInfo.graphics.clear();
        this._bgInfo.graphics.beginFill(0xffffff);
        this._bgInfo.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this._bgInfo.graphics.endFill();
        //this.addChild( this._bgInfo);//放在最底层  
        //信息提示文本
        this._txInfo = new egret.TextField();
        this._txInfo.text = "本示例基于画弧api，实现圆形遮罩功能";
        this._txInfo.size = 30; //文本字号大小	
        this._txInfo.x = (this.stage.stageWidth - this._txInfo.width) / 2;
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
    };
    //初始化赋值
    HighArc.prototype.initGraphics = function () {
        var shape = this._shape = new egret.Shape();
        shape.x = this.stage.stageWidth / 2;
        shape.y = this.stage.stageHeight / 2;
        // shape.graphics.clear();     
        // shape.graphics.lineStyle( 0x000000 )
        // shape.graphics.beginFill( this.getRdmClr() );  
        // shape.graphics.drawCircle(0,0,50);
        // shape.graphics.endFill();
        this.addChild(shape);
        var bitmap = new egret.Bitmap();
        this.addChild(bitmap);
        bitmap.width = 228;
        bitmap.height = 380;
        bitmap.x = shape.x - bitmap.width / 2;
        bitmap.y = shape.y - bitmap.height / 2;
        bitmap.mask = shape;
        var loader = new egret.ImageLoader();
        loader.addEventListener(egret.Event.COMPLETE, function (e) {
            var bitmapData = loader.data;
            bitmap.bitmapData = bitmapData;
        }, this);
        loader.load("resource/assets/bird.png");
    };
    HighArc.prototype.changeGraphics = function () {
        var shape = this._shape;
        /*** 本示例关键代码段开始 ***/
        var angle = 0;
        var i = 1;
        egret.startTick(function (timeStamp) {
            changeGraphics(angle);
            angle += 1;
            if (angle >= 360) {
                angle = angle % 360;
                //i *= -1;
            }
            return false;
        }, this);
        function changeGraphics(angle) {
            shape.graphics.clear();
            shape.graphics.beginFill(0x00ffff, 1);
            shape.graphics.moveTo(0, 0);
            shape.graphics.lineTo(200, 0);
            shape.graphics.drawArc(0, 0, 200, 0, angle * Math.PI / 180, false);
            shape.graphics.lineTo(0, 0);
            shape.graphics.endFill();
        }
        /*** 本示例关键代码段结束 ***/
    };
    /**获取随机颜色 */
    HighArc.prototype.getRdmClr = function () {
        return (Math.floor(Math.random() * 0xff) << 16)
            + (Math.floor(Math.random() * 0xff) << 8)
            + Math.floor(Math.random() * 0xff);
    };
    return HighArc;
}(egret.DisplayObjectContainer));
__reflect(HighArc.prototype, "HighArc");
//# sourceMappingURL=HighArc.js.map