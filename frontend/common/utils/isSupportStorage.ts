const isSupportStorage = () => {
  try {
    return !!window.localStorage;
  } catch {
    return false;
  }
};

export default isSupportStorage();
