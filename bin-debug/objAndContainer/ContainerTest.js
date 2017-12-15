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
var ContainerTest = (function (_super) {
    __extends(ContainerTest, _super);
    function ContainerTest() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    ContainerTest.prototype.onAddToStage = function (event) {
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
    ContainerTest.prototype.imgLoadHandler = function (event) {
        var _this = this;
        /*** 按钮生成代码 ***/
        this._leftBtn = new egret.TextField();
        this._leftBtn.size = 30;
        this._leftBtn.textAlign = egret.HorizontalAlign.CENTER;
        this._leftBtn.textColor = 0xffffff;
        this._leftBtn.background = true;
        this._leftBtn.backgroundColor = 0xd71345;
        this._leftBtn.text = "红色容器";
        this._leftBtn.x = (this.stage.stageWidth / 2 - this._leftBtn.width) / 2;
        this._leftBtn.y = 120;
        this._leftBtn.touchEnabled = true;
        this.addChild(this._leftBtn);
        this._rightBtn = new egret.TextField();
        this._rightBtn.size = 30;
        this._rightBtn.textAlign = egret.HorizontalAlign.CENTER;
        this._rightBtn.textColor = 0xffffff;
        this._rightBtn.background = true;
        this._rightBtn.backgroundColor = 0x102b6a;
        this._rightBtn.text = "蓝色容器";
        this._rightBtn.x = this.stage.stageWidth / 2 + (this.stage.stageWidth / 2 - this._rightBtn.width) / 2;
        this._rightBtn.y = 120;
        this._rightBtn.touchEnabled = true;
        this.addChild(this._rightBtn);
        /*** 以下代码使用实现两个容器 ***/
        this._leftContainer = new egret.Sprite();
        this.addChild(this._leftContainer);
        var leftCage = new egret.Shape();
        leftCage.graphics.lineStyle(10, 0xd71345, 1, true);
        leftCage.graphics.lineTo(0, 0);
        leftCage.graphics.lineTo(290, 0);
        leftCage.graphics.lineTo(290, 400);
        leftCage.graphics.lineTo(0, 400);
        leftCage.graphics.lineTo(0, 0);
        leftCage.graphics.endFill();
        this._leftContainer.addChild(leftCage);
        this._leftContainer.x = (this.stage.stageWidth / 2 - this._leftContainer.width) / 2;
        this._leftContainer.y = 200;
        this._rightContainer = new egret.Sprite();
        this.addChild(this._rightContainer);
        var rightCage = new egret.Shape();
        rightCage.graphics.lineStyle(10, 0x102b6a, 1, true);
        rightCage.graphics.lineTo(0, 0);
        rightCage.graphics.lineTo(290, 0);
        rightCage.graphics.lineTo(290, 400);
        rightCage.graphics.lineTo(0, 400);
        rightCage.graphics.lineTo(0, 0);
        rightCage.graphics.endFill();
        this._rightContainer.addChild(rightCage);
        this._rightContainer.x = this.stage.stageWidth / 2 + (this.stage.stageWidth / 2 - this._rightContainer.width) / 2;
        this._rightContainer.y = 200;
        /**初始化白鹭小鸟 */
        var imgLoader = event.currentTarget;
        var imgData = imgLoader.data;
        this._bird = new egret.Bitmap(imgData);
        this._bird.x = (this.stage.stageWidth - this._bird.width) / 2;
        this._bird.y = this.stage.stageHeight / 2 + 50;
        this.addChild(this._bird);
        this._bird.touchEnabled = false;
        /*** 以下代码两个按钮添加监听事件 ***/
        this._leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            /*** 本示例关键代码段开始 ***/
            if (_this.getChildIndex(_this._bird) != -1) {
                _this.removeChild(_this._bird);
                //先确定好this._bird的相对于父容器的坐标(后执行addChild方法)
                _this._bird.x = (_this._leftContainer.width - _this._bird.width) / 2;
                _this._bird.y = (_this._leftContainer.height - _this._bird.height) / 2;
                _this._leftContainer.addChild(_this._bird);
            }
            else if (_this._rightContainer.getChildIndex(_this._bird) != -1) {
                _this._rightContainer.removeChild(_this._bird);
                //先确定好this._bird的相对于父容器的坐标(后执行addChild方法)                
                _this._bird.x = (_this._leftContainer.width - _this._bird.width) / 2;
                _this._bird.y = (_this._leftContainer.height - _this._bird.height) / 2;
                _this._leftContainer.addChild(_this._bird);
            }
            _this._leftContainer.touchEnabled = true;
            _this._rightContainer.touchEnabled = false;
            /*** 本示例关键代码段结束 ***/
        }, this);
        /*** 以下代码两个按钮添加监听事件 ***/
        this._rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            /*** 本示例关键代码段开始 ***/
            if (_this.getChildIndex(_this._bird) != -1) {
                _this.removeChild(_this._bird);
                //先确定好this._bird的相对于父容器的坐标(后执行addChild方法)               
                _this._bird.x = (_this._rightContainer.width - _this._bird.width) / 2;
                _this._bird.y = (_this._rightContainer.height - _this._bird.height) / 2;
                _this._rightContainer.addChild(_this._bird);
            }
            else if (_this._leftContainer.getChildIndex(_this._bird) != -1) {
                _this._leftContainer.removeChild(_this._bird);
                //先确定好this._bird的相对于父容器的坐标(后执行addChild方法)
                _this._bird.x = (_this._rightContainer.width - _this._bird.width) / 2;
                _this._bird.y = (_this._rightContainer.height - _this._bird.height) / 2;
                _this._rightContainer.addChild(_this._bird);
            }
            _this._rightContainer.touchEnabled = true;
            _this._leftContainer.touchEnabled = false;
            /*** 本示例关键代码段结束 ***/
        }, this);
        /*** 对于两个容器添加拖动代码 ***/
        var leftDrag = false;
        var rightDrag = false;
        this._leftContainer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            leftDrag = true;
        }, this);
        this._leftContainer.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            leftDrag = false;
        }, this);
        this._rightContainer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            rightDrag = true;
        }, this);
        this._rightContainer.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            rightDrag = false;
        }, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (event) {
            if (leftDrag) {
                _this._leftContainer.x = event.stageX - _this._leftContainer.width * 0.5;
                _this._leftContainer.y = event.stageY - _this._leftContainer.height * 0.5;
            }
            if (rightDrag) {
                _this._rightContainer.x = event.stageX - _this._rightContainer.width * 0.5;
                _this._rightContainer.y = event.stageY - _this._rightContainer.height * 0.5;
            }
        }, this);
        /// 提示信息
        this._txInfo = new egret.TextField();
        this._txInfo.size = 30;
        this._txInfo.textAlign = egret.HorizontalAlign.CENTER;
        this._txInfo.textColor = 0x843900;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.text = "点击不同颜色按钮，将白鹭小鸟放到不同的容器中，拖动容器小鸟随着容器移动";
        this._txInfo.width = 550;
        this._txInfo.x = this.stage.stageWidth / 2 - this._txInfo.width / 2;
        this._txInfo.y = 10;
        this.addChild(this._txInfo);
    };
    return ContainerTest;
}(egret.DisplayObjectContainer));
__reflect(ContainerTest.prototype, "ContainerTest");
//# sourceMappingURL=ContainerTest.js.map