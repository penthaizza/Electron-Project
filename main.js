const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow1 () {
  window1 = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 800,
    height: 600
  })
  window1.loadURL(`file://${__dirname}/index.html`)
  window1.on('closed', function () {
     window1 = null
  })
  return window1
}
function createWindow2 () {
  window2 = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 1000, 
    height: 600
  })
  window2.loadURL(`file://${__dirname}/index2.html`)
  window2.on('closed', function () {
    window2 = null
  })
  return window2
}

app.on('ready', () => {
  window1 = createWindow1();
  window2 = createWindow2();

  ipcMain.on('nameMsg', (event, arg) => {
    console.log("name inside main process is: ", arg)
    event.sender.send('nameReply', { not_right: false})
    window2.webContents.send('forWin2', arg)
  })
})