import { db } from "./config/firebase.config.js";
import { signUpUser } from "./services/auth.js";
import { faker } from "@faker-js/faker";

const seedUser = async () => {
  const users = new Array(10).fill(
    signUpUser(
      db,
      faker.internet.userName(),
      faker.name.fullName(),
      faker.internet.email(),
      faker.internet.password()
    )
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
