import AbstructSandbox from "./AbstructInterpreter";

class WindowEval extends AbstructSandbox {
  constructor() {
    super();
    this.blockFunctionNames = [];
  }

  init(BlockFunctions) {
    this.blockFunctionNames = [];
    BlockFunctions.forEach(({ name, def }) => {
      this.blockFunctionNames.push(name);
      window[name] = def;
    });
  }

  eval(code) {
    // eslint-disable-next-line no-eval
    window.eval(code);
  }

  reset() {
    this.blockFunctionNames.forEach((name) => {
      window[name] = undefined;
    });
  }
}

export default WindowEval;
