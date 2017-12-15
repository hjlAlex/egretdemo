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
var Boy = (function (_super) {
    __extends(Boy, _super);
    function Boy() {
        return _super.call(this) || this;
    }
    Boy.prototype.sendDateEvent = function () {
        //生成约会事件对象
        var dateEvent = new DateEvent(DateEvent.EVT_NAME);
        //添加对应的约会信息
        dateEvent._year = 2017;
        dateEvent._month = 8;
        dateEvent._date = 2;
        dateEvent._where = "肯德基";
        dateEvent._todo = "共进晚餐";
        //发送要求事件
        this.dispatchEvent(dateEvent);
    };
    return Boy;
}(egret.DisplayObject));
__reflect(Boy.prototype, "Boy");
//# sourceMappingURL=Boy.js.map