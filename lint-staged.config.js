// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  "**/*.(ts|tsx)": () => "npm run type-check",
  "*.{js,jsx,ts,tsx}": (filenames) => [
    `npx eslint --fix ${filenames.join(" ")}`,
  ],

  "*": (filenames) => `npm run prettier:fix ${filenames.join(" ")}`,
};
