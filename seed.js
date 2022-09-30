import { db } from "./config/firebase.config.js";
import { signUpUser } from "./services/auth.js";
import { faker } from "@faker-js/faker";

const seedInit = async (callback, amount = 10) => {
  const data = new Array(amount).fill(callback());
  for (const element of data) await element;
};

const seedUser = async () => {
  await seedInit(() =>
    signUpUser({
      db,
      avatar: faker.image.avatar(),
      username: faker.internet.userName(),
      fullName: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    })
  );
};

const seedPost = async () => {};

export const seed = async (type = "ALL") => {
  if (type === "USER") await seedUser();
  if (type === "POST") await seedPost();
  if (type === "ALL") {
    await seedUser();
    await seedPost();
  }
};
