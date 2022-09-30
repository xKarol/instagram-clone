import { db } from "./config/firebase.config.js";
import { signUpUser } from "./services/auth.js";
import { faker } from "@faker-js/faker";

const seedUser = async () => {
  const users = new Array(10).fill(
    signUpUser({
      db,
      avatar: faker.image.avatar(),
      username: faker.internet.userName(),
      fullName: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    })
  );

  for (const element of users) await element;
};

const seedPost = async () => {};

export const seed = async (type = "ALL") => {
  if (type === "USER") await seedUser();
  if (type === "POST") await seedUser();
  if (type === "ALL") {
    await seedUser();
    await seedPost();
  }
};
