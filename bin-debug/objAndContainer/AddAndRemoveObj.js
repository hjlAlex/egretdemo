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
var AddAndRemoveObj = (function (_super) {
    __extends(AddAndRemoveObj, _super);
    function AddAndRemoveObj() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    AddAndRemoveObj.prototype.onAddToStage = function (event) {
        var imgLoader = new egret.ImageLoader();
        imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
        imgLoader.load("resource/assets/bird.png");
    };
    AddAndRemoveObj.prototype.imgLoadHandler = function (event) {
        var _this = this;
        var halfWidth = this.stage.stageWidth * 0.5;
        var halfHeight = this.stage.stageHeight * 0.5;
        //先绘制整个舞台分成的4个部分
        //上左
        this._upLeft = new egret.Shape();
        this._upLeft.graphics.beginFill(0xf7acbc);
        this._upLeft.graphics.drawRect(0, 0, halfWidth, halfHeight);
        this._upLeft.graphics.endFill();
        this._upLeft.x = 0;
        this._upLeft.y = 0;
        this._upLeft.touchEnabled = true;
        this.addChild(this._upLeft);
        //上右
        this._upRight = new egret.Shape();
        this._upRight.graphics.beginFill(0xdeab8a);
        this._upRight.graphics.drawRect(0, 0, halfWidth, halfHeight);
        this._upRight.graphics.endFill();
        this._upRight.x = halfWidth;
        this._upRight.y = 0;
        this._upRight.touchEnabled = true;
        this.addChild(this._upRight);
        //下左
        this._downLeft = new egret.Shape();
        this._downLeft.graphics.beginFill(0xef5b9c);
        this._downLeft.graphics.drawRect(0, 0, halfWidth, halfHeight);
        this._downLeft.graphics.endFill();
        this._downLeft.x = 0;
        this._downLeft.y = halfHeight;
        this._downLeft.touchEnabled = true;
        this.addChild(this._downLeft);
        //下右
        this._downRight = new egret.Shape();
        this._downRight.graphics.beginFill(0xfedcbd);
        this._downRight.graphics.drawRect(0, 0, halfWidth, halfHeight);
        this._downRight.graphics.endFill();
        this._downRight.x = halfWidth;
        this._downRight.y = halfHeight;
        this._downRight.touchEnabled = true;
        this.addChild(this._downRight);
        /**初始化4个白鹭小鸟 */
        var imgLoader = event.currentTarget;
        var imgData = imgLoader.data;
        this._upLeftBird = new egret.Bitmap(imgData);
        this._upLeftBird.anchorOffsetX = this._upLeftBird.width * 0.5;
        this._upLeftBird.anchorOffsetY = this._upLeftBird.height * 0.5;
        this._upLeftBird.x = this._upLeft.x + this._upLeft.width * 0.5;
        this._upLeftBird.y = this._upLeft.y + this._upLeft.height * 0.5;
        this._upRightBird = new egret.Bitmap(imgData);
        this._upRightBird.anchorOffsetX = this._upRightBird.width * 0.5;
        this._upRightBird.anchorOffsetY = this._upRightBird.height * 0.5;
        this._upRightBird.x = this._upRight.x + this._upRight.width * 0.5;
        this._upRightBird.y = this._upRight.y + this._upRight.height * 0.5;
        this._downLeftBird = new egret.Bitmap(imgData);
        this._downLeftBird.anchorOffsetX = this._downLeftBird.width * 0.5;
        this._downLeftBird.anchorOffsetY = this._downLeftBird.height * 0.5;
        this._downLeftBird.x = this._downLeft.x + this._downLeft.width * 0.5;
        this._downLeftBird.y = this._downLeft.y + this._downLeft.height * 0.5;
        this._downRightBird = new egret.Bitmap(imgData);
        this._downRightBird.anchorOffsetX = this._downRightBird.width * 0.5;
        this._downRightBird.anchorOffsetY = this._downRightBird.height * 0.5;
        this._downRightBird.x = this._downRight.x + this._downRight.width * 0.5;
        this._downRightBird.y = this._downRight.y + this._downRight.height * 0.5;
        /*** 以下代码四个区域添加监听事件 ***/
        this._upLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            /*** 本示例关键代码段开始 ***/
            if (_this.contains(_this._upLeftBird)) {
                _this.removeChild(_this._upLeftBird);
            }
            else {
                _this.addChild(_this._upLeftBird);
            }
            /*** 本示例关键代码段结束 ***/
        }, this);
        this._upRight.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            /*** 本示例关键代码段开始 ***/
            if (_this.contains(_this._upRightBird)) {
                _this.removeChild(_this._upRightBird);
            }
            else {
                _this.addChild(_this._upRightBird);
            }
            /*** 本示例关键代码段结束 ***/
        }, this);
        this._downLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            /*** 本示例关键代码段开始 ***/
            if (_this.contains(_this._downLeftBird)) {
                _this.removeChild(_this._downLeftBird);
            }
            else {
                _this.addChild(_this._downLeftBird);
            }
            /*** 本示例关键代码段结束 ***/
        }, this);
        this._downRight.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            /*** 本示例关键代码段开始 ***/
            if (_this.contains(_this._downRightBird)) {
                _this.removeChild(_this._downRightBird);
            }
            else {
                _this.addChild(_this._downRightBird);
            }
            /*** 本示例关键代码段结束 ***/
        }, this);
        //信息文本
        this._txInfo = new egret.TextField();
        this._txInfo.size = 30;
        this._txInfo.textAlign = egret.HorizontalAlign.CENTER;
        this._txInfo.textColor = 0x843900;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.text = "点击不同色块";
        this._txInfo.x = (this.stage.stageWidth - this._txInfo.width) / 2;
        this._txInfo.y = 10;
        this.addChild(this._txInfo);
    };
    return AddAndRemoveObj;
}(egret.DisplayObjectContainer));
__reflect(AddAndRemoveObj.prototype, "AddAndRemoveObj");
//# sourceMappingURL=AddAndRemoveObj.js.map