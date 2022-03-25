// レッスン１で半角英数字の入力を促すための
// チェックとトーストの表示
export default (text, store) => {
  if (!text) return true;
  switch (true) {
    case /^[a-zA-Z]*$/gi.test(text):
      // 英字のみの入力
      store.show("数字で入力しましょう！");
      break;
    case /([0-9].*[a-zA-Z]|[a-zA-Z].*[0-9])/gi.test(text):
      // 英数混在の入力
      store.show("数字のみ入力しましょう！");
      break;
    case !/^[0-9a-zA-Z]*$/gi.test(text):
      // 半角以外の入力
      store.show("半角で入力しましょう！");
      break;
    default:
      break;
  }
};

export const nullCheck = (text, store) => {
  if (!text) store.show("数字を入力してください！");
};
