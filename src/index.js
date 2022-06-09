const {app, BrowserWindow, Tray, Menu} = require('electron')
const path = require('path')
let isQuiting;
let tray;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences : {
        nodeIntegration: true,
        contextIsolation: false
      }
    });
  
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    tray = new Tray(path.join(__dirname, 'clock.png'));

    tray.setContextMenu(Menu.buildFromTemplate([
      {
        label: 'Show App', click: function () {
          mainWindow.show();
        }
      },
      {
        label: 'Quit', click: function () {
          isQuiting = true;
          app.quit();
        }
      }
    ]));

  mainWindow.on('close', function (event) {
    if (!isQuiting) {
      event.preventDefault();
      mainWindow.hide();
      event.returnValue = false;
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('before-quit', function () {
  isQuiting = true;
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
