import platform from "platform";

const isSupportBrowser = () => {
  if (platform.name === "IE") {
    if (platform.version === "11.0") {
      return true;
    }
  }

  if (platform.name?.indexOf("Edge") !== -1) {
    const version = parseFloat(platform.version);
    if (version >= 83) {
      // Blinkエンジン以降
      return true;
    }
  }

  if (platform.name?.indexOf("Safari") !== -1) {
    const version = parseFloat(platform.version);
    if (version >= 12) {
      return true;
    }
  }

  const supportList = ["Chrome", "Chrome Mobile"];
  if (supportList.indexOf(platform.name) !== -1) {
    return true;
  }

  return false;
};

export default isSupportBrowser();
