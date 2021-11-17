// background.js - this file loads the browser button that opens the
// sidebar

browser.browserAction.onClicked.addListener(() => {
  browser.sidebarAction.toggle();
});
