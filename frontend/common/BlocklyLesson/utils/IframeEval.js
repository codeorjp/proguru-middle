import AbstructSandbox from "./AbstructInterpreter";

class IframeEval extends AbstructSandbox {
  constructor() {
    super();
    this.iframe = document.createElement("iframe");
    this.iframe.id = "sandbox";
    this.iframe.style.display = "none";
    this.iframe.sandbox = "allow-same-origin";
  }

  init(BlockFunctions) {
    document.body.appendChild(this.iframe);
    this.global = this.iframe.contentWindow;

    BlockFunctions.forEach((obj) => {
      this.global[obj.name] = obj.def;
    });
    this.global.regeneratorRuntime = window.regeneratorRuntime;
    this.global.Promise = window.Promise;
  }

  eval(code) {
    this.global.eval(code);
    this.reset();
  }

  reset() {
    if (document.getElementById("sandbox")) {
      document.body.removeChild(this.iframe);
    }
  }
}

export default IframeEval;
