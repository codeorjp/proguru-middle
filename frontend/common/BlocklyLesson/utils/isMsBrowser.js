import platform from "platform";

const browserList = ["IE", "Microsoft Edge"];
const isMsBrowser = () => browserList.includes(platform.name);

export default isMsBrowser;
