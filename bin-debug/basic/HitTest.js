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
var HitTest = (function (_super) {
    __extends(HitTest, _super);
    function HitTest() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    HitTest.prototype.onAddToStage = function (event) {
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
    HitTest.prototype.imgLoadHandler = function (event) {
        var _this = this;
        var imgLoader = event.currentTarget;
        var imgData = imgLoader.data;
        /// 展示用显示对象： 白鹭小鸟
        this._bird = new egret.Bitmap(imgData);
        this.addChild(this._bird);
        /// 为定位设置基准点(即锚点),设置为图像中间点
        this._bird.anchorOffsetX = this._bird.width * 0.5;
        this._bird.anchorOffsetY = this._bird.height * 0.5;
        /// 图像坐标为舞台正中央
        this._bird.x = this.stage.stageWidth * 0.5;
        this._bird.y = this.stage.stageHeight * 0.5;
        /// 小圆点，用以提示用户按下位置
        this._dot = new egret.Shape();
        this._dot.graphics.beginFill(0x00ff00);
        this._dot.graphics.drawCircle(0, 0, 5);
        this._dot.graphics.endFill();
        /// 提示信息
        this._txInfo = new egret.TextField;
        this.addChild(this._txInfo);
        this._txInfo.size = 30;
        this._txInfo.y = 50;
        this._txInfo.textAlign = egret.HorizontalAlign.CENTER;
        this._txInfo.textColor = 0x000000;
        this._txInfo.type = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.touchEnabled = true;
        this._txInfo.touchEnabled = true;
        this._txInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            evt.stopImmediatePropagation(); //停止事件流传播
            _this._bShapeTest = !_this._bShapeTest;
            _this.updateInfo(TouchCollideStatus.NO_TOUCHED);
        }, this);
        this.launchCollisionTest();
    };
    HitTest.prototype.launchCollisionTest = function () {
        ///默认是没触摸并且是矩阵检测 
        this._iTouchCollideStatus = TouchCollideStatus.NO_TOUCHED;
        this._bShapeTest = false;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
        this.updateInfo(TouchCollideStatus.NO_TOUCHED);
    };
    HitTest.prototype.touchHandler = function (event) {
        console.log("event.type:" + event.type);
        switch (event.type) {
            case egret.TouchEvent.TOUCH_MOVE:
                this.checkCollision(event.stageX, event.stageY);
                break;
            case egret.TouchEvent.TOUCH_BEGIN:
                if (!this._txInfo.hitTestPoint(event.stageX, event.stageY)) {
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
                    this.stage.once(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                    this.addChild(this._dot);
                    this.checkCollision(event.stageX, event.stageY);
                }
                break;
            case egret.TouchEvent.TOUCH_END:
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
                //this.stage.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this );				
                if (this._dot.parent) {
                    this._dot.parent.removeChild(this._dot);
                }
                this.updateInfo(TouchCollideStatus.NO_TOUCHED);
                break;
        }
    };
    HitTest.prototype.checkCollision = function (stageX, stageY) {
        /*** 本示例关键代码段开始 ***/
        var bResult = this._bird.hitTestPoint(stageX, stageY, this._bShapeTest);
        /*** 本示例关键代码段结束 ***/
        /// 小圆点同步手指位置
        this._dot.x = stageX;
        this._dot.y = stageY;
        /// 文字信息更新
        this.updateInfo(bResult ? TouchCollideStatus.COLLIDED : TouchCollideStatus.TOUCHED_NO_COLLIDED);
    };
    HitTest.prototype.updateInfo = function (iStatus) {
        this._txInfo.text =
            "碰撞检测结果：" + (["放上手指！", "想摸我？", "别摸我！！！"][iStatus])
                + "\n\n碰撞检测模式：" + (this._bShapeTest ? "非透明像素区域" : "矩形包围盒")
                + "\n（轻触文字区切换）";
        this._txInfo.x = (this.stage.stageWidth - this._txInfo.width) * 0.5;
    };
    return HitTest;
}(egret.DisplayObjectContainer));
__reflect(HitTest.prototype, "HitTest");
var TouchCollideStatus = (function () {
    function TouchCollideStatus() {
    }
    TouchCollideStatus.NO_TOUCHED = 0;
    TouchCollideStatus.TOUCHED_NO_COLLIDED = 1;
    TouchCollideStatus.COLLIDED = 2;
    return TouchCollideStatus;
}());
__reflect(TouchCollideStatus.prototype, "TouchCollideStatus");
//# sourceMappingURL=HitTest.js.map