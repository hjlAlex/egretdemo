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
var BellsCurve = (function (_super) {
    __extends(BellsCurve, _super);
    function BellsCurve() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    BellsCurve.prototype.onAddToStage = function (event) {
        ///绘制整个舞台的背景为白底
        this._bgInfo = new egret.Shape();
        this._bgInfo.graphics.clear();
        this._bgInfo.graphics.beginFill(0xffffff);
        this._bgInfo.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this._bgInfo.graphics.endFill();
        this.addChild(this._bgInfo); //放在最底层  
        //信息提示文本
        this._txInfo = new egret.TextField();
        this._txInfo.text = "贝塞尔曲线(可以随时拖动3个点)";
        this._txInfo.size = 30; //文本字号大小	
        this._txInfo.x = (this.stage.stageWidth - this._txInfo.width) / 2;
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
    };
    //初始化赋值
    BellsCurve.prototype.initGraphics = function () {
        //let shape: egret.Shape = this._shape;
        /*** 本示例关键代码段开始 ***/
        // shape.graphics.lineStyle(3, 0xff0ff0);
        // shape.graphics.moveTo(140, 400);
        // shape.graphics.curveTo(340, 200, 480, 500);
        this.resetCure();
        /*** 本示例关键代码段结束 ***/
    };
    BellsCurve.prototype.init = function () {
        this._startShape = this.initShape(140, 400, 0xffff00);
        this._control = this.initShape(340, 200, 0xff0000);
        this._anchor = this.initShape(480, 500, 0x000ff0);
    };
    BellsCurve.prototype.initShape = function (x, y, color) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(color);
        shape.graphics.drawCircle(0, 0, 20);
        shape.graphics.endFill();
        shape.x = x;
        shape.y = y;
        shape.touchEnabled = true;
        shape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);
        this.addChild(shape);
        return shape;
    };
    BellsCurve.prototype.onBeginHandler = function (event) {
        event.stopImmediatePropagation();
        this.drapShape = event.currentTarget;
        this.drapShape.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);
        this.drapShape.touchEnabled = false;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onEndHandler, this);
    };
    BellsCurve.prototype.onMoveHandler = function (event) {
        this.drapShape.x = event.stageX;
        this.drapShape.y = event.stageY;
        this.resetCure();
    };
    BellsCurve.prototype.onEndHandler = function (event) {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEndHandler, this);
        this.drapShape.touchEnabled = true;
        this.drapShape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);
    };
    BellsCurve.prototype.resetCure = function () {
        var shape = this._shape;
        /*** 本示例关键代码段开始 ***/
        shape.graphics.clear();
        shape.graphics.lineStyle(3, 0xff0ff0);
        shape.graphics.moveTo(this._startShape.x, this._startShape.y);
        shape.graphics.curveTo(this._control.x, this._control.y, this._anchor.x, this._anchor.y);
        /*** 本示例关键代码段结束 ***/
    };
    return BellsCurve;
}(egret.DisplayObjectContainer));
__reflect(BellsCurve.prototype, "BellsCurve");
//# sourceMappingURL=BellsCurve.js.map