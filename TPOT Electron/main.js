const path = require('path')
const {app, BrowserWindow} = require('electron') // Both app and BrowserWindow are requiring Electron
const config = require('config');


initialize()


function initialize () {
  
  function createWindow () {
    
    // Create a new browser window
    window = new BrowserWindow(config.settings.windowOptions)
    
    // // Graceful Load
    // window.once('ready-to-show', () => {window.show()})

    // set the path of the browser window url
    window.loadURL(path.join('file://', __dirname, '/letters.html'))
    // window.loadFile('main.js') // text-only load

    // Launch fullscreen with DevTools if set in config, usage: npm run debug
    if (config.settings.loaderOnLaunch) {
      window.webContents.openDevTools()
      // window.maximize()
    }

    // More code related to creating this browsers window here

  }

  app.on('ready', createWindow)

}