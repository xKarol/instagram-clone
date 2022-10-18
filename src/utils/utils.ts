export const hasExtension = (type: string, extsArr: string[]) => {
  return extsArr.includes(type);
};

export const random = (max: number) => {
  return Number((Math.random() * max).toFixed(0));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isFollowing = (docId: string, followings: any[] = []) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return followings.findIndex((profile) => profile.uid === docId) !== -1;
};

export const truncate = (str: string, size = 10) => {
  return str.length > size ? str.slice(0, Math.max(0, size)) + "..." : str;
};

export const trimSpace = (str: string) => {
  return str.replace(/\s+$/, "");
};

export const removeDoubleSpace = (str: string) => {
  return str.replace(/  +/g, " ");
};
