export default class AbstructInterpreter {
  init() {
    throw new TypeError("Must override init method");
  }

  eval() {
    throw new TypeError("Must override eval method");
  }

  reset() {
    throw new TypeError("Must override reset method");
  }
}
