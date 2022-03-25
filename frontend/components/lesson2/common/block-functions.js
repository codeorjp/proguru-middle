export const display = (store) => ({
  name: "display",
  def: (varName, blockId) => {
    store.display(varName, blockId);
  },
});

export const assignText = (store) => ({
  name: "assignText",
  def: (text) => {
    store.assignText(text);
    return "text";
  },
});

export const getMeridiem = (store) => ({
  name: "getMeridiem",
  def: () => store.getMeridiem(),
});

export const connect = (store) => ({
  name: "connect",
  def: (varName, callback, blockId) =>
    new Promise((resolve) => {
      store.connect(varName, callback, blockId, resolve);
    }),
});

export const send = (store) => ({
  name: "send",
  def: (varName, blockId) =>
    new Promise((resolve) => {
      store.send(varName, blockId, resolve);
    }),
});

export const receiveResponse = (store) => ({
  name: "receiveResponse",
  def: (callback, blockId) => {
    store.receiveResponse(callback, blockId);
  },
});

export const highlightBlock = (store) => ({
  name: "highlightBlock",
  def: (blockId) => {
    store.skip(blockId);
  },
});
