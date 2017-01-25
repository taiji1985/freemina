/**
 * Created by Tongfeng Yang on 2017/1/25.
 */
import WXmlParser from "./WXmlParser"

const event_list = [
    'onLoad','onDestory','render'
];
export default class Page{
    constructor(opt){
        this.opt = opt;


        for (var op in opt) {
            if ('data' === op) {
                 this.data = opt[op];
            }
            //this[op] = opt[op];
        }
        this.eventHandler=this.eventHandler.bind(this);
        this.registerEventHandler=this.registerEventHandler.bind(this);
        this.removeEventListener=this.removeEventListener.bind(this);
        this.setName=this.setName.bind(this);
        this.render=this.render.bind(this);
        this.setWXml=this.setWXml.bind(this);
        this.fireMyEvent = this.fireMyEvent.bind(this);
        this.getData =this.getData.bind(this);
    }

    setName(name){
        if(name == this.name)return;
        this.removeEventListener();
        this.name = name;
        this.registerEventHandler();
    }

    removeEventListener(){
        for(var e in event_list ){
            let ename = event_list[e];
            console.log("removeEventListener:"+this.name+'_'+ename);
            document.removeEventListener(this.name+'_'+ename);
        }
    }

    registerEventHandler(){
        for(var e in event_list ){
            let ename = event_list[e];
            console.log("addEventListener:"+this.name+'_'+ename);
            document.addEventListener(this.name+'_'+ename,this.eventHandler);

        }
    }

    getData(){
        return this.opt.data;
    }

    eventHandler(e){ //CustomEvent
        console.log("page this = "+this);
        console.log(this);
        let type = e.type.slice(this.name.length+1); // eg : index_onLoad , remove 'index_'
        console.log("recv event "+e.type);
        if(this.opt[type]){
            this.opt[type]({});
        }else if(this[type]){
            this[type].bind(this)();
        }else{
            console.log("Page: unknown event "+ type);
        }
        if(type == 'onLoad'){ //if onload finish ,start to render
            this.render();
            //this.fireMyEvent.bind(this)('render');
        }
    }


    setWXml(wxml){
        this.wxml = wxml;
    }

    render(){
        console.log("render called");
        let template = this.wxml;
        let parser =new WXmlParser(this.getData());
        let domJson = parser.stringToDomJSON(template)[0];
        let dom = parser.jsonToDom(domJson);
        document.getElementById('app').appendChild(dom);
        this.fireEvent('onShow');//for App object
    }
    fireMyEvent(type){
        type = this.name+"_"+type;
        console.log("fireEvent "+type);
        document.dispatchEvent(new CustomEvent(type,{}));

    }
    fireEvent(type){
        console.log("fireEvent "+type);
        document.dispatchEvent(new CustomEvent(type,{}));
    }

}
