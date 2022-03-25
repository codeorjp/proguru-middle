import _ from "lodash";

export default class Storage {
  constructor(key = window.location.href) {
    this.key = key;
    this.WAIT_TIME = 1000;
    this.saveThrottle = _.throttle((styleData) => {
      try {
        window.sessionStorage.setItem(this.key, JSON.stringify(styleData));
      } catch {}
    }, this.WAIT_TIME);
  }

  saveWorkspace(styleData) {
    if ("sessionStorage" in window) {
      this.saveThrottle(styleData);
    }
  }

  restoreWorkspace(defaultStyle) {
    if (this.isExistsSavedWorkspace()) {
      try {
        const saveStyle = window.sessionStorage.getItem(this.key);
        return JSON.parse(saveStyle);
      } catch (e) {
        return defaultStyle;
      }
    } else {
      return defaultStyle;
    }
  }

  isExistsSavedWorkspace() {
    try {
      return window.sessionStorage.getItem(this.key);
    } catch {
      return false;
    }
  }
}
