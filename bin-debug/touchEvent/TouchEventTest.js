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
var TouchEventTest = (function (_super) {
    __extends(TouchEventTest, _super);
    function TouchEventTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    TouchEventTest.prototype.onAddToStage = function (event) {
        //添加显示文本
        this.drawText();
        //绘制一个透明度为1的绿色矩形，宽高为100*80
        var spr1 = new egret.Sprite();
        spr1.graphics.beginFill(0x00ff00, 1);
        spr1.graphics.drawRect(0, 0, 100, 80);
        spr1.graphics.endFill();
        spr1.width = 100;
        spr1.height = 80;
        this.addChild(spr1);
        //设置显示对象可以相应触摸事件
        spr1.touchEnabled = true;
        //注册事件
        spr1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        spr1.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        spr1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        //this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        //this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTaps, this,true);
    };
    TouchEventTest.prototype.onTouch = function (evt) {
        this.txt.text += "\n点击了spr1";
        console.log("onTouch...");
    };
    TouchEventTest.prototype.onBegin = function (evt) {
        console.log("onBegin...");
    };
    TouchEventTest.prototype.onEnd = function (evt) {
        console.log("onEnd...");
    };
    TouchEventTest.prototype.onTouchTap = function (evt) {
        this.txt.text += "\n容器冒泡侦听\n---------";
        console.log("onTouchTap容器冒泡侦听...");
    };
    TouchEventTest.prototype.onTouchTaps = function (evt) {
        this.txt.text += "\n容器捕获侦听";
        console.log("onTouchTaps容器捕获侦听...");
    };
    TouchEventTest.prototype.drawText = function () {
        this.txt = new egret.TextField();
        this.txt.size = 12;
        this.txt.x = 250;
        this.txt.width = 200;
        this.txt.height = 200;
        this.txt.text = "事件文字";
        this.addChild(this.txt);
    };
    return TouchEventTest;
}(egret.DisplayObjectContainer));
__reflect(TouchEventTest.prototype, "TouchEventTest");
//# sourceMappingURL=TouchEventTest.js.map