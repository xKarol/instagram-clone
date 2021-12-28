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
  return Boolean(followings.filter((profile) => profile.uid === docId).length);
};
