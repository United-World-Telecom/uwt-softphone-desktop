import { app, autoUpdater } from 'electron';
import * as electronIsDev from 'electron-is-dev';

export class Updater {
  static checkForUpdates(): void {

    // don't check for updates in dev mode (it won't work)
    if (electronIsDev) return;

    const server = 'https://update.electronjs.org';
    const repo = 'United-World-Telecom/uwt-softphone-desktop';
    const url = `${server}/${repo}/${process.platform}-${process.arch}/${app.getVersion()}`
    autoUpdater.setFeedURL({url});
    
    try {
      // check for updates immediately and then every 30 minutes
      autoUpdater.checkForUpdates();
      setTimeout(() => autoUpdater.checkForUpdates(), 30 * 60 * 1000);
      /**
       * if there is an update available, it will be downloaded on the background.
       * there is no way to get download progress unless you rewrite a lot of libraries.
       */
      autoUpdater.on('update-available', () => console.log('An update is available. Downloading...'));
      autoUpdater.on('update-downloaded', () => console.log('The update will be applied when the app restarts'));
    } catch (error) {
      console.log(error);
      console.log(`You're running the app without installing it, autoUpdater requires it to be installed.`);
    }
    
  }
}