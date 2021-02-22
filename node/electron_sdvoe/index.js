const {app,BrowserWindow,screen} = require('electron');
function createWindow(){
    let win;
    //const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    //console.log(`the width is ${width} and the height is ${height}`);
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