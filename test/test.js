/**
 * Created by TongFeng Yang on 2017/1/25.
 */
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
var wxml = '<view class="container"><text class="item">{{first}}</text><text>{{obj.name}}</text></view>';

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

},'index',wxml)
