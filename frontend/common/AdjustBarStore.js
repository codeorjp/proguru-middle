import { action, decorate, observable } from "mobx";

class AdjustBarStore {
  constructor() {
    this.isOpen = true;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}

decorate(AdjustBarStore, {
  isOpen: observable,
  toggle: action,
});

export default new AdjustBarStore();
