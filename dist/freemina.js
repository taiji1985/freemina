(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["freemina"] = factory();
	else
		root["freemina"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(1), __webpack_require__(3), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, exports, require('./Page'), require('./App'), require('./FException'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, mod.exports, global.Page, global.App, global.FException);
	        global.freemina = mod.exports;
	    }
	})(this, function (module, exports, _Page, _App, _FException) {
	    'use strict';

	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });

	    var _Page2 = _interopRequireDefault(_Page);

	    var _App2 = _interopRequireDefault(_App);

	    var _FException2 = _interopRequireDefault(_FException);

	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }

	    var freemina = {
	        addPage: function addPage(opt, name, wxml) {
	            console.log("add Page :" + name);
	            if (!window.App) {
	                throw new _FException2.default("App() function should be called before calling Page");
	            }
	            var p = new _Page2.default(opt, name);
	            p.setWXml(wxml);
	            window.App.addPage(name, p);
	        },
	        setApp: function setApp(opt) {
	            console.log("set App called");
	            window.App = new _App2.default(opt);
	        },
	        start: function start() {
	            window.Page = this.addPage;
	            window.App = this.setApp;
	            var e = new CustomEvent('onLaunch', {});
	            //        window.App.eventHandler(e)
	        },
	        finishLoad: function finishLoad() {
	            var e = { type: "onLaunch", detail: {} };
	            window.App.eventHandler(e);
	        }
	    }; /**
	        * Created by Tongfeng Yang on 2017/1/25.
	        */
	    exports.default = freemina;
	    module.exports = exports['default'];
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, exports, require('./WXmlParser'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, mod.exports, global.WXmlParser);
	        global.Page = mod.exports;
	    }
	})(this, function (module, exports, _WXmlParser) {
	    'use strict';

	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });

	    var _WXmlParser2 = _interopRequireDefault(_WXmlParser);

	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }

	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }

	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }

	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();

	    var event_list = ['onLoad', 'onDestory', 'render'];

	    var Page = function () {
	        function Page(opt) {
	            _classCallCheck(this, Page);

	            this.opt = opt;

	            for (var op in opt) {
	                if ('data' === op) {
	                    this.data = opt[op];
	                }
	                //this[op] = opt[op];
	            }
	            this.eventHandler = this.eventHandler.bind(this);
	            this.registerEventHandler = this.registerEventHandler.bind(this);
	            this.removeEventListener = this.removeEventListener.bind(this);
	            this.setName = this.setName.bind(this);
	            this.render = this.render.bind(this);
	            this.setWXml = this.setWXml.bind(this);
	            this.fireMyEvent = this.fireMyEvent.bind(this);
	            this.getData = this.getData.bind(this);
	        }

	        _createClass(Page, [{
	            key: 'setName',
	            value: function setName(name) {
	                if (name == this.name) return;
	                this.removeEventListener();
	                this.name = name;
	                this.registerEventHandler();
	            }
	        }, {
	            key: 'removeEventListener',
	            value: function removeEventListener() {
	                for (var e in event_list) {
	                    var ename = event_list[e];
	                    console.log("removeEventListener:" + this.name + '_' + ename);
	                    document.removeEventListener(this.name + '_' + ename);
	                }
	            }
	        }, {
	            key: 'registerEventHandler',
	            value: function registerEventHandler() {
	                for (var e in event_list) {
	                    var ename = event_list[e];
	                    console.log("addEventListener:" + this.name + '_' + ename);
	                    document.addEventListener(this.name + '_' + ename, this.eventHandler);
	                }
	            }
	        }, {
	            key: 'getData',
	            value: function getData() {
	                return this.opt.data;
	            }
	        }, {
	            key: 'eventHandler',
	            value: function eventHandler(e) {
	                //CustomEvent
	                console.log("page this = " + this);
	                console.log(this);
	                var type = e.type.slice(this.name.length + 1); // eg : index_onLoad , remove 'index_'
	                console.log("recv event " + e.type);
	                if (this.opt[type]) {
	                    this.opt[type]({});
	                } else if (this[type]) {
	                    this[type].bind(this)();
	                } else {
	                    console.log("Page: unknown event " + type);
	                }
	                if (type == 'onLoad') {
	                    //if onload finish ,start to render
	                    this.render();
	                    //this.fireMyEvent.bind(this)('render');
	                }
	            }
	        }, {
	            key: 'setWXml',
	            value: function setWXml(wxml) {
	                this.wxml = wxml;
	            }
	        }, {
	            key: 'render',
	            value: function render() {
	                console.log("render called");
	                var template = this.wxml;
	                var parser = new _WXmlParser2.default(this.getData());
	                var domJson = parser.stringToDomJSON(template)[0];
	                var dom = parser.jsonToDom(domJson);
	                document.getElementById('app').appendChild(dom);
	                this.fireEvent('onShow'); //for App object
	            }
	        }, {
	            key: 'fireMyEvent',
	            value: function fireMyEvent(type) {
	                type = this.name + "_" + type;
	                console.log("fireEvent " + type);
	                document.dispatchEvent(new CustomEvent(type, {}));
	            }
	        }, {
	            key: 'fireEvent',
	            value: function fireEvent(type) {
	                console.log("fireEvent " + type);
	                document.dispatchEvent(new CustomEvent(type, {}));
	            }
	        }]);

	        return Page;
	    }();

	    exports.default = Page;
	    module.exports = exports['default'];
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, exports);
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, mod.exports);
	        global.WXmlParser = mod.exports;
	    }
	})(this, function (module, exports) {
	    'use strict';

	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });

	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }

	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }

	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();

	    var Utils = function () {
	        function Utils() {
	            _classCallCheck(this, Utils);
	        }

	        _createClass(Utils, [{
	            key: 'removeTemplateTag',
	            value: function removeTemplateTag(str) {
	                return str.substr(2, str.length - 4);
	            }
	        }, {
	            key: 'isTemplateTag',
	            value: function isTemplateTag(string) {
	                return (/{{[a-zA-Z1-9\\.]+}}/.test(string)
	                );
	            }
	        }]);

	        return Utils;
	    }();

	    var WXmlParser = function () {
	        function WXmlParser(data) {
	            _classCallCheck(this, WXmlParser);

	            this.data = data;
	            this.stringToDomJSON = this.stringToDomJSON.bind(this);
	            this.nodeToJSON = this.nodeToJSON.bind(this);
	            this.jsonToDom = this.jsonToDom.bind(this);
	            this.domParser = this.domParser.bind(this);
	            this.getData = this.getData.bind(this);
	            this.utils = new Utils();
	        }

	        _createClass(WXmlParser, [{
	            key: 'stringToDomJSON',
	            value: function stringToDomJSON(string) {
	                string = '<div class="page"><div class="page__hd">' + string + '</div></div>';
	                var json = this.nodeToJSON(this.domParser(string));
	                if (json.nodeType === 9) {
	                    json = json.childNodes;
	                }
	                return json;
	            }
	        }, {
	            key: 'getData',
	            value: function getData(key) {
	                if (!key) return null;
	                var ka = key.split(".");
	                var ret = this.data[ka[0]];
	                for (var i = 1; i < ka.length; i++) {
	                    if (!ret) return null; //can't find !
	                    ret = ret[ka[i]];
	                }
	                return ret;
	            }
	        }, {
	            key: 'nodeToJSON',
	            value: function nodeToJSON(node) {
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
	                    if (this.utils.isTemplateTag(node.nodeValue)) {
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
	        }, {
	            key: 'jsonToDom',
	            value: function jsonToDom(obj) {
	                // Code base on https://gist.github.com/sstur/7379870
	                if (typeof obj == 'string') {
	                    obj = JSON.parse(obj);
	                }
	                var node,
	                    nodeType = obj.nodeType;
	                switch (nodeType) {
	                    case 1:
	                        //ELEMENT_NODE
	                        node = document.createElement(obj.tagName);
	                        var attributes = obj.attributes || [];
	                        for (var i = 0, len = attributes.length; i < len; i++) {
	                            var attr = attributes[i];
	                            node.setAttribute(attr[0], attr[1]);
	                        }
	                        break;
	                    case 3:
	                        //TEXT_NODE
	                        node = document.createTextNode(obj.nodeValue);
	                        break;
	                    case 8:
	                        //COMMENT_NODE
	                        node = document.createComment(obj.nodeValue);
	                        break;
	                    case 9:
	                        //DOCUMENT_NODE
	                        node = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
	                        break;
	                    case 10:
	                        //DOCUMENT_TYPE_NODE
	                        node = document.implementation.createDocumentType(obj.nodeName);
	                        break;
	                    case 11:
	                        //DOCUMENT_FRAGMENT_NODE
	                        node = document.createDocumentFragment();
	                        break;
	                    default:
	                        return node;
	                }
	                if (nodeType == 1 || nodeType == 11) {
	                    var childNodes = obj.childNodes || [];
	                    for (i = 0, len = childNodes.length; i < len; i++) {
	                        node.appendChild(this.jsonToDom(childNodes[i]));
	                    }
	                }
	                return node;
	            }
	        }, {
	            key: 'domParser',
	            value: function domParser(string) {
	                var parser = new DOMParser();
	                return parser.parseFromString(string, 'text/xml');
	            }
	        }]);

	        return WXmlParser;
	    }();

	    exports.default = WXmlParser;
	    module.exports = exports['default'];
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, exports);
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, mod.exports);
	        global.App = mod.exports;
	    }
	})(this, function (module, exports) {
	    "use strict";

	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });

	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }

	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }

	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();

	    var App = function () {
	        function App(opt) {
	            _classCallCheck(this, App);

	            this.opt = opt;
	            this.pageMap = [];

	            this.addPage = this.addPage.bind(this);
	            this.eventHandler = this.eventHandler.bind(this);
	            this.render = this.render.bind(this);
	            this.regEvent.bind(this)();
	        }

	        _createClass(App, [{
	            key: "regEvent",
	            value: function regEvent() {

	                document.addEventListener("onShow", function (e) {
	                    //onLoad function of page is called succ

	                });
	            }
	        }, {
	            key: "addPage",
	            value: function addPage(name, p) {
	                if (this.pageMap.length == 0) {
	                    this.curPage = p;
	                }
	                p.setName(name);

	                this.pageMap[name] = p;
	            }
	        }, {
	            key: "eventHandler",
	            value: function eventHandler(e) {
	                //CustomEvent
	                if (this.opt[e.type]) {
	                    this.opt[e.type](e.detail);
	                }
	                if (e.type == "onLaunch") {
	                    var ename = this.curPage.name + "_onLoad";
	                    e = new CustomEvent(ename, {});
	                    document.dispatchEvent(e);
	                }
	            }
	        }, {
	            key: "render",
	            value: function render() {
	                if (this.curPage) {
	                    curPage.render();
	                }
	            }
	        }]);

	        return App;
	    }();

	    exports.default = App;
	    module.exports = exports["default"];
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, exports);
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, mod.exports);
	        global.FException = mod.exports;
	    }
	})(this, function (module, exports) {
	    "use strict";

	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });

	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }

	    var FreeMinaException = function FreeMinaException(msg) {
	        _classCallCheck(this, FreeMinaException);

	        this.msg = msg;
	    };

	    exports.default = FreeMinaException;
	    module.exports = exports["default"];
	});

/***/ }
/******/ ])
});
;