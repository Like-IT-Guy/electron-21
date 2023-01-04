const { app, BrowserWindow } = require('electron');
const path = require('path')
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    

    win.loadFile('index.html')
}

//Updates
//App Start
app.whenReady().then(() => {
    createWindow();
    autoUpdater.checkForUpdatesAndNotify();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow();
        }
    });
});

autoUpdater.on("update-available", () => {
    log.info("update-available");
});

autoUpdater.on("update-not-available", () => {
    log.info("update-not-available");
});

autoUpdater.on("error", (error) => {
    log.info("Error in update");
    log.info(error);
});

autoUpdater.on("checking-for-update", () => {
    log.info("checking-for-update");
});

autoUpdater.on("download-progress", (progressTrack) => {
    log.info("\n\ndownload-progress")
    log.info(progressTrack);
});

autoUpdater.on("update-downloaded", () => {
    log.info("update-downloaded");
});

app.whenReady().then(() => {
    createWindow()
});

//App Stop
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});