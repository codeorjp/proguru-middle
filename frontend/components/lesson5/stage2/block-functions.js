// CommonToReceiveAndSend Block
export const display = (store) => ({
  name: "display",
  def: (varName) => {
    store.display(varName);
  },
});

export const getImageWidth = (store) => ({
  name: "getImageWidth",
  def: (varName) =>
    new Promise((resolve) => store.getImageWidth(varName, resolve)),
});

export const getImageHeight = (store) => ({
  name: "getImageHeight",
  def: (varName) =>
    new Promise((resolve) => store.getImageHeight(varName, resolve)),
});

export const compression = (store) => ({
  name: "compression",
  def: (object) =>
    new Promise((resolve) => {
      store.compression(object, resolve);
    }),
});

export const resizeImage = (store) => ({
  name: "resizeImage",
  def: (object) =>
    new Promise((resolve) => {
      store.resizeImage(object, resolve);
    }),
});

export const fixedAspectResize = (store) => ({
  name: "fixedAspectResize",
  def: (object) =>
    new Promise((resolve) => {
      store.fixedAspectResize(object, resolve);
    }),
});

export const isIncludeAddress = (store) => ({
  name: "isIncludeAddress",
  def: (varName) => {
    return store.isIncludeAddress(varName);
  },
});

export const isIncludePhoneNumber = (store) => ({
  name: "isIncludePhoneNumber",
  def: (varName) => {
    return store.isIncludePhoneNumber(varName);
  },
});

export const isMatchKeyword = (store) => ({
  name: "isMatchKeyword",
  def: (varName) =>
    new Promise((resolve) => store.isMatchKeyword(varName, resolve)),
});

export const confirmDialog = (store) => ({
  name: "confirmDialog",
  def: (varName) => {
    return store.confirmDialog(varName);
  },
});

export const alert = (store) => ({
  name: "alert",
  def: (varName) => {
    store.alert(varName);
  },
});

export const assignText = (store) => ({
  name: "assignText",
  def: (text) => {
    store.assignText(text);
    return "text";
  },
});

// Receive Block
export const fetchServer = (store) => ({
  name: "fetchServer",
  def: (callback) => {
    store.fetchServer(callback);
  },
});

export const isIncludeImage = (store) => ({
  name: "isIncludeImage",
  def: () => store.isResponseIncludeImage(),
});

export const assignReceivedImage = (store) => ({
  name: "assignReceivedImage",
  def: (varName) => {
    store.assignReceivedImage(varName);
  },
});

export const isIncludeText = (store) => ({
  name: "isIncludeText",
  def: () => store.isResponseIncludeText(),
});

export const assignReceivedText = (store) => ({
  name: "assignReceivedText",
  def: (varName) => {
    store.assignReceivedText(varName);
  },
});

// Send Block
export const onSubmit = (store) => ({
  name: "onSubmit",
  def: (callback) => {
    store.onSubmit(callback);
  },
});

export const onClickSelectImage = (store) => ({
  name: "onClickSelectImage",
  def: (callback) => {
    store.onClickSelectImage(callback);
  },
});

export const showFileDialog = (store) => ({
  name: "showFileDialog",
  def: (callback) =>
    new Promise((resolve) => {
      store.showFileDialog(callback, resolve);
    }),
});

export const send = (store) => ({
  name: "send",
  def: (varName, callback) =>
    new Promise((resolve) => {
      store.send(varName, callback, resolve);
    }),
});

export const assignSelectedImage = (store) => ({
  name: "assignSelectedImage",
  def: (varName) => {
    store.assignSelectedImage(varName);
  },
});

export const assignChatInput = (store) => ({
  name: "assignChatInput",
  def: (varName) => {
    store.assignChatInput(varName);
  },
});
