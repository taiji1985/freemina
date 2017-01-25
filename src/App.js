/**
 * Created by Tongfeng Yang on 2017/1/25.
 */

export default  class App{

    constructor(opt){
        this.opt = opt;
        this.pageMap = [];

        this.addPage=this.addPage.bind(this);
        this.eventHandler=this.eventHandler.bind(this);
        this.render=this.render.bind(this);
        this.regEvent.bind(this)();
    }

    regEvent(){

        document.addEventListener("onShow",(e)=>{
            //onLoad function of page is called succ

        });
    }

    addPage(name,p){
        if(this.pageMap.length==0){
            this.curPage = p;
        }
        p.setName(name);

        this.pageMap[name] = p;
    }

    eventHandler(e){ //CustomEvent
        if(this.opt[e.type]){
            this.opt[e.type](e.detail);
        }
        if(e.type == "onLaunch"){
            let ename = this.curPage.name+"_onLoad";
            e= new CustomEvent(ename,{});
            document.dispatchEvent(e);
        }
    }

    render(){
        if(this.curPage){
            curPage.render();
        }
    }

}