import { validFileExtensions } from "../constants/arrays";

export const checkFileExtension = (files) => {
  return Object.values(files).filter((file) =>
    validFileExtensions.includes(file.name.split(".").pop())
  );
};
