class Girl extends egret.DisplayObject
{
    public constructor(){
        super();
    }
    public dealDateEvent(evt:DateEvent){
        console.log("得到了" + evt.target.name + "的邀请！" );
        console.log("会在" + evt._year + "年" + evt._month + "月" + evt._date + "日，在"+ evt._where+ evt._todo);
        console.log(evt.bubbles + ":" + evt.cancelable  + ":" + evt.data);
    }
}