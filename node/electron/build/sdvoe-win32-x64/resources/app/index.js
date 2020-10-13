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
    win.loadFile('index.html');
}
app.whenReady().then(createWindow);
// let debug = new BrowserWindow()
// debug.webContents.openDevTools()
function ji(){
    console.log("Hello this is jifukui");
}