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
var DepthManage = (function (_super) {
    __extends(DepthManage, _super);
    function DepthManage() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    DepthManage.prototype.onAddToStage = function (event) {
        ///绘制整个舞台的背景为白底
        this._bgInfo = new egret.Shape();
        this.addChild(this._bgInfo); //放在最底层       
        this._bgInfo.graphics.clear();
        this._bgInfo.graphics.beginFill(0xffffff);
        this._bgInfo.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this._bgInfo.graphics.endFill();
        var imgLoader = new egret.ImageLoader();
        imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
        imgLoader.load("resource/assets/bird.png");
    };
    DepthManage.prototype.imgLoadHandler = function (event) {
        var _this = this;
        var imgLoader = event.currentTarget;
        var imgData = imgLoader.data;
        //中间的白鹭小鸟
        this._middleBird = new egret.Bitmap(imgData);
        this._middleBird.x = (this.stage.stageWidth - this._middleBird.width) / 2;
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
        this._rightBird.x = this.stage.stageWidth - this._leftBird.x - this._middleBird.width;
        this._rightBird.y = (this.stage.stageHeight - this._rightBird.height) / 2;
        this._rightBird.touchEnabled = true;
        this._rightBird.pixelHitTest = true;
        this.addChild(this._rightBird);
        /*** 以下代码三个按钮添加监听事件 ***/
        this._leftBird.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            /*** 本示例关键代码段开始 ***/
            _this.setChildIndex(_this._leftBird, _this.numChildren - 1);
            /*** 本示例关键代码段结束 ***/
        }, this);
        this._middleBird.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            /*** 本示例关键代码段开始 ***/
            _this.setChildIndex(_this._middleBird, _this.numChildren - 1);
            /*** 本示例关键代码段结束 ***/
        }, this);
        this._rightBird.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            /*** 本示例关键代码段开始 ***/
            _this.setChildIndex(_this._rightBird, _this.numChildren - 1);
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
        this._txInfo.x = this.stage.stageWidth / 2 - this._txInfo.width / 2;
        this._txInfo.y = 10;
        this.addChild(this._txInfo);
    };
    return DepthManage;
}(egret.DisplayObjectContainer));
__reflect(DepthManage.prototype, "DepthManage");
//# sourceMappingURL=DepthManage.js.map