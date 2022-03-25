interface IblockFunction {
  name: string;
  def: Function;
}

// CommonToReceiveAndSend Block
export const display = (store): IblockFunction => ({
  name: "display",
  def: (varName) => {
    store.display(varName);
  },
});

export const assignText = (store): IblockFunction => ({
  name: "assignText",
  def: (text) => {
    store.assignText(text);
    return "text";
  },
});

// Receive Block
export const fetchServer = (store): IblockFunction => ({
  name: "fetchServer",
  def: (callback) => {
    store.fetchServer(callback);
  },
});

export const isIncludeText = (store): IblockFunction => ({
  name: "isIncludeText",
  def: () => store.isResponseIncludeText(),
});

export const assignReceivedText = (store): IblockFunction => ({
  name: "assignReceivedText",
  def: (varName) => {
    store.assignReceivedText(varName);
  },
});

// Send Block
export const onSubmit = (store): IblockFunction => ({
  name: "onSubmit",
  def: (callback) => {
    store.onSubmit(callback);
  },
});

export const send = (store): IblockFunction => ({
  name: "send",
  def: (varName, callback) =>
    new Promise((resolve) => {
      store.send(varName, callback, resolve);
    }),
});

export const sendSuccess = (store): IblockFunction => ({
  name: "sendSuccess",
  def: (varName, callback) =>
    new Promise((resolve) => {
      store.send(varName, callback, resolve);
    }),
});

export const assignChatInput = (store): IblockFunction => ({
  name: "assignChatInput",
  def: (varName) => {
    store.assignChatInput(varName);
  },
});
