const { app, BrowserWindow } = require('electron');
const createWindow = () => {
    const win = new BrowserWindow({
      width: 500,
      height: 425,
      frame:false,
      resizable:false,
      icon:'build/icon.png'
    })
    win.setMenu(false);
  
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})