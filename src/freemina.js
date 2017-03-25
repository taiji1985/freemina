/**
 * Created by Tongfeng Yang on 2017/1/25.
 */
import Page from './Page'
import App from './App'
import FException from './FException'
import FM from './FM'

const freemina={
    addPage(opt,name,wxml){
        console.log("add Page :"+name);
        if(!window.App ){
            throw new FException("App() function should be called before calling Page");
        }
        let p = new Page(opt,name);
        p.setWXml(wxml);
        window._app.addPage(name,p);
    },

    setApp(opt){
        console.log("set App called");
        window._app = new App(opt);

    },

    start(){
        window.Page  = this.addPage;
        window.App = this.setApp;
        window.wx = new FM();
        // $('#app *').click(function () {
        //     console.log("haha....");
        //     console.log($(this).html());
        //
        // })
//        let e = new CustomEvent('onLaunch',{});
//        window.App.eventHandler(e)
    },
    finishLoad(){
        var e={type:"onLaunch",detail:{}};
        window._app.eventHandler(e);
    }

}

export default  freemina;