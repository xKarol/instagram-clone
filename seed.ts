import { faker } from "@faker-js/faker";
import { db } from "./src/config/firebase.config";
import { signUpUser, getAllUsers, createPost } from "./src/services";

const seedInit = async (callback: () => void, amount = 10) => {
  const data = Array.from({ length: amount }).fill(callback());
  for (const element of data) await element;
};

const seedUser = async () => {
  await seedInit(() =>
    signUpUser({
      db,
      avatar: { src: faker.image.avatar() },
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
    void createPost({
      db,
      username: randUser.username,
      image: { src: faker.image.image(1280, 960) },
      caption: faker.lorem.text(),
    });
  });
};

export const seed = async (type: "ALL" | "USER" | "POST" = "ALL") => {
  if (type === "USER") await seedUser();
  if (type === "POST") await seedPost();
  if (type === "ALL") {
    await seedUser();
    await seedPost();
  }
};
