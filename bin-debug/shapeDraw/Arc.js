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
var Arc = (function (_super) {
    __extends(Arc, _super);
    function Arc() {
        var _this = _super.call(this) || this;
        _this._count = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Arc.prototype.onAddToStage = function (event) {
        ///绘制整个舞台的背景为白底
        this._bgInfo = new egret.Shape();
        this._bgInfo.graphics.clear();
        this._bgInfo.graphics.beginFill(0xffffff);
        this._bgInfo.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this._bgInfo.graphics.endFill();
        this.addChild(this._bgInfo); //放在最底层  
        //信息提示文本
        this._txInfo = new egret.TextField();
        this._txInfo.text = "轻触屏幕出现不同的花瓣形状";
        this._txInfo.size = 30; //文本字号大小	
        this._txInfo.x = (this.stage.stageWidth - this._txInfo.width) / 2;
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
        var dot = new egret.Shape();
        dot.graphics.clear();
        dot.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
        dot.graphics.drawCircle(this.stage.stageWidth / 2, this.stage.stageHeight / 2, 5);
        this.addChild(dot);
        var shape = new egret.Shape();
        var x = this.stage.stageWidth / 2;
        var y = this.stage.stageHeight / 2;
        shape.graphics.clear();
        shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
        shape.graphics.drawArc(x, y, 50, 0, Math.PI, true);
        this.addChild(shape);
    };
    //轻触修改属性
    Arc.prototype.changeGraphics = function () {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            this.drawFl();
        }, this);
    };
    Arc.prototype.drawFl = function () {
        this.removeChildren(); //移除当前实例下所有子对象
        //移除当前实例下所有子对象(只保留舞台背景和文本提示信息)
        // for (let i:number = this.numChildren - 1; i > 1; i--) {
        // 	this.removeChildAt(i);
        // }
        var nums = [18, 15, 12, 10, 9, 6, 5, 4, 3];
        var num = nums[this._count++];
        console.debug("num:" + num);
        this._count %= nums.length;
        console.debug("this._count:" + this._count);
        var singleAng = 180 / num;
        console.debug("singleAng:" + singleAng);
        var r1 = 150;
        console.debug("r1:" + r1);
        var r2 = r1 * Math.sin(singleAng * Math.PI / 180);
        console.debug("r2:" + r2);
        var r3 = r1 * Math.cos(singleAng * Math.PI / 180);
        console.debug("r3:" + r3);
        for (var i = 0; i < num; i++) {
            var shape = new egret.Shape();
            this.addChild(shape);
            shape.x = this.stage.stageWidth / 2;
            shape.y = this.stage.stageHeight / 2;
            shape.graphics.clear();
            shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
            var ang = -singleAng / 2 + i * 2 * singleAng;
            console.debug(i + ":" + ang);
            console.debug(i + ":x->" + r3 * Math.cos(ang * Math.PI / 180) + ",y->" + r3 * Math.sin(ang * Math.PI / 180) + ",r->" + r2 + ",start->" + (ang + 90) * Math.PI / 180 + ",end->" + (ang - 90) * Math.PI / 180);
            shape.graphics.drawArc(r3 * Math.cos(ang * Math.PI / 180), r3 * Math.sin(ang * Math.PI / 180), r2, (ang + 90) * Math.PI / 180, (ang - 90) * Math.PI / 180, true);
            break;
        }
    };
    return Arc;
}(egret.DisplayObjectContainer));
__reflect(Arc.prototype, "Arc");
//# sourceMappingURL=Arc.js.map