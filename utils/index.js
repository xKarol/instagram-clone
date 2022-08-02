export const hasExtension = (type, extsArr) => {
  return extsArr.includes(type);
};

export const random = (max) => {
  return Number((Math.random() * max).toFixed(0));
};

export const isFollowing = (docId, followings = []) => {
  return followings.findIndex((profile) => profile.uid === docId) !== -1;
};

export const truncate = (str, size = 10) => {
  return str.length > size ? str.substring(0, size) + "..." : str;
};

export const trimSpace = (str) => {
  return str.replace(/\s+$/, "");
};

export const removeDoubleSpace = (str) => {
  return str.replace(/  +/g, " ");
};
