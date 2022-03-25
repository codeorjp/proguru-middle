/**
 * convertArrayToText
 * ショートハンドの配列をテキストにします。
 * padding: ["10","10","10","10"];
 * →padding: "10px 10px 10px 10px";
 */
export const convertArrayToText = (array) => {
  if (!array) return "";
  let text = "";
  array.forEach((elm, index) => {
    text += index === 0 ? `${elm}px` : ` ${elm}px`;
  });
  return text;
};
/**
 * convertTextToArray
 * ショートハンドのテキストを配列にします。
 * padding: "10px 10px 10px 10px";
 * →padding: ["10","10","10","10"];
 */
export const convertTextToArray = (text) => {
  if (!text || typeof text !== "string") return [];
  let texts = text.split(/\s/);
  // １つしか指定してなければすべてに適応
  texts = texts.length === 1 ? [texts[0], texts[0], texts[0], texts[0]] : texts;
  return texts.map((elm) => elm.replace("px", ""));
};
