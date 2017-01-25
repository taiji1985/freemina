#FreeMina： An open mina compatible framework for running in browser or webview.
##一个兼容微信小程序Mina框架的开源框架
从小程序的设计来看，微信正走向封闭生态。我们开发的微信小程序很难在其他地方使用。

最近一段时间，我花了大量精力来查找相关资料。包括React、React Native。我本来不算一个JS程序员，但也为此学习或了解了Bable
WebPatch，ES2015等等一系列我原本不熟悉的内容。

真正有巨大收获的是 @phodal 大神发的五篇文章，
它还做了一个for fun的框架winv。 仔细学习了这个框架，并提交了一个补丁，改善了一点点小功能。昨天晚上，我就在考虑到底是在这个框架上修改，还是自己开一个。

反复思量，觉得如果要改进，那么基本上要重写所有的代码，和重开一个无益。
一个项目初始的架构很重要，差的架构让人难以提起改进的兴趣。另外，大神有6个月没有更新项目了。

总之，再次感谢 @phodal 。

##设计目的和计划

完全兼容微信小程序的所有API。让微信小程序能移植到自己的APP上。

当然这个目标从现在看有些“宏伟”了。

要做的工作：
* 解析wxml dom，并生成相应的html。 
  这一点， @phodal 已经做了大量的贡献。但性能需要改进一下。
  另外，我学习了facebook的diff算法，准备在今后的改进中加入。

* wxml中{{}}格式数据的处理。我给winv这个项目添加了 {{obj.name}}这样的支持。
  但还缺少if和for这两个非常重要的环节。

* 事件系统。 目前已经实现了一些，但还远远没有完成。但大体的设计已经有了。

* 打包等项目工具 。 微信小程序将所有的文件全部打包在一起。这个并非简单的用
webpack进行打包。还对程序作了一定的预处理。对于将xml生成为js的做法，我觉得还需要考虑，到底需不需要这么做。
json的处理相对简单，require进去就好。

  我实现打包工具的思路是
  1. 首先给Page打包，给添加上两个参数，把xml和文件名一起传给Page函数。
  2. 使用webpack等工具打包到一起。
  
* App支持。 wx中有很多函数，没有App的帮助是无法实现的。
  这一部分的做法
  1. 在web中能用web试下你的用web实现，不能实现的暂不实现。
  2. 在App中，给出原生支持。。不过我目前只会android。苹果的没钱买那么贵的设备。毕竟玩票性质。。。
  

##实现方案
###项目工具
整个项目使用nodejs管理。使用gulp完成编译和监视文件自动编译的功能。
使用bable进行ES6的转义。 直接拿了别人项目的配置。。。（羞。。。）
详见package.json

###项目入口
项目的入口是src/freemina.js
```js
/**
 * Created by Tongfeng Yang on 2017/1/25.
 */
import Page from './Page'
import App from './App'
import FException from './FException'

const freemina={
    addPage(opt,name,wxml){
        console.log("add Page :"+name);
        if(!window.App ){
            throw new FException("App() function should be called before calling Page");
        }
        let p = new Page(opt,name);
        p.setWXml(wxml);
        window.App.addPage(name,p);
    },

    setApp(opt){
        console.log("set App called");
        window.App = new App(opt);
    },

    start(){
        window.Page  = this.addPage;
        window.App = this.setApp;
//        let e = new CustomEvent('onLaunch',{});
//        window.App.eventHandler(e)
    },
    finishLoad(){
        var e={type:"onLaunch",detail:{}};
        window.App.eventHandler(e);
    }

}

export default  freemina;
```
包含了setApp和addPage方法，这个方法在start方法中被暴露到window中，
所以，就可以使用App({})和Page({})的方法来使用它们。
setApp直接创建App类。 addPage方法首先创建Page对象，随后调用App的addPage方法
将其加入管理之中。并使用setWxml将wxml设置进去。

###App类
先看代码

```js
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

```
使用ES6实现的，老实说，如果不是能用class，我是不愿意入js这个坑的。
但一堆堆的bind还是亮瞎了我眼。。。

App对象维护一个Page对象列表。和一个curPage指向当前对象。
目前，默认认为第一个注册的Page是入口。（因为还没实现App的配置，所以暂时忍一下吧！！！）

下面是事件处理的核心eventHandler。
我们在写App时这么写：
App({
   onLaunch:function(){...}
})
这个传进app的是一个对象或者说是hashmap。在app的构造函数中，传递给了this.opt
eventHandler被调用时，给出了一个e，这个e可以是CustomEvent，也可以是
```js
{type:'onLaunch',detail:{}}
```
这样的对象。如果收到上述的这个onLaunch消息，这个函数就会判断opt中（就是你传进的对象）
是否有这个方法。如果有，则调用它。

调用万onLaunch开始调用Page的onLoad了。怎么调用呢？
在这里发出一个消息。如果页面的名字是index，那么就发出
index_onLoad消息。index这个页面会监听这个消息，进而收到这个onLoad事件。

下面来看Page的实现
##Page的实现
先贴代码。
```js
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


```
构造函数中又是一堆晃瞎我眼的bind。另外你换进来的那个对象仍然被存到了opt中。
setName 函数是被App调用的。 设置了这个页面的名字。在名字设定后，就会注册一堆事件监听者。
注册的列表在event_list这个变量里。以后这个列表可以逐渐完善。
上面说到的那个index_onLoad事件就是通过页面名字和事件名拼接出来的。

事件监听函数是eventHandle。把onLoad这个字眼从index_onLoad中切除来。
```js
        let type = e.type.slice(this.name.length+1); // eg : index_onLoad , remove 'index_'
```
然后查找this.opt就是你传进来的那个对象是否有onLoad的声明。
如果有，则调用，如果没有，则尝试在this中查找，如果还是没有，就真的没有了。

下面说比较重要的渲染问题
##WXmlParser渲染wxml文件
这部分参考了winv,里面也有少量我贡献的嗲吗，我只是对其做了重构，以方便调用。看代码
```js
/**
 * Created by Tongfeng Yang on 2017/1/25.
 * Some code copied from https://github.com/phodal/winv  ,which is under MIT .
 */

class Utils{
    removeTemplateTag(str){
        return str.substr(2, str.length - 4);
    }

    isTemplateTag(string){
        return /{{[a-zA-Z1-9\\.]+}}/.test(string);
    }
}
export default class WXmlParser{
    constructor(data){
        this.data= data;
        this.stringToDomJSON=this.stringToDomJSON.bind(this);
        this.nodeToJSON=this.nodeToJSON.bind(this);
        this.jsonToDom=this.jsonToDom.bind(this);
        this.domParser = this.domParser.bind(this);
        this.getData = this.getData.bind(this);
        this.utils  = new Utils();
    }

    stringToDomJSON(string){
        string = '<div class="page"><div class="page__hd">' + string + '</div></div>';
        var json = this.nodeToJSON(this.domParser(string));
        if (json.nodeType === 9) {
            json = json.childNodes;
        }
        return json;
    }

    getData(key) {
        if(!key)return null;
        var ka = key.split(".");
        var ret = this.data[ka[0]];
        for(var i = 1;i<ka.length;i++){
            if(!ret)return null; //can't find !
            ret= ret[ka[i]];
        }
        return ret;
    }

    nodeToJSON(node){
        // Code base on https://gist.github.com/sstur/7379870
        node = node || this;
        var obj = {
            nodeType: node.nodeType
        };
        if (node.tagName) {
            obj.tagName = 'winv-' + node.tagName.toLowerCase();
        } else if (node.nodeName) {
            obj.nodeName = node.nodeName;
        }
        if (node.nodeValue) {
            obj.nodeValue = node.nodeValue;
            if(this.utils.isTemplateTag(node.nodeValue)){
                obj.nodeValue = this.getData(this.utils.removeTemplateTag(node.nodeValue));
            }
        }
        var attrs = node.attributes;
        if (attrs) {
            var length = attrs.length;
            var arr = obj.attributes = new Array(length);
            for (var i = 0; i < length; i++) {
                var attr = attrs[i];
                arr[i] = [attr.nodeName, attr.nodeValue];
            }
        }
        var childNodes = node.childNodes;
        if (childNodes) {
            length = childNodes.length;
            arr = obj.childNodes = new Array(length);
            for (i = 0; i < length; i++) {
                arr[i] = this.nodeToJSON(childNodes[i]);
            }
        }
        return obj;
    }

    jsonToDom(obj)
    {
        // Code base on https://gist.github.com/sstur/7379870
        if (typeof obj == 'string') {
            obj = JSON.parse(obj);
        }
        var node, nodeType = obj.nodeType;
        switch (nodeType) {
            case 1: //ELEMENT_NODE
                node = document.createElement(obj.tagName);
                var attributes = obj.attributes || [];
                for (var i = 0, len = attributes.length; i < len; i++) {
                    var attr = attributes[i];
                    node.setAttribute(attr[0], attr[1]);
                }
                break;
            case 3: //TEXT_NODE
                node = document.createTextNode(obj.nodeValue);
                break;
            case 8: //COMMENT_NODE
                node = document.createComment(obj.nodeValue);
                break;
            case 9: //DOCUMENT_NODE
                node = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
                break;
            case 10: //DOCUMENT_TYPE_NODE
                node = document.implementation.createDocumentType(obj.nodeName);
                break;
            case 11: //DOCUMENT_FRAGMENT_NODE
                node = document.createDocumentFragment();
                break;
            default:
                return node;
        }
        if (nodeType == 1 || nodeType == 11) {
            var childNodes = obj.childNodes || [];
            for (i = 0, len = childNodes.length; i <  len; i++) {
                node.appendChild(this.jsonToDom(childNodes[i]));
            }
        }
        return node;
    }

    domParser(string){
        var parser = new DOMParser();
        return parser.parseFromString(string, 'text/xml');
    }
}
```
Page.js中的渲染函数
```js

render(){
        console.log("render called");
        let template = this.wxml;
        let parser =new WXmlParser(this.getData());
        let domJson = parser.stringToDomJSON(template)[0];
        let dom = parser.jsonToDom(domJson);
        document.getElementById('app').appendChild(dom);
        this.fireEvent('onShow');//for App object
    }
```
基本原理首先通过DOMParser将wxml解析一下（domParser）。编程一个dom对象。将其
变为domJSON.然后再讲domJSON转换会dom对象。这一步中包含{{}}标签的处理。
用的正则表达式匹配。

最后，这个问题还是很多的。 比如那个appendChild。。在后面的开发中会替换成
diff和apply。
渲染完了，发送事件。

##TODO
1. 事件机制还不完善。
2. 渲染的diff和apply的实现。
3. setData这个核心的函数实现。
4. 参照微信文档进行界面完全兼容
4. 完善wx的API函数（可能会用Android实现）
   IOS就算了，听说基于WebView的通不过审核！
   另外，我没钱买Mac。。。

##最后
感谢您的阅读。如果有可能请贡献些代码。。。
