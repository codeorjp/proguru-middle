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

// Send Block
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
  def: (varName, callback) => {
    store.send(varName, callback);
  },
});

export const assignSelectedImage = (store) => ({
  name: "assignSelectedImage",
  def: (varName) => {
    store.assignSelectedImage(varName);
  },
});
