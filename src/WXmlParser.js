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
            obj.tagName = 'fm-' + node.tagName.toLowerCase();
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

    jsonToDom(obj,opt)
    {
        //console.log("jsonToDom");
        //console.log(opt);
        window.haha = opt;
        // Code base on https://gist.github.com/sstur/7379870
        if (typeof obj == 'string') {
            obj = JSON.parse(obj);
        }
        var node, nodeType = obj.nodeType;
        //console.log("jsonToDom nodeType = "+ nodeType);
        switch (nodeType) {
            case 1: //ELEMENT_NODE
                node = document.createElement(obj.tagName);
                var attributes = obj.attributes || [];
                for (var i = 0, len = attributes.length; i < len; i++) {
                    var attr = attributes[i];
                    node.setAttribute(attr[0], attr[1]);
                    //console.log('set attr '+ attr[0]+ "->"+attr[1]);
                    if(attr[0].startsWith("bind")){
                        var e = attr[0].replace("bind","");
                        if(e == "tap"){
                            //console.log(opt);
                            node.addEventListener("click",opt[attr[1]]);

                        }
                    }
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
                node.appendChild(this.jsonToDom(childNodes[i],opt));
            }
        }
        return node;
    }

    domParser(string){
        var parser = new DOMParser();
        return parser.parseFromString(string, 'text/xml');
    }
}