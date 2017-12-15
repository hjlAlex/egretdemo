class DateEvent extends egret.Event{
    public static EVT_NAME:string = "约会";//static变量,所有DateEvent对象共享
    public _year:number = 0;
    public _month:number = 0;
    public _date:number = 0;
    public _where:string = "";
    public _todo:string = "";

    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false, data: any = null){
        super(type,bubbles,cancelable,data);
    }
}