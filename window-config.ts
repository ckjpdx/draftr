import {ElegularWindowConfig} from "elegular";
let windowConfig: ElegularWindowConfig[] = [{
    windowId: "main",
    angularModulePath: __dirname + "/main-window/main-window.module.js",
    isMainWindow: true,
    isOpenDevTool: true,
    windowOptions: {
        width: 800,
        height: 800,
        frame: true,
        alwaysOnTop: false
    }
}];
export {windowConfig};
