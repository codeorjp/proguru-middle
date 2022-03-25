import { action, decorate } from "mobx";
import { toast } from "react-toastify";

class ToastStore {
  constructor() {
    this.configure = {
      autoClose: 4000,
      draggable: false,
      newestOnTop: true,
      closeButton: false,
      type: toast.TYPE.ERROR,
      position: "top-center",
      hideProgressBar: true,
    };
    this.toastList = new Set();
    this.MAX_TOAST = 1;
  }

  show(text) {
    if (!text) return;
    if (this.toastList.size < this.MAX_TOAST) {
      const id = toast(text, {
        ...this.configure,
        onClose: () => this.toastList.delete(id),
      });
      this.toastList.add(id);
    }
  }
}

decorate(ToastStore, {
  show: action,
});

export default new ToastStore();
