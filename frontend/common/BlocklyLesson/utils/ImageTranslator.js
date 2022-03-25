export const ObjectURLToBlob = async (url) => fetch(url).then((r) => r.blob());

export const FileToBlob = (file) => new Blob([file], { type: "image/jpeg" });
