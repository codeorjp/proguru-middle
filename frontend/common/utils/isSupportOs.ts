import platform from "platform";

const isSupportOs = (): boolean => {
  // Windows 8 以上
  if (platform.os.family.indexOf("Windows") !== -1) {
    // windows
    const version = parseFloat(platform.os.version);
    if (version < 8.1) {
      // Windows 8, 7, Vista, XPはサポート外
      return false;
    }
  }

  // iOS 13.7 以上かつiPad
  if (platform.os.family.indexOf("iOS") !== -1) {
    // iOS
    const version = parseFloat(platform.os.version);
    if (version < 13.7) {
      // iOS 13.7 未満はサポート外
      return false;
    }

    // iPhoneは除く
    if (platform.product.indexOf("iPhone") !== -1) {
      return false;
    }
  }

  // Androidは除く
  if (platform.os.family.indexOf("Android") !== -1) {
    return false;
  }

  // Linux等、数が少ないOSについてはスルーしている
  return true;
};

export default isSupportOs;
