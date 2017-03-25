/**
 * Created by Tongfeng Yang on 2017/3/18.
 */


export default class FM{
    constructor(){
        //this.app = app;
        this.navigateTo = this.navigateTo.bind(this);
        this._callIfNotNull = this._callIfNotNull.bind(this);
        this.pageStack = [];
        this.navigateTo = this.navigateTo.bind(this);
        this._callIfNotNull = this._callIfNotNull.bind(this);
    }

    navigateTo(args){
        this.app = window._app;
        console.log("navigateTo ");
        console.log(window._app);
        if(!args.url){
            this._callIfNotNull(args.fail);
        }else{
            this.pageStack.push(this.app.curPage);
            let r = this.app.jumpTo(args.url);
            console.log('jump ret '+r);
            if(r){
                this.app.render();
                this._callIfNotNull(args.success);
            }else{
                this._callIfNotNull(args.fail);
            }
        }
        this._callIfNotNull(args.complete);
    }

    _callIfNotNull(fun){
        if(fun){
            fun();
        }
    }


}