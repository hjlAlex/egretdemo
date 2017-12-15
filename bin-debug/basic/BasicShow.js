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
var BasicShow = (function (_super) {
    __extends(BasicShow, _super);
    function BasicShow() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    BasicShow.prototype.onAddToStage = function (event) {
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
    BasicShow.prototype.imgLoadHandler = function (event) {
        var imgLoader = event.currentTarget;
        var imgData = imgLoader.data;
        /*** 本示例关键代码段开始 ***/
        /// 将已加载完成的图像显示出来
        var bird = new egret.Bitmap(imgData);
        this.addChild(bird);
        /*** 本示例关键代码段结束 ***/
        /// 为定位设置基准点(即锚点),设置为图像中间点
        bird.anchorOffsetX = bird.width * 0.5;
        bird.anchorOffsetY = bird.height * 0.5;
        /// 图像坐标为舞台正中央
        bird.x = this.stage.stageWidth * 0.5;
        bird.y = this.stage.stageHeight * 0.5;
        //设置文本提示信息
        /// 提示信息
        this._txInfo = new egret.TextField();
        this.addChild(this._txInfo);
        this._txInfo.text = "轻触屏幕调整显示对象位置";
        this._txInfo.size = 30; //文本字号大小
        this._txInfo.x = (this.stage.stageWidth - this._txInfo.width) * 0.5;
        this._txInfo.y = 50;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT; //文本水平对其方式
        this._txInfo.textColor = 0x000000;
        this._txInfo.type = egret.TextFieldType.DYNAMIC; //文本字段的类型。 以下 TextFieldType 常量中的任一个：TextFieldType.DYNAMIC（指定用户无法编辑的动态文本字段），或 TextFieldType.INPUT（指定用户可以编辑的输入文本字段）。
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (event) {
            bird.x = event.localX;
            bird.y = event.localY;
        }, this);
    };
    return BasicShow;
}(egret.DisplayObjectContainer));
__reflect(BasicShow.prototype, "BasicShow");
//# sourceMappingURL=BasicShow.js.map