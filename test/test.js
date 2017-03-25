/**
 * Created by TongFeng Yang on 2017/1/25.
 */
//打包app.js的内容
App({
    data: {
        word:'helo'
    },
    hello(){
        console.log('sss');
    },
    onLaunch:function(){
        this.hello();
    }
});

//--------
var wxml = '<view class="container"  bindtap="haha"><text class="item">{{first}}</text><text>{{obj.name}}</text></view>';

Page({

    data: {
        first: 'hello, world',
        obj:{
            name:'yang',
            age:13
        }
    },
    onLoad:function(){
        console.log('page loaded');
    },

    onShow: function () {

    },
    haha: function () {
        console.log('tap event ....');
        wx.navigateTo({
            url: 'index2'
        })
    }

},'index',wxml)

//-------- 第二个页面
var wxml_2 = '<view class="container"><text class="item">{{first}}</text><text>{{obj.name}}</text></view>';

Page({

    data: {
        first: 'sssss',
        obj:{
            name:'yang',
            age:13
        }
    },
    onLoad:function(){
        console.log('page loaded');
    },

    onShow: function () {

    },

},'index2',wxml_2)
