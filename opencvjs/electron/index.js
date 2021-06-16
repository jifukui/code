const {app,BrowserWindow} = require('electron');
function createWindow(){
    let win;
    win = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration:true
        }
    });
    //win.loadURL("http:192.168.20.223:80")
    win.loadFile("first.html")
}
app.whenReady().then(createWindow);
