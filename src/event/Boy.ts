class Boy extends egret.DisplayObject{

    public constructor(){
        super();
    }
    public sendDateEvent(){
        //生成约会事件对象
        let dateEvent:DateEvent = new DateEvent(DateEvent.EVT_NAME);
        //添加对应的约会信息
        dateEvent._year = 2017;
        dateEvent._month = 8;
        dateEvent._date = 2;
        dateEvent._where = "肯德基";
        dateEvent._todo = "共进晚餐";
        //发送要求事件
        this.dispatchEvent(dateEvent);
    }
}