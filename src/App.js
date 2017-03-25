/**
 * Created by Tongfeng Yang on 2017/1/25.
 */

export default  class App{

    constructor(opt){
        this.opt = opt;
        this.pageMap = [];
        this.pageMap.len  = 0;
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
        console.log("page map len is "+this.pageMap.length);
        if(this.pageMap.len==0){
            this.curPage = p;
        }
        p.setName(name);

        this.pageMap[name] = p;
        this.pageMap.len ++;
        console.log(this.pageMap);
    }

    /**
     * 跳转到某个页面
     * @param url
     * @returns {boolean}
     */
    jumpTo(pagePath){
        let p = this.pageMap[pagePath];
        if(p){
            this.curPage = p;
            return true;
        }

        return false;
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
            this.curPage.render();
        }
    }

}