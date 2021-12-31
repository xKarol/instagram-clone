import { validFileExtensions } from "../constants/arrays";

export const checkFileExtension = (files) => {
  return Object.values(files).filter((file) =>
    validFileExtensions.includes(file.name.split(".").pop())
  );
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
