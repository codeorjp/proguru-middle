/**
 * flattenObject
 * オブジェクトを1階層にします
 * {
 *   "padding": "10px",
 *   "font": {
 *     "fontSize": "16px",
 *     "align": "left",
 *   },
 * }
 * ↓ が以下のようになります
 * {
 *   "padding": "10px",
 *   "fontSize": "16px",
 *   "align": "left",
 * }
 */

const flattenObject = (ob: object) => {
  if (!ob) return;

  const toReturn: object = {};
  Object.keys(ob).forEach((key) => {
    if (!Object.hasOwnProperty.call(ob, key)) return;

    if (typeof ob[key] === "object" && ob[key] !== null) {
      const flatObject = flattenObject(ob[key]);
      Object.keys(flatObject).forEach((key2) => {
        if (!Object.hasOwnProperty.call(flatObject, key2)) return;
        toReturn[key2] = flatObject[key2];
      });
    } else {
      toReturn[key] = ob[key];
    }
  });
  return toReturn;
};

export default (ob) => flattenObject(ob);
