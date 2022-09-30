import { db } from "./config/firebase.config";
import { signUpUser, getAllUsers, createPost } from "./services";
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

const seedPost = async () => {
  const users = await getAllUsers(db);
  const randUserIndex = Math.floor(Math.random() * users.length);
  const randUser = users[randUserIndex];
  await seedInit(() => {
    createPost({
      db,
      username: randUser.username,
      imageURL: faker.image.image(1280, 960),
      caption: faker.lorem.text(),
    });
  });
};

export const seed = async (type = "ALL") => {
  if (type === "USER") await seedUser();
  if (type === "POST") await seedPost();
  if (type === "ALL") {
    await seedUser();
    await seedPost();
  }
};
