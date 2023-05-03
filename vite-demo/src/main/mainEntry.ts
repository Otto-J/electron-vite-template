import { app, BrowserWindow } from "electron";
import { CustomScheme } from "./CustomScheme";
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

// sqlite3 demo
const Database = require("better-sqlite3");
const db = new Database("db.db", {
  verbose: console.log,
  nativeBinding:
    "./node_modules/better-sqlite3/build/Release/better_sqlite3.node",
});

console.log("db", db);

let mainWindow: BrowserWindow;

app.whenReady().then(() => {
  let config = {
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: false,
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true,
    },
  };
  mainWindow = new BrowserWindow(config);
  mainWindow.webContents.openDevTools({ mode: "undocked" });
  // mainWindow.loadURL(process.argv[2]);
  if (process.argv[2]) {
    mainWindow.loadURL(process.argv[2]);
  } else {
    CustomScheme.registerScheme();
    mainWindow.loadURL(`app://index.html`);
  }
});
