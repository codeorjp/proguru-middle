import _ from "lodash";

class Sandbox {
  constructor(interpreter) {
    this.interpreter = interpreter;
    this.code = "";
  }

  init(store, blockFunctions, code) {
    const blockApis = _.map(blockFunctions, (func) => func(store));
    this.code = code;
    this.interpreter.init(blockApis);
  }

  async eval() {
    await this.interpreter.eval(this.code);
  }

  reset() {
    this.interpreter.reset();
  }
}

export default Sandbox;
